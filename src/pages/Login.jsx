import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import "../app.css";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const user = useActionData(); // <-- user deb nomladik
  const [error, setError] = useState(null);
  const { login } = useLogin();

  useEffect(() => {
    if (user?.email && user?.password) {
      login(user.email, user.password); // faqat email va parol
      setError(null);
    } else if (user) {
      setError("Iltimos, barcha maydonlarni to‘ldiring!");
    }
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        <Form className="form" method="post">
          <FormInput label="Email:" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          <div>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </Form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="text">
          If you don't have account, please <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
