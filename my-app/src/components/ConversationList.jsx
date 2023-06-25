import React from "react";
import { useState, useContext, useEffect } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useStreamConversations from "../hooks/useStreamConversations";
import { Box, Text } from "@chakra-ui/react";

import { getLatestMessage, shortAddress } from "../utils/utils";
import ConversationCard from "./ConversationCard";
import { UserContext } from "../pages/Home";
import useSendMessage from "../hooks/useSendMessage";

const ConversationList = ({
  convoMessages,
  selectedConvo,
  setSelectedConvo,
  sendNewMatchMessage,
}) => {
  const { users, currentUser } = useContext(UserContext);

  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  console.log("users");
  console.log(users);

  // for (const user of users) {
  //   if (!Array.from(sortedConvos.keys()).includes(user.walletAddress)) {
  //     console.log(`Sending message to ${shortAddress(user.walletAddress)}`);
  //     sendNewMatchMessage(user.walletAddress, currentUser.intro);
  //   }
  // }

  const [providerState] = useContext(XmtpContext);
  const { client } = providerState;
  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };
  let [emptyConvoAddresses, setEmptyConvoAddresses] = useState([]);

  useEffect(() => {
    async function populateEmptyConvoAddresses() {
      let u = users
        .map((user) => user.walletAddress)
        .filter((addr) => !Array.from(sortedConvos.keys()).includes(addr))
        .filter((addr) => addr !== currentUser.walletAddress);
      let v = [];
      for (let a of u) {
        if (await checkIfOnNetwork(a)) {
          v.push(a);
        }
      }
      setEmptyConvoAddresses(v);
    }
    populateEmptyConvoAddresses();
  }, []);

  let conversations = 0;

  return (
    <>
      {Array.from(sortedConvos.keys()).map((address) => {
        if (users.map((user) => user.walletAddress).includes(address)) {
          conversations++;
          return (
            <ConversationCard
              key={"Convo_" + address}
              setSelectedConvo={setSelectedConvo}
              address={address}
              latestMessage={getLatestMessage(sortedConvos.get(address))}
            />
          );
        }
      })}
      {emptyConvoAddresses.filter((addr) => !Array.from(sortedConvos.keys()).includes(addr)).map((address) => {
        conversations++;
        return (
          <ConversationCard
            key={"Convo_" + address}
            setSelectedConvo={setSelectedConvo}
            address={address}
            latestMessage={getLatestMessage(sortedConvos.get(address))}
          />
        );
      })}
      {conversations === 0 && (
        <Box textAlign="center" paddingTop="32px">
          <Box fontFamily="heading" as="i">
            No matches yet!
          </Box>
        </Box>
      )}
    </>
  );
};

export default ConversationList;
