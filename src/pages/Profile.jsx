import { useEffect } from "react";
import { useSelector } from "react-redux";
import useProfile from "../hooks/useProfile";
import AccountCard from "../components/AccountCard";
import "./Profile.css";

const Profile = () => {

  // Récupération du token et de l'utilisateur depuis le store Redux
  const { profile } = useProfile();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

// Utilisation de useEffect pour appeler la fonction profile lorsque le token change
  useEffect(() => {
    if (token) {
      profile(token);
    }
  }, [token, profile]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : "..."}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
        <h2 className="sr-only">Accounts</h2>
          <AccountCard title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
          <AccountCard title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
          <AccountCard title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
);
};

export default Profile;
