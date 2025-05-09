// IdxPage.js
import React from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

function IdxPage() {
  return (
    <div className="h-screen w-screen overflow-y-scroll">
      {/* Link at the top */}
      <div className="text-white text-lg text-center p-4 bg-black">
        <Link to="/idx" className="index-link">
          Index
        </Link>
      </div>

      {/* Your page content */}
      <div className="text-white text-center mt-8">
        <Link to="/app" className="sso-link">
          Superstars Only
        </Link>
      </div>
      <div className="text-white text-center mt-8">
        <p className="list">
          <i>Something</i> by Some One
        </p>
        <p className="list">
          <i>Something Else</i> by Some One
        </p>
        <p className="list">
          <i>Something Else</i> by Some One Else
        </p>
      </div>
    </div>
  );
}

export default IdxPage;

