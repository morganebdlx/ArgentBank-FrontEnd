import "./SignIn.css";
import useLogin from "../hooks/useLogin";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";



const SignIn = () => {

  const { login } = useLogin();

  // const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isLoggedIn = await login(username, password);

    if (isLoggedIn) {
      navigate("/profile"); // redirige vers la page profile
    } else {
      alert("Invalid username or password");
    }
  }



  return (
  <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </section>
  </main>
);
}

export default SignIn;
