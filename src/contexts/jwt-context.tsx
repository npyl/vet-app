import { IAuthRes, ILoginReq, IRegisterReq } from "@/types/auth";
import IUser from "@/types/user";
import type { FC, ReactNode } from "react";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
} from "react";

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
}

export interface AuthContextValue extends State {
    signin: (body: ILoginReq) => Promise<any>;
    logout: () => Promise<void>;
    signup: (body: IRegisterReq) => Promise<any>;
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

const tokenKey = "accessToken";

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
    const login = useCallback(
        (body: ILoginReq) =>
            fetch("/api/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            }),
        [],
    );
    const register = useCallback(
        (body: IRegisterReq) =>
            fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(body),
            }),
        [],
    );
    const getProfile = useCallback(
        (): Promise<IUser> =>
            fetch("/api/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
                },
                method: "GET",
            }).then((res) => res.json()),
        [],
    );

    return { login, register, getProfile };
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { login, register, getProfile } = useMethods();

    const initialize = async (): Promise<void> => {
        try {
            if (globalThis?.localStorage?.getItem(tokenKey)) {
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
                throw "Token doesn't exist!";
            }
        } catch (error) {
            globalThis?.localStorage?.removeItem(tokenKey);

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
    }, []);

    const signin = async (body: ILoginReq): Promise<any> => {
        const loginRes = await login(body);
        if (loginRes.status !== 200) throw "Failed to login!";
        const json = (await loginRes.json()) as IAuthRes;

        localStorage.setItem(tokenKey, json.token);

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
        localStorage.removeItem(tokenKey);
        dispatch({ type: ActionType.LOGOUT });
    };

    const signup = async (body: IRegisterReq): Promise<any> => {
        const regRes = await register(body);
        if (regRes.status !== 200) throw "Failed to login!";
        const json = (await regRes.json()) as IAuthRes;

        localStorage.setItem(tokenKey, json.token);

        const user = await getProfile();
        if (!user) {
            throw "Failed getting profile!";
        }

        dispatch({
            type: ActionType.REGISTER,
            payload: {
                user,
            },
        });

        return regRes;
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
