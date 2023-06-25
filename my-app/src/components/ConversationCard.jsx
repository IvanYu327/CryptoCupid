import { useContext } from "react";

import { shortAddress, truncate } from "../utils/utils";
import { Box } from "@chakra-ui/react";

import { UserContext } from "../pages/Home";

const ConversationCard = ({ setSelectedConvo, address, latestMessage }) => {
  const { users, currentUser } = useContext(UserContext);

  const nickname = users.find(
    (user) => user.walletAddress === address
  )?.nickname;

  return (
    <Box
      onClick={() => setSelectedConvo(address)}
      className="conversation-header flex justify-start"
      borderBottom="2px solid #3F3D50"
      width="100%"
      padding="16px 24px"
      m="0"
      fontFamily={"heading"}
      transition="color 1s"
      _hover={{
        backgroundColor: "#F2E9E1",
        cursor: "pointer",
      }}
    >
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
          <b>{nickname ? nickname : shortAddress(address)}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </Box>
  );
};

export default ConversationCard;
