import React from "react";

export const FormBtn = props => (
  <div className="one twelfth">
    <button {...props} style={{ float: "none", marginBottom: 2 }} className="btn btn-success">
      {props.children}
    </button>
  </div>
);
