import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../App.css";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { formError } from "../components/ErrorId";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(null);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <h1>Register</h1>
        <Form className="form" method="post">
          <FormInput label="Name:" name="name" type="text" />
          <FormInput label="Email:" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          <div>
            {!isPending && (
              <button type="submit" className="btn">
                Register
              </button>
            )}
            {isPending && (
              <button disabled type="submit" className="btn">
                Loading...
              </button>
            )}
          </div>
          {!isPendingGoogle && (
            <button type="button" onClick={googleProvider} className="btn">
              Google
            </button>
          )}
          {isPendingGoogle && (
            <button disabled className="btn">
              Loading...
            </button>
          )}
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {_error && <p style={{ color: "red" }}>{_error}</p>}
        {errorGoogle && <p style={{ color: "red" }}>{errorGoogle}</p>}

        <p className="text">
          If you have account, please <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
