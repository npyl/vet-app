import { ILoginReq, IRegisterReq, IAuthRes } from "@/types/auth";
import IUser, { UserType } from "@/types/user";
import type { FC, ReactNode } from "react";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";
import useApiContext from "./api";

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
}

export interface AuthContextValue extends State {
    signin: (
        username: string,
        password: string,
        type: UserType,
    ) => Promise<any>;
    signup: (req: IRegisterReq) => Promise<any>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

enum ActionType {
    INITIALIZE = "INITIALIZE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",
}

type InitializeAction = {
    type: ActionType.INITIALIZE;
    payload: {
        isAuthenticated: boolean;
        user: IUser | null;
    };
};

type LoginAction = {
    type: ActionType.LOGIN;
    payload: {
        user: IUser;
    };
};

type LogoutAction = {
    type: ActionType.LOGOUT;
};

type RegisterAction = {
    type: ActionType.REGISTER;
    payload: {
        user: IUser;
    };
};

type Action = InitializeAction | LoginAction | LogoutAction | RegisterAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers: Record<ActionType, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state: State, action: LoginAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isInitialized: true,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state: State): State => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state: State, action: RegisterAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isInitialized: true,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state: State, action: Action): State =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    signin: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    signup: () => Promise.resolve(),
});

const useMethods = () => {
    const { get, post } = useApiContext();

    const [isSuccess, setIsSuccess] = useState(false);

    const login = useCallback(async (body: ILoginReq) => {
        // NOTE: emulate rtk's isSuccess
        const res = await post<IAuthRes>("/api/login", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if ("token" in res) setIsSuccess(true);

        return res;
    }, []);
    const register = useCallback(async (body: IRegisterReq) => {
        // NOTE: emulate rtk's isSuccess
        const res = await post<IAuthRes>("/api/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if ("token" in res) setIsSuccess(true);

        return res;
    }, []);
    const getProfile = useCallback(() => get("/api/profile"), []);

    return { login, register, getProfile, isSuccess };
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { login, register, getProfile, isSuccess } = useMethods();

    const initialize = async (): Promise<void> => {
        try {
            if (globalThis?.localStorage?.getItem("accessToken")) {
                const user = await getProfile();
                if (!user) {
                    throw "Failed to get profile!";
                }

                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                throw "Token does not exist!";
            }
        } catch (error) {
            globalThis?.localStorage.removeItem("accessToken");
            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    useEffect(() => {
        initialize();
    }, [isSuccess]);

    const signin = async (
        email: string,
        password: string,
        type: UserType,
    ): Promise<any> => {
        const loginRes = await login({
            email,
            password,
            type,
        });

        localStorage.setItem("accessToken", loginRes.token);

        const user = await getProfile();
        if (!user) {
            throw "Failed getting profile!";
        }

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });

        return loginRes;
    };

    const logout = async (): Promise<void> => {
        localStorage.removeItem("accessToken");
        dispatch({ type: ActionType.LOGOUT });
    };

    const signup = async (req: IRegisterReq): Promise<any> => {
        const registerRes = await register(req);

        localStorage.setItem("accessToken", registerRes.token);

        const user = await getProfile();
        if (!user) {
            throw "Failed getting profile!";
        }

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });

        return registerRes;
    };

    const providerValues = useMemo(
        () => ({
            ...state,
            signin,
            logout,
            signup,
        }),
        [state],
    );
    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;
