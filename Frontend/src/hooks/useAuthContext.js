import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error("This context is not available in the file you are consuming")
    }
    return context
}