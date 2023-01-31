import React, { useState } from 'react';
import "../LinkSwitcher/LinkSwitcher.css"

const LinkSwitcher = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="LinkSwitcher">
      <div className={`LinkSwitcher-inner ${isLogin ? 'is-login' : 'is-signup'}`}>
        <div
          className={`LinkSwitcher-link ${isLogin ? 'is-active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </div>
        <div
          className={`LinkSwitcher-link ${!isLogin ? 'is-active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default LinkSwitcher;
