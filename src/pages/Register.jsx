import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../app.css";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData(); 
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(null);
    } else if (user) {
      setError("Iltimos, barcha maydonlarni to‘ldiring!");
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
            {!isPending && <button type="submit" className="btn">
              Register
            </button>}
            {isPending && <button disabled type="submit" className="btn">
              Loading...
            </button>}
          </div>
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {_error && <p style={{ color: "red" }}>{_error}</p>}
        <p className="text">
          If you have account, please <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
