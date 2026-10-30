import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, selectDisplayName } from "../store/auth/authSlice";
import logo from "../assets/argentBankLogo.webp";
import "./Header.css";

const Header = () => {
  // Récupération de l'état de connexion depuis le store Redux
  const { isLoggedIn } = useSelector((state) => state.auth);
  // Nom affiché : userName, ou prénom + nom si userName est vide
  const displayName = useSelector(selectDisplayName);
  const dispatch = useDispatch();

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {displayName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
