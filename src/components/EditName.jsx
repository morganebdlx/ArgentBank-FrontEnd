import { useState } from "react";
import useUpdateName from "../hooks/useUpdateName";
import Loader from "./Loader";
import "./EditName.css";


const EditName = ({ user, closeForm }) => {
  const [userName, setUserName] = useState(user.userName);
  const { updateName, isLoading, error } = useUpdateName();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateName({ userName: userName });

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
