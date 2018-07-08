import React from "react";

const Toolbar = (props) => (
  <div>
    <div className="row align-center padded animated bounceInDown">
      <div className="one eighth skip-two toolbar"><a href="/schedule"><img className="toolbar-icon" alt="logo" src="images/schedule.svg"></img></a></div>
      <div className="one eighth toolbar"><a href="/notebook"><img className="toolbar-icon" alt="logo" src="images/notepad.svg"></img></a></div>
      <div className="one eighth toolbar"><a href="/bookmarks"><img className="toolbar-icon" alt="logo" src="images/bookmarks.svg"></img></a></div>
      <div className="one eighth toolbar"><a href="/timer"><img className="toolbar-icon" alt="logo" src="images/timer.svg"></img></a></div>
    </div>
  </div>
);

export default Toolbar;
