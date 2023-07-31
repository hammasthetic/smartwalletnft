import { Web3Button, useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { NFT_COLLECTION } from "../constants/addresses";
import { Box, Flex, Heading ,Text} from "@chakra-ui/react";

type Props={
    tokenId: string;
};
const NFTCard:React.FC<Props>=({tokenId})=>{
    const address=useAddress();
    const {contract}= useContract(NFT_COLLECTION);
    const {data}=useNFT(contract,tokenId);
    return(
        <>
        <Box
        backgroundImage={`url(${data?.metadata.image})`}
        backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
        h={"50vh"}
        borderRadius={8}
        p={8}
        >
            <Flex
            h={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
            >
                <Heading 
                color={"black"}
                >
                    {data?.metadata.name}
                </Heading>
                {!address ? (
                    <Text color={"black"} fontWeight={"bold"}>Sign In to claim Saiyan</Text>
                )   :   (
                    <Web3Button
                    contractAddress={NFT_COLLECTION}
                    action={(contract)=> contract.erc1155.claim(tokenId,1)}
                    >
                        Claim Element
                    </Web3Button>
                )}
            </Flex>
        </Box>
        </>
    )
};
export default NFTCard;