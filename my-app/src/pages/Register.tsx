import { VStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import { Wallet } from "ethers";

function Register() {
  const [searchParams] = useSearchParams();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletPrivateKey, setWalletPrivateKey] = useState("");

  console.log(searchParams.get("id_token"));

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5MDlFNzU0OUNhRkRiM2ZiQzU4RGQzOUVDZDJjQWNFMjJEOTA5OTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc2MzIyMzEzNjQsIm5hbWUiOiJDcnlwdG9DdXBpZCJ9.KNk-wQt268jNxuppDvhIE7Cov_lyE8AKeuqdywEOR4s";
    // return process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeFiles(obj: JSON) {
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    const files = [new File([blob], "user.json")];

    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }

  async function createWallet() {
    const wallet = Wallet.createRandom();
    setWalletAddress(wallet.address);
    setWalletPrivateKey(wallet.privateKey);
  }

  return (
    <VStack>
      <Text fontSize="3xl">Register</Text>
      <VStack backgroundColor="gray.100" minW="500px" borderRadius={4} p={4}>
        <Text fontSize="xl">Generate Wallet</Text>
        {walletPrivateKey ? (
          <VStack>
            <Text>Save your wallet private key!</Text>
            <Text>Wallet Address: {walletAddress}</Text>
            <Text>Wallet Private Key: {walletPrivateKey}</Text>
          </VStack>
        ) : (
          <Button colorScheme="blue" onClick={() => createWallet()}>
            Create wallet to chat
          </Button>
        )}
      </VStack>
    </VStack>
  );
}

export default Register;
