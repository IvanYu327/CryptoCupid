import {
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import { Wallet } from "ethers";

function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletPrivateKey, setWalletPrivateKey] = useState("");
  const [gender, setGender] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [intro, setIntro] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [age, setAge] = useState("");
  const [preferredAge, setPreferredAge] = useState("");

  const genders = ["male", "female", "non-binary"];
  const ageRange = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

  const worldID = searchParams.get("id_token");

  useEffect(() => {
    if (!worldID) {
      navigate("/");
    }
  }, [worldID, navigate]);

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg5MDlFNzU0OUNhRkRiM2ZiQzU4RGQzOUVDZDJjQWNFMjJEOTA5OTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc2MzIyMzEzNjQsIm5hbWUiOiJDcnlwdG9DdXBpZCJ9.KNk-wQt268jNxuppDvhIE7Cov_lyE8AKeuqdywEOR4s";
    // return process.env.REACT_APP_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const obj = {
      walletAddress: walletAddress,
      worldID,
      intro,
      info: {
        gender,
        age,
      },
      preferences: {
        gender: preferredGender,
        age: preferredAge,
      },
    };
    const cid = await storeFiles(obj);
    setSubmitLoading(false);
    navigate({
      pathname: "/home",
      search: `?cid=${cid}`,
    });
  };

  async function storeFiles(obj: object) {
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

  const onGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const onPreferredGenderChange = (event: any) => {
    setPreferredGender(event.target.value);
  };

  const onAgeChange = (event: any) => {
    setAge(event.target.value);
  };

  const onPreferredAgeChange = (event: any) => {
    setPreferredAge(event.target.value);
  };

  return (
    <VStack>
      <Text fontSize="3xl">Register</Text>
      <VStack backgroundColor="gray.100" minW="500px" borderRadius={8} p={4}>
        <Text fontSize="xl">Generate Wallet</Text>
        {walletPrivateKey ? (
          <VStack>
            <Text>
              Import this wallet into MetaMask and save the private key!
            </Text>
            <Text>Wallet Address: {walletAddress}</Text>
            <Text>Wallet Private Key: {walletPrivateKey}</Text>
          </VStack>
        ) : (
          <Button colorScheme="blue" onClick={() => createWallet()}>
            Create wallet to chat
          </Button>
        )}
      </VStack>
      <VStack>
        <Text fontSize="xl">Info & Preferences</Text>
        <FormControl as="fieldset">
          <FormLabel as="legend">Gender</FormLabel>
          <Select placeholder="Select gender" onChange={onGenderChange}>
            {genders.map((gender) => (
              <option value={gender}>{gender}</option>
            ))}
          </Select>
          <Spacer h={4} />
          <FormLabel as="legend">Preferred Gender</FormLabel>
          <Select
            placeholder="Select gender"
            onChange={onPreferredGenderChange}
          >
            {genders.map((gender) => (
              <option value={gender}>{gender}</option>
            ))}
          </Select>
          <Spacer h={8} />
          <FormLabel as="legend">Age</FormLabel>
          <Select placeholder="Select age" onChange={onAgeChange}>
            {ageRange.map((age) => (
              <option value={age}>{age}</option>
            ))}
          </Select>
          <Spacer h={4} />
          <FormLabel as="legend">Preferred Age</FormLabel>
          <Select placeholder="Select age" onChange={onPreferredAgeChange}>
            {ageRange.map((age) => (
              <option value={age}>{age}</option>
            ))}
          </Select>
          <Spacer h={8} />
          <FormLabel>Intro</FormLabel>
          <Textarea
            placeholder="Hi! I'm Vitalik and I love ethereum. Looking forward to gething to know you better!"
            onChange={(e) => setIntro(e.target.value)}
          />
          <FormHelperText>
            This will be sent as your first message for each new conversation.
          </FormHelperText>
          <Spacer h={4} />
          <Button onClick={handleSubmit} isLoading={submitLoading}>
            Complete
          </Button>
        </FormControl>
      </VStack>
    </VStack>
  );
}

export default Register;
