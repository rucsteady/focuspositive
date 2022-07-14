import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Chat() {
  const { users, currentUser, currentEmail } = useContext(AuthContext);

  console.log("currentUser:", currentUser[0].firstname);

  return (
    <div>
      Login in user:{currentUser[0].firstname}
      {users
        .filter((user) => user.email === currentEmail)
        .map((user) => user.firstname)}

        <p>{currentEmail}</p>
    </div>
  );
}

export default Chat;
