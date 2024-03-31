const CSRF_HEADER_NAME = "X-CSRF-HEADER-NAME";
let csrfHeaderName: string | null = null;
let csrfToken: string | null = null;

const REGEX_JSON = /json/;
const REGEX_FORM = /multipart/;
const REGEX_BLOB = /pdf|xml|image|stl|obj|zip|csv|ms-excel/;

export interface IErrorExtensions {
    dimension?: string;
    actual?: string;
    minimum?: string;
    maximum?: string;
    colorType?: string;
    acceptedColorTypes?: string;
    character?: string;
}

export interface IApiError<E = IErrorExtensions> {
    title?: string;
    detail?: string;
    status?: number;
    type?: string;
    instance?: string;
    errors?: IApiError<E>[];
    extensions?: E;
}

const buildApiError = (error: any): IApiError => ({
    title: "Error",
    detail: error.toString(),
});

export type ResConfig = {
    raw?: boolean;
};
export interface CustomRequestInit extends RequestInit {
    resConfig?: ResConfig;
}
export type FetcherType = <T = any>(
    input: RequestInfo,
    init?: CustomRequestInit,
) => Promise<T>;
export const basicFetcher: FetcherType = async (input, init = {}) => {
    init.credentials = "same-origin";
    init.headers = new Headers(init.headers);
    if (csrfHeaderName && csrfToken) {
        init.headers.set(csrfHeaderName, csrfToken);
    }
    // (npyl): Authorization Token
    const token = window ? window.localStorage.getItem("accessToken") : null;
    if (token) {
        init.headers.set("Authorization", `Bearer ${token}`);
    }

    let res: Response;
    try {
        res = await fetch(input, init);
    } catch (error) {
        throw buildApiError(error);
    }
    csrfHeaderName = res.headers.get(CSRF_HEADER_NAME);
    if (csrfHeaderName) {
        csrfToken = res.headers.get(csrfHeaderName);
    }
    if (init.resConfig?.raw) {
        return res;
    }
    const contentType = res.headers.get("Content-Type") || "";
    let parsePromise;
    if (REGEX_JSON.test(contentType)) {
        parsePromise = res.json();
    } else if (REGEX_FORM.test(contentType)) {
        parsePromise = res.formData();
    } else if (REGEX_BLOB.test(contentType)) {
        parsePromise = res.blob();
    } else {
        parsePromise = res.text();
    }
    let parsedBody;
    try {
        parsedBody = await parsePromise;
    } catch (error) {
        throw buildApiError(error);
    }
    if (res.ok) {
        return parsedBody;
    }
    const error: IApiError = { status: res.status, ...parsedBody };
    throw error;
};

export default basicFetcher;
