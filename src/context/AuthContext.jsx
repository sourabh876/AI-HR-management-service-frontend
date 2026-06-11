import { Children } from "react";
import {
    createContext,
    useState
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(
            localStorage.getItem("user")
        )
    )

    const [token, setToken] = useState(
        localStorage.getItem("token")
    )

    const login = (
        userData,
        jwtToken
    ) => {
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        )

        localStorage.setItem(
            "token",
            jwtToken
        )

        setUser(userData)
        setToken(jwtToken)
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
            >
                {children}
        </AuthContext.Provider>
            )
}