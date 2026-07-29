import React from "react";

const Message = ({ user, assistant }) => {
  return (
    <div>
      <div>
        <strong>You:</strong>
        <p>{user}</p>
      </div>

      <div>
        <strong>AI:</strong>
        <p>{assistant}</p>
      </div>

      <hr />
    </div>
  );
};

export default React.memo(Message);
