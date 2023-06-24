import React from 'react';
import logo from './logo.svg';
import './App.css';

const prodLink = "https://id.worldcoin.org/authorize?client_id=app_c832e446eca015338033033145ce8940&response_type=code%20token%20id_token&redirect_uri=https%3A%2F%2Fgoogle.ca&state={state_value}&nonce={nonce_value}"

const redirAuth = () => {
  window.location.href = prodLink;
};

function App() {

  return (
    <>
      <div>
      testing world coin auth
    </div>
    
    <button onClick = {redirAuth}>
      Sign in with world coin
    </button>
    </>
  )
}

export default App;
