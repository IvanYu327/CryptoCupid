import React from "react";
import MessageInput from "./Input";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <Box borderTop="2px solid #3F3D50" padding="auto 0">
      <HStack>
        <MessageInput
          setNewValue={setMsgTxt}
          placeholder="Message ..."
          value={msgTxt}
        />
        <IconButton
          icon={<HiOutlinePaperAirplane />}
          aria-label="Send"
          onClick={sendNewMessage}
          mr="5px"
          bg="none"
          _hover="none"
          size="lg"
          transform="rotate(90deg)"
        />
      </HStack>
    </Box>
  );
};

export default MessageComposer;
