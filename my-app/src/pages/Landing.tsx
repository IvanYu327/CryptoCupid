import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";

function Landing() {
  const prodLink =
    "https://id.worldcoin.org/authorize?client_id=app_c832e446eca015338033033145ce8940&response_type=id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregister&state={state_value}&nonce={nonce_value}";

  const redirAuth = () => {
    window.location.href = prodLink;
  };

  return (
    <Box h="100vh" backgroundColor="#FCF9ED" pl="20%">
      <VStack h="full" alignItems="flex-start" justifyContent="center">
        <HStack>
          <Image src="./logo.svg" mr={2} />
          <Text
            fontFamily={"logo"}
            fontSize="40px"
            fontWeight={400}
            color="#3F3D50"
          >
            crypto cupid
          </Text>
        </HStack>
        <Heading fontSize="96px" fontWeight={400} mt={6} color="#3F3D50">
          Love for all humans
        </Heading>
        <Heading fontSize="96px" fontWeight={400} as="i" mb={8} color="#3F3D50">
          (and only humans).
        </Heading>
        <Button
          fontFamily={"heading"}
          onClick={redirAuth}
          color="#2A283E"
          backgroundColor="#FCF9ED"
          border="2px #2A283E solid"
          fontWeight={400}
          borderRadius={0}
          py={4}
          px={8}
          fontSize="36px"
          minH="72px"
          mb={8}
          _hover={{
            border: "2px #2A283E solid",
            borderRight: "5px #2A283E solid",
            borderBottom: "5px #2A283E solid",
          }}
          rightIcon={
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.9965 7.64682C23.3639 6.16359 22.4695 4.83306 21.3132 3.67701C20.157 2.52097 18.8482 1.62667 17.3648 0.994116C15.8159 0.339755 14.1798 0.0125732 12.5 0.0125732C10.7984 0.0125732 9.16231 0.339755 7.63525 0.994116C6.15183 1.62667 4.82112 2.52097 3.66492 3.67701C2.50873 4.83306 1.61431 6.16359 0.981676 7.64682C0.327225 9.17364 0 10.8096 0 12.5109C0 14.1905 0.327225 15.8264 0.981676 17.3751C1.61431 18.8583 2.50873 20.1888 3.66492 21.3449C4.82112 22.5009 6.15183 23.3952 7.63525 24.0059C9.18411 24.6603 10.8202 24.9875 12.5 24.9875C14.1798 24.9875 15.8159 24.6603 17.3648 24.0059C18.8482 23.3734 20.1788 22.4791 21.3351 21.3231C22.4913 20.167 23.3857 18.8364 24.0183 17.3532C24.6728 15.8046 25 14.1687 25 12.4891C25 10.8096 24.651 9.17364 23.9965 7.64682ZM8.35515 11.333C8.85688 9.32635 10.6894 7.86498 12.849 7.86498H21.5314C22.0986 8.93375 22.4476 10.1116 22.5785 11.333H8.35515ZM22.5785 13.6888C22.4476 14.9103 22.0768 16.0881 21.5314 17.1569H12.849C10.6894 17.1569 8.87868 15.6737 8.35515 13.6888H22.5785ZM5.32286 5.33473C7.24258 3.41527 9.79496 2.36829 12.5 2.36829C15.205 2.36829 17.7574 3.41527 19.6771 5.33473C19.7426 5.40017 19.7862 5.4438 19.8516 5.50923H12.849C10.9729 5.50923 9.22777 6.22903 7.89701 7.55958C6.84991 8.60652 6.17364 9.91526 5.95549 11.333H2.42146C2.68324 9.06459 3.68673 6.97064 5.32286 5.33473ZM12.5 22.6536C9.79496 22.6536 7.24258 21.6066 5.32286 19.6871C3.68673 18.0512 2.68324 15.9354 2.42146 13.6888H5.95549C6.19546 15.1066 6.87172 16.4153 7.89701 17.4623C9.22777 18.7928 10.9729 19.5126 12.849 19.5126H19.8516C19.7862 19.5781 19.7426 19.6217 19.6771 19.6871C17.7574 21.6066 15.205 22.6536 12.5 22.6536Z"
                fill="#2A283E"
              />
            </svg>
          }
        >
          sign in with
        </Button>
      </VStack>
    </Box>
  );
}

export default Landing;
