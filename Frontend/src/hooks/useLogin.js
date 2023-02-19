import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const UseLogin = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        const response = await fetch("http://localhost:4000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setLoading(false)
        }
        if (response.ok) {
            setError(null)
            dispatch({ type: "LOGIN", payload: json })
            localStorage.setItem("user", JSON.stringify(json))
            setLoading(false)

        }
    }
    return { login, loading, error }
//always return custom hooks function in curly braces
}

 