import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import ConnectWallet from "./ConnectWallet";
import MessageComposer from "./MessageComposer";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";
import { shortAddress } from "../utils/utils";
import { Box, Heading, Text, VStack, Image, HStack } from "@chakra-ui/react";

const ChatHome = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState("");
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const sendNewMatchMessage = async (
    walletId = "",
    introMsg = "Hey this is an intro to myself. I love you."
  ) => {
    const isOnNetwork = await checkIfOnNetwork(walletId);
    if (isOnNetwork) {
      console.log(introMsg);
      setSelectedConvo(walletId);
      sendMessage(introMsg);
      setSelectedConvo("");
    }
  };

  const sendNewMessage = () => {
    sendMessage(msgTxt);
    setMsgTxt("");
  };

  return (
    <Box backgroundColor="#FCF9ED" pl="10%" pt="5%">
      <HStack>
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
      <HStack align="center">
        <Heading fontSize="64px" fontWeight={400} mt={6} color="#3F3D50">
          Here are your matches!
        </Heading>
        <ConnectWallet />
      </HStack>
      <Box backgroundColor="#FCF9ED" pb="50px">
        {client ? (
          <HStack
            border="2px solid #3F3D50"
            height="500px"
            width="80vw"
            minWidth="200px"
            mt="54px"
            spacing="0"
          >
            <Box
              borderRight="2px solid #3F3D50"
              width="15%"
              minWidth="200px"
              height="100%"
              overflowY="auto"
            >
              <ConversationList
                convoMessages={convoMessages}
                selectedConvo={selectedConvo}
                setSelectedConvo={setSelectedConvo}
                sendNewMatchMessage={sendNewMatchMessage}
              />
            </Box>
            <Box height="100%" width="100%">
              <Box
                width="auto"
                pt="6px"
                pb="8px"
                backgroundColor="rgba(42, 40, 62, 0.70)"
                textAlign="center"
                fontSize="1rem"
                fontFamily={"heading"}
                color="#FCF9ED"
              >
                {shortAddress(selectedConvo)}
              </Box>
              <MessageList
                isNewMsg={false}
                convoMessages={convoMessages.get(selectedConvo) ?? []}
                selectedConvo={selectedConvo}
              />
              <hr />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
              />
            </Box>
          </HStack>
        ) : (
          <Box
            border="2px solid #3F3D50"
            height="500px"
            width="80vw"
            minWidth="200px"
            mt="54px"
          >
            <VStack marginTop="175px">
              <Image src="./logo.svg" mr={2} h={"35px"} />
              <Text
                width="200px"
                height="50px"
                margin="auto"
                fontFamily="heading"
                as="i"
                textAlign="center"
              >
                connect your credentials first to meet your matches
              </Text>
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatHome;
