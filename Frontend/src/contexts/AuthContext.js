import { useReducer, createContext, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

const AuthcontextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null })  //the useReducer takes in 2 arguments first one is the function that will handle the cases. the second one is the initial state value  and it we set to null is the
    //just for clarity, the const "state" above is the original state and the user that we rest to null is just representing it's initial value
    //and the dispatch function is what we use to update the state outside this component


    useEffect(() => {   //we want to check if the is a user logged in on refresh so that it will not appear as if we are logged out
        const user = JSON.parse(localStorage.getItem("user")) //checking if there is a user value in local storage and storing it in the const user

        if (user) {                                         //so basically, if we have a user we want to update the global state
            dispatch({ type: "LOGIN", payload: user })      //hence everything will run on render
        }
    }, [])

    console.log("Authcontext state: ", state)   //just to keep track
    return (// always spread state properties
        < AuthContext.Provider value={{ ...state, dispatch }} >
            {children}
        </AuthContext.Provider >
    )
}

export default AuthcontextProvider;