import { useState } from 'react'
import { UseLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, loading, error } = UseLogin()


    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (

        <div className='login'>
            <br />
            <br />
            <br />
            <br />
            <center>
            <form className='border  p-4'>
                <h3>Login</h3>
                <br />
                <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email.." className="form-control" />

               <br />
                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password.." className="form-control" />
                <br />
                <button disabled={loading} onClick={handleLogin} className='btn btn-success'>Login</button>
                {error && <div className='errMessage'>{error}</div>}
            </form>
            </center>
        </div>
    );
}//logalPaul@gmail.com
//Abcd1234!
export default Login;