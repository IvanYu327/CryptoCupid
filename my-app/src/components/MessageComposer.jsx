import React from "react";
import MessageInput from "./Input";
import { Box, HStack } from "@chakra-ui/react";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <Box borderTop="2px solid #3F3D50" padding="auto 0">
      <HStack>
        <MessageInput
          setNewValue={setMsgTxt}
          placeholder="Message ..."
          value={msgTxt}
        />
        <button className="btn" onClick={sendNewMessage}>
          Send
        </button>
      </HStack>
    </Box>
  );
};

export default MessageComposer;
