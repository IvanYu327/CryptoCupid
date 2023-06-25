import React from "react";
import { useState, createContext, useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useStreamConversations from "../hooks/useStreamConversations";

import { getLatestMessage } from "../utils/utils";
import ConversationCard from "./ConversationCard";
import { UserContext } from "../pages/Home";
import useSendMessage from "../hooks/useSendMessage";

const ConversationList = ({
  convoMessages,
  selectedConvo,
  setSelectedConvo,
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
  //     const isOnNetwork = await checkIfOnNetwork(user.walletAddress);
  //     if (isOnNetwork) {

  //     console.log("sending new message");
  //     setSelectedConvo(user.walletAddress);
  //     const introMsg = currentUser
  //       ? currentUser.intro
  //       : "Hey, we've matched! Let's chat!";
  //     sendMessage(introMsg);}
  //   }
  // }

  const [providerState] = useContext(XmtpContext);
  const { convoMessagess, client } = providerState;
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  async function processUsers(users) {
    for (const user of users) {
      if (!Array.from(sortedConvos.keys()).includes(user.walletAddress)) {
        const isOnNetwork = await checkIfOnNetwork(user.walletAddress);
        if (isOnNetwork) {
          console.log("Sending new message");
          setSelectedConvo(user.walletAddress);
          const introMsg = currentUser
            ? currentUser.intro
            : "Hey, we've matched! Let's chat!";
          await sendMessage(introMsg);
        } else {
          console.log("User is not on network");
        }
      }
    }
  }

  // Call the async function
  processUsers(users)
    .then(() => {
      console.log("All messages sent");
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <>
      {Array.from(sortedConvos.keys()).map((address) => {
        if (sortedConvos.get(address).length > 0) {
          return (
            <ConversationCard
              key={"Convo_" + address}
              setSelectedConvo={setSelectedConvo}
              address={address}
              latestMessage={getLatestMessage(sortedConvos.get(address))}
            />
          );
        } else return null;
      })}
    </>
  );
};

export default ConversationList;
