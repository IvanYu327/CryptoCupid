import React from "react";
import { Input } from "@chakra-ui/react";

const MessageInput = ({ onInputBlur, value, setNewValue, placeholder }) => (
  <Input
    value={value}
    onChange={(e) => setNewValue(e.target.value)}
    type="text"
    onBlur={onInputBlur}
    className="text-input"
    placeholder={placeholder}
    fontFamily="heading"
    border="0"
    height="100%"
    margin="auto 0"
    boxShadow="none !important"
  />
);

export default MessageInput;
