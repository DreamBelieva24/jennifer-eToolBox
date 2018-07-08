import React from "react";
import "./DeleteBtn.css";
import "."


const DeleteBtn = props => (
  <span className="delete-btn" role="img" aria-label="trashcan" {...props}>
   &nbsp; <span className="ec ec-wastebasket"></span>

  </span>
);

export default DeleteBtn;
