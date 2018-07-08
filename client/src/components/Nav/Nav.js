import React from "react";


const Nav = (props) => (
  <div>
    <div className="row align-center animated bounceInDown">
      <div className="one fourth warning box centered round">
      <h2>{props.name}</h2>
      </div>
    </div>
        <hr></hr>
  </div>

);

export default Nav;
