import { createContext, useContext, useState } from "react"
import {
    authenticateUser,
    clearCurrentUser,
    getCurrentUser,
    registerUser,
} from "./authStorage"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getCurrentUser)

    const login = async (credentials) => {
        const sessionUser = await authenticateUser(credentials)
        setUser(sessionUser)
        return sessionUser
    }

    const signup = async (details) => {
        const sessionUser = await registerUser(details)
        setUser(sessionUser)
        return sessionUser
    }

    const logout = () => {
        clearCurrentUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used inside AuthProvider")
    return context
}
