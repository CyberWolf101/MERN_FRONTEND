import { useState } from 'react'
import {UseSignup} from '../hooks/useSignup'

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup, loading, error} = UseSignup()

    const handleSigup = async (e) =>{
        e.preventDefault()

        await signup(email, password)            //we passed the email and password (from the state) as arguments so it can be accesssed by the hook    
    }


    return (
        <div className='login'>
              <br />
            <br />
            <br />
            <br />
          <center>
          <form onSubmit={handleSigup} className='border  p-4 '>
                <h3>Sign up</h3>
              <br />
                <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} className="form-control" />

                <br />
                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <button disabled={loading} className='btn btn-success'>Sign up</button>
                {error && <div className='errMessage'>{error}</div>}
            </form>
          </center>
        </div>
    );
}//we want the button to be disabled if loading is true

export default SignUp;