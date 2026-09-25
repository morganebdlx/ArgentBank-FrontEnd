import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useProfile from "../hooks/useProfile";
import AccountCard from "../components/AccountCard";
import EditName from "../components/EditName";
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



// Utilisation de useState pour gérer l'état d'édition du nom
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="main">
      <div className="header">
        {/* // Vérification si l'utilisateur est en mode édition et si l'utilisateur est défini */}
        {isEditing && user ? (
          <EditName
            user={user}
            closeForm={() => setIsEditing(false)}
          />
        ) : (
          <>
    {/* // Affichage du message de bienvenue avec le nom de l'utilisateur */}
      <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : ""}!</h1>
      {/* // Bouton pour passer en mode édition du nom */}
      <button className="edit-button" onClick={() => setIsEditing(true)} >Edit Name </button>
    </>
  )}
</div>
        <h2 className="sr-only">Accounts</h2>
          <AccountCard title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
          <AccountCard title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
          <AccountCard title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
);
};

export default Profile;
