import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Chat() {
  const { email } = useContext(AuthContext);
  return <div>Login In as: { email } </div>;
}

export default Chat;
