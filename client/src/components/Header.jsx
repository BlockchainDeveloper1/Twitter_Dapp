import React from "react";

function Header({ connectWallet, userAddress }) {
  return (
    <div className="header">
      <h1>Twitter DApp</h1>
      <button onClick={connectWallet}>
        {userAddress ? `Connected: ${userAddress.slice(0, 6)}...` : "Connect Wallet"}
      </button>
    </div>
  );
}

export default Header;
