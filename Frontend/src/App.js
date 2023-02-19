import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext"
import "bootstrap/dist/css/bootstrap.css"

//Routes
import Home from "./pages/Home"
import Nav from './components/nav';
import SignUp from './pages/signup'
import Login from './pages/login';


function App() {
    const { user } = useAuthContext()  // we want to use this to conditionally output pages

    return (
        <BrowserRouter>
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> /{/*so if there is no user, we want to navigate to the login component */}

                    <Route path="/signup" element={!user ? <SignUp />:<Navigate to="/"/>} />

                    <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />

                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App