import React from "react";
import { Box } from "@chakra-ui/react";

const MessageCard = ({ msg, self }) => {
  console.log(msg.content);
  return (
    <Box mb="9px">
      <Box
        ml={self ? "auto" : "32px"}
        bg={self ? "#2A283EB2" : "#F2E9E1"}
        color={self ? "#FCF9ED" : "#3F3D50"}
        mr="32px"
        p="8px 12px"
        maxWidth="200px"
        wordBreak="break-word"
        width="fit-content"
        fontFamily="heading"
      >
        {msg.content}
      </Box>
    </Box>
  );
};

export default MessageCard;
