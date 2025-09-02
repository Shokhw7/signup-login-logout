import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../App.css";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { formError } from "../components/ErrorId";
import { useResetPassword } from "../hooks/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _login, isPending, error: _error } = useLogin();
  const {resetPassword} = useResetPassword()
  const [forgetPassword, setForgetPassword] = useState(false)
    
  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
    if(user?.emailRecovery){
      resetPassword(user.emailRecovery)
      setError(false);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        {!forgetPassword && (<Form className="form" method="post">
          <FormInput label="Email:" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          <div>
            {!isPending && (
              <button type="submit" className="btn">
                Login
              </button>
            )}
            {isPending && (
              <button type="submit" className="btn" disabled>
                Loading...
              </button>
            )}
          </div>
        </Form>)}

        {forgetPassword && (<Form className="form" method="post">
          <FormInput label="Email:" name="emailRecovery"/>
          <button className="btn">Send</button>
           
        </Form>)}
          {!forgetPassword && (<button onClick={()=> setForgetPassword(!forgetPassword)}  className="btn">Forget Password</button>)}
          {forgetPassword && (<button onClick={()=> setForgetPassword(!forgetPassword)} className="btn">Show login</button>)}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {_error && <p style={{ color: "red" }}>{_error}</p>}

        <p className="text">
          If you don't have account, please <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
