import React, { useContext, useState } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import ConnectWallet from "./ConnectWallet";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";

const ChatHome = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [selectedConvo, setSelectedConvo] = useState("");
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSelectedConvo(null);
    setIsNewMsg(false);
    setErrorMsg("");
    setMsgTxt("");
  };

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress);
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvo(newAddress);
        setErrorMsg("");
      }
    }
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
        <Heading
          fontSize="64px"
          fontWeight={400}
          mt={6}
          color="#3F3D50"
          w="1600px"
        >
          Here are your matches!
        </Heading>
        <ConnectWallet />
      </HStack>

      <div className="flex align-center flex-dir-col home">
        {/* <button onClick={testSend}>Click to send intro message to Albert</button> */}

        {client && (
          <div className="card">
            {/* {!selectedConvo && !isNewMsg ? ( */}
            <>
              <CardHeader setIsNewMsg={setIsNewMsg} />
              <div className="conversation-list">
                <ConversationList
                  convoMessages={convoMessages}
                  selectedConvo={selectedConvo}
                  setSelectedConvo={setSelectedConvo}
                  sendNewMatchMessage={sendNewMatchMessage}
                />
              </div>
            </>
            {/* ) : ( */}
            <>
              <div className="conversation-header align-center flex justify-start">
                {/* <BackButton reset={reset} /> */}
                <div className="identicon"></div>
                <AddressInput
                  isNewMsg={false}
                  onInputBlur={onInputBlur}
                  errorMsg={errorMsg}
                  selectedConvo={selectedConvo}
                />
              </div>
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
            </>
            {/* )} */}
          </div>
        )}
      </div>
    </Box>
  );
};

export default ChatHome;
