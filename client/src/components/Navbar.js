import React, { useState } from "react";

function Navbar({ setShowfield, showfield }) {

  const [active, setActive] = useState(showfield);

  return (
    <>
      <ul className="nav my-1 mb-4">
        <li className="nav-item">
          <div onClick={()=>{
            setShowfield("home");
            setActive("home")
        }}
          className={active === "home" ? 'nav-link active' : 'nav-link'}>Home</div>
        </li>
        <li className="nav-item">
        <div onClick={()=>{
          setShowfield("upload");
          setActive("upload")
        }}
          className={active === "upload" ? 'nav-link active' : 'nav-link'}>Upload</div>
        </li>
        <li className="nav-item">
        <div onClick={()=>{
          setShowfield("discovery");
          setActive("discovery")
        }}
          className={active === "discovery" ? 'nav-link active' : 'nav-link'}>Discovery</div>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
