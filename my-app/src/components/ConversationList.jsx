import React from "react";
import { useState, createContext, useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useStreamConversations from "../hooks/useStreamConversations";

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

  for (const user of users) {
    if (!Array.from(sortedConvos.keys()).includes(user.walletAddress)) {
      console.log(`Sending message to ${shortAddress(user.walletAddress)}`);
      sendNewMatchMessage(user.walletAddress, currentUser.intro);
    }
  }

  return (
    <>
      {Array.from(sortedConvos.keys()).map((address) => {
        if (sortedConvos.get(address).length >= 0) {
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
