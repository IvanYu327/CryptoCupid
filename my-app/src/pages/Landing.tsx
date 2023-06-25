import { Button, Text, VStack } from "@chakra-ui/react";

function Landing() {
  const prodLink =
    "https://id.worldcoin.org/authorize?client_id=app_c832e446eca015338033033145ce8940&response_type=id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregister&state={state_value}&nonce={nonce_value}";

  const redirAuth = () => {
    window.location.href = prodLink;
  };

  return (
    <VStack>
      <Text fontSize="3xl">Landing</Text>

      <Button onClick={redirAuth}>Sign in with Worldcoin</Button>
    </VStack>
  );
}

export default Landing;
