import { useState } from "react";
import useUpdateName from "../hooks/useUpdateName";
import Loader from "./Loader";
import "./EditName.css";


const EditName = ({ user, closeForm }) => {
  // Utilisation de useState pour gérer l'état du nom d'utilisateur
  const [userName, setUserName] = useState(user.userName ?? ""); // initialisation du nom d'utilisateur avec la valeur actuelle ou une chaîne vide si null
  const { updateName, isLoading, error } = useUpdateName();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateName(userName);

    closeForm();
  };

  return (
    <form className="edit-name-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>

      <div className="input-line">
        <label htmlFor="userName">User name:</label>
        <input
          id="userName"
          type="text"
          value={userName}
          placeholder="Choose your user name"
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>

      <div className="input-line">
        <label htmlFor="firstName">First name:</label>
        <input
          id="firstName"
          type="text"
          value={user.firstName}
          disabled
        />
      </div>

      <div className="input-line">
        <label htmlFor="lastName">Last name:</label>
        <input
          id="lastName"
          type="text"
          value={user.lastName}
          disabled
        />
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "Save"}
        </button>

        <button type="button" onClick={closeForm} disabled={isLoading}>
          Cancel
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default EditName;
