import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheet/index.css"
import UseLogout from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"


export default function Nav() {
    const { user } = useAuthContext()
    const { logout } = UseLogout()
    return (
        <div className="">
            <nav className="bg-light">
                <div className="d-flex nb py-3">
                    <div className="nv2">
                        <Link to="/" className="text-decoration-none">
                            <h5 >Cyber~Wolf 
                                <br />
                                 workout Hub <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" />
                            </svg></h5>
                        </Link>

                    </div>
                    <div className="nav">

                        {user && (
                            <div>
                                <span>{user.email}</span>
                                <button onClick={logout} className="btn btn-sm border border-success border-2 text-success ">
                                    Log out
                                </button>
                            </div>
                        )}
                        {!user && (
                            <div>
                                <Link to="/login">
                                    <span className="mx-3">Login</span>
                                </Link>

                                <Link to="/signup">
                                    <span className="mx-3" >Sign up</span>
                                </Link>
                            </div>
                            //we are displaying these linls conditionally by saying if there is a user(meaning we are logged in) display the logout btn if not, display the login and we imported the user from the auth context hook
                        )}
                    </div>
                </div>
            </nav>



        </div>

    )
}