import "./SignIn.css";
import useLogin from "../hooks/useLogin";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";



const SignIn = () => {

  const { login, isLoading, error } = useLogin();

  // const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // État pour le checkbox "Remember me"

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isLoggedIn = await login(username, password, rememberMe);

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
          <input type="checkbox"
                 id="remember-me"
                 checked={rememberMe}
                 onChange={(e) => setRememberMe(e.target.checked)} />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? (
    <svg
      className="login-loader"
      viewBox="0 0 55 100"
      role="status"
      aria-label="Connexion en cours"
    >
      <circle fill="#fff" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </circle>

      <circle fill="#fff" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>

      <circle fill="#fff" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
    </svg>
  ) : (
    "Sign In"
  )}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  </main>
);
}

export default SignIn;
