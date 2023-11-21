import {
  VStack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Textarea,
  Input,
  NumberInputField,
  NumberInput,
  Image,
  HStack,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import { Wallet } from "ethers";

function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletPrivateKey, setWalletPrivateKey] = useState("");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [genderIdentity, setGenderIdentity] = useState("");
  const [intro, setIntro] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [lowerAge, setLowerAge] = useState("");
  const [upperAge, setUpperAge] = useState("");

  const genders = [
    "heterosexual",
    "homosexual",
    "bisexual",
    "pansexual",
    "asexual",
  ];
  const sexualOrientations = ["male", "female", "non-binary"];

  const worldID = searchParams.get("id_token");

  useEffect(() => {
    if (!worldID) {
      navigate("/");
    }
    const wallet = Wallet.createRandom();
    setWalletAddress(wallet.address);
    setWalletPrivateKey(wallet.privateKey);
  }, [worldID, navigate]);

  function makeStorageClient() {
    return new Web3Storage({
      token: process.env.REACT_APP_WEB3STORAGE_TOKEN as string,
    });
  }

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const obj = {
      nickname,
      walletAddress,
      worldID,
      intro,
      info: {
        sexualOrientation,
        genderIdentity,
        birthYear,
        lowerAge,
        upperAge,
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

  const onNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const onSexChange = (event: any) => {
    setSexualOrientation(event.target.value);
  };

  const onGenderChange = (event: any) => {
    setGenderIdentity(event.target.value);
  };

  const onBirthYearChange = (event: any) => {
    setBirthYear(event.target.value);
  };

  const onLowerAgeChange = (event: any) => {
    setLowerAge(event.target.value);
  };

  const onUpperAgeChange = (event: any) => {
    setUpperAge(event.target.value);
  };

  return (
    <Box backgroundColor="#FCF9ED" h="full" pl="10%" pt="5%">
      <Image src="./heart1.svg" position="fixed" top="30%" left="60%" />
      <Image src="./heart2.svg" position="fixed" top="50%" left="72%" />
      <VStack alignItems="flex-start" maxW="600px">
        <HStack mb={4}>
          <Image src="./logo.svg" mr={2} h={"35px"} />
          <Text
            fontFamily={"logo"}
            fontSize="22px"
            fontWeight={400}
            color="#3F3D50"
          >
            crypto cupid
          </Text>
        </HStack>
        <Heading fontWeight="400" fontSize="64px" mb="56px">
          Let’s get you set up.
        </Heading>
        <VStack
          fontFamily="heading"
          fontWeight="400"
          fontSize="24px"
          alignItems="flex-start"
          maxW="600px"
        >
          <Text>
            Wallet Private Key <Text as="i">(save this!)</Text>
          </Text>
          {walletPrivateKey && (
            <Text fontFamily="mono" wordBreak="break-word" color="#3F3D50">
              {walletPrivateKey}
            </Text>
          )}
          <FormControl as="fieldset" mt="32px">
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              Nickname:
            </FormLabel>
            <Input
              minH="60px"
              size="lg"
              fontSize="24px"
              fontWeight="400"
              placeholder="vitalik"
              onChange={onNicknameChange}
              border="2px rgba(63, 61, 80, 0.5) solid"
              borderRadius="0"
              _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
              _focus={{
                borderColor: "rgba(63, 61, 80, 1)",
                boxShadow: "none",
                transition: "none",
              }}
            />
            <Spacer h="48px" />
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              What’s your gender identity?
            </FormLabel>
            <Select
              minH="60px"
              placeholder="select gender"
              onChange={onGenderChange}
              size="lg"
              fontSize="24px"
              fontWeight="400"
              color="#3F3D50"
              border="2px rgba(63, 61, 80, 0.5) solid"
              borderRadius="0"
              _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
              _focus={{
                border: "2px rgba(63, 61, 80, 0.5) solid",
                borderRight: "5px rgba(63, 61, 80, 0.5) solid",
                borderBottom: "5px rgba(63, 61, 80, 0.5) solid",
                boxShadow: "none",
                transition: "none",
              }}
            >
              {genders.map((gender) => (
                <option value={gender}>{gender}</option>
              ))}
            </Select>
            <Spacer h="48px" />
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              What’s your sexual orientation?
            </FormLabel>
            <Select
              minH="60px"
              placeholder="select orientation"
              onChange={onSexChange}
              size="lg"
              fontSize="24px"
              fontWeight="400"
              color="#3F3D50"
              border="2px rgba(63, 61, 80, 0.5) solid"
              borderRadius="0"
              _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
              _focus={{
                border: "2px rgba(63, 61, 80, 0.5) solid",
                borderRight: "5px rgba(63, 61, 80, 0.5) solid",
                borderBottom: "5px rgba(63, 61, 80, 0.5) solid",
                boxShadow: "none",
                transition: "none",
              }}
            >
              {sexualOrientations.map((sex) => (
                <option value={sex}>{sex}</option>
              ))}
            </Select>
            <Spacer h="48px" />
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              What’s your birth year?
            </FormLabel>
            <NumberInput size="lg">
              <NumberInputField
                minH="60px"
                placeholder="1994"
                onChange={onBirthYearChange}
                fontSize="24px"
                fontWeight="400"
                border="2px rgba(63, 61, 80, 0.5) solid"
                borderRadius="0"
                _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
                _focus={{
                  borderColor: "rgba(63, 61, 80, 1)",
                  boxShadow: "none",
                  transition: "none",
                }}
              />
            </NumberInput>
            <Spacer h="48px" />
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              My match should be at least __ years old:
            </FormLabel>
            <NumberInput size="lg">
              <NumberInputField
                minH="60px"
                placeholder="26"
                onChange={onLowerAgeChange}
                fontSize="24px"
                fontWeight="400"
                border="2px rgba(63, 61, 80, 0.5) solid"
                borderRadius="0"
                _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
                _focus={{
                  borderColor: "rgba(63, 61, 80, 1)",
                  boxShadow: "none",
                  transition: "none",
                }}
              />
            </NumberInput>
            <Spacer h="48px" />
            <FormLabel
              mb={4}
              color="#3F3D50"
              fontSize="24px"
              fontWeight="400"
              as="legend"
            >
              My match should be at most __ years old:
            </FormLabel>
            <NumberInput size="lg">
              <NumberInputField
                minH="60px"
                placeholder="31"
                onChange={onUpperAgeChange}
                fontSize="24px"
                fontWeight="400"
                border="2px rgba(63, 61, 80, 0.5) solid"
                borderRadius="0"
                _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
                _focus={{
                  borderColor: "rgba(63, 61, 80, 1)",
                  boxShadow: "none",
                  transition: "none",
                }}
              />
            </NumberInput>
            <Spacer h="48px" />
            <FormLabel mb={4} color="#3F3D50" fontSize="24px" fontWeight="400">
              Write a short intro about yourself:
            </FormLabel>
            <Textarea
              placeholder="Hi! I'm Vitalik and I love ethereum. Looking forward to gething to know you better!"
              onChange={(e) => setIntro(e.target.value)}
              size="lg"
              fontSize="24px"
              fontWeight="400"
              minH="200px"
              border="2px rgba(63, 61, 80, 0.5) solid"
              borderRadius="0"
              _hover={{ border: "2px rgba(63, 61, 80, 0.5) solid" }}
              _focus={{
                borderColor: "rgba(63, 61, 80, 1)",
                boxShadow: "none",
                transition: "none",
              }}
              resize="none"
            />
            <Spacer h="48px" />
            <Button
              minH="52px"
              fontFamily={"heading"}
              onClick={handleSubmit}
              isLoading={submitLoading}
              color="#2A283E"
              backgroundColor="#FCF9ED"
              border="2px #2A283E solid"
              fontWeight={400}
              borderRadius={0}
              py={4}
              px={6}
              fontSize="20px"
              mb={32}
              _hover={{
                border: "2px #2A283E solid",
                borderRight: "5px #2A283E solid",
                borderBottom: "5px #2A283E solid",
              }}
            >
              save and continue
            </Button>
          </FormControl>
        </VStack>
      </VStack>
    </Box>
  );
}

export default Register;
