import React from "react";
import { Link } from "react-router-dom";

const DisplayNav = () => {



  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
         <h1> Drone Bucket</h1>
         <Link
              to="/"
              className="btn btn-primary"
              style={{ position: "absolute", right: 20 }}
            >
              Back To Home Page
            </Link>
        </div>
      </nav>
    </div>
  );
};

export default DisplayNav;
