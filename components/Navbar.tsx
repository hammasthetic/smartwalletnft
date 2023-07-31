import { Avatar,Container,Flex,Menu,MenuButton,MenuItem,MenuList, Text } from "@chakra-ui/react";
import { ConnectWallet,useAddress,useDisconnect } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from 'react'

function Navbar() {
    const address=useAddress();
    const disconnect=useDisconnect();
  return (
    <Container maxWidth={"1200px"} py={5}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={"bold"}>Smart Wallet NFT Market</Text>
            {!address ? (
                <ConnectWallet 
                className={styles.walletButton}
                btnTitle="Sign In"
                theme="light"
                />
            )   :  (
                <>
                <ConnectWallet 
                className={styles.walletButton}
                btnTitle="Sign In"
                theme="light"
                />
                <Menu>
                    <MenuButton>
                        <Avatar size={"sm"} src={`https://avatars.dicebear.com/api/avataaars/${address}.svg`}/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                        <Link href={`/profile/${address}`}>
                            Profile
                        </Link>
                        </MenuItem>
                        <MenuItem onClick={disconnect}>Sign Out</MenuItem>
                    </MenuList>
                </Menu>
</>
                
            )
            
        
        }
        </Flex>
    </Container>
  )
}

export default Navbar