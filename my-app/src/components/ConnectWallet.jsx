import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { XmtpContext } from "../contexts/XmtpContext";
import { Box, Button } from "@chakra-ui/react";

const ConnectWallet = () => {
  const { connectWallet, walletAddress, signer } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);

  return (
    <Box>
      {walletAddress ? (
        <div className="flex align-center header-mobile">
          {/* <h3>{shortAddress(walletAddress)}</h3> */}
          {!providerState.client && (
            <Button
              onClick={() => providerState.initClient(signer)}
              padding="16px 24px"
              color="#2A283E"
              backgroundColor="#FCF9ED"
              borderTop="2px solid #3F3D50"
              borderRight="5px solid #3F3D50"
              borderBottom="5px solid #3F3D50"
              borderLeft="2px solid #3F3D50"
              borderRadius="0"
              fontFamily={"heading"}
              marginTop="30px"
            >
              connect to xmtp
            </Button>
          )}
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          padding="16px 24px"
          color="#2A283E"
          backgroundColor="#FCF9ED"
          borderTop="2px solid #3F3D50"
          borderRight="5px solid #3F3D50"
          borderBottom="5px solid #3F3D50"
          borderLeft="2px solid #3F3D50"
          borderRadius="0"
          fontFamily={"heading"}
          marginTop="30px"
        >
          {!window.ethereum || !window.ethereum.isMetaMask
            ? "install metamask"
            : "connect wallet"}
        </Button>
      )}
    </Box>
  );
};

export default ConnectWallet;