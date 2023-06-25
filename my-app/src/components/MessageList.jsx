import React, { useContext } from "react";
import useStreamMessages from "../hooks/useStreamMessages";
import MessageCard from "./MessageCard";
import { UserContext } from "../pages/Home";
import { Box } from "@chakra-ui/react";

const MessageList = ({ isNewMsg, convoMessages, selectedConvo }) => {
  useStreamMessages(selectedConvo);
  const { users, currentUser } = useContext(UserContext);

  return (
    <Box height="410px" pt="40px" overflowY="auto">
      {!isNewMsg &&
        convoMessages.map((msg) => {
          return (
            <MessageCard
              key={msg.id}
              msg={msg}
              self={currentUser.walletAddress === msg.senderAddress}
            />
          );
        })}
    </Box>
  );
};

export default MessageList;
