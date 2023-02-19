import { useAuthContext } from "./useAuthContext";


const UseLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        localStorage.removeItem("user")
        dispatch({ type: "LOGOUT" })        //we don't need to pass a payload cus in this case we are setting state to null
    }                                       //also we didn't need to set the dispatch, it's just for formality

    return { logout };                    //must use curly braces when returning a function
}

export default UseLogout;