function Landing() {
  const prodLink =
    "https://id.worldcoin.org/authorize?client_id=app_c832e446eca015338033033145ce8940&response_type=code%20token%20id_token&redirect_uri=https%3A%2F%2Fgoogle.ca&state={state_value}&nonce={nonce_value}";

  const redirAuth = () => {
    window.location.href = prodLink;
  };

  return (
    <div>
      <h1>Landing</h1>

      <button onClick={redirAuth}>Sign in with world coin</button>
    </div>
  );
}

export default Landing;
