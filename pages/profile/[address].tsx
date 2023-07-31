import React from 'react'
import { useRouter } from 'next/router';
import { MediaRenderer, Web3Button, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { NFT_COLLECTION } from '../../constants/addresses';
import { Box, Button, Container, Heading, useToast ,Text, SimpleGrid, Card, Flex, Input} from '@chakra-ui/react';
import { describe } from 'node:test';
function ProfilePage() {
    const router =useRouter();
    const address=useAddress();
    const {contract}=useContract(NFT_COLLECTION);
    const {data:ownerNFTs,isLoading:loadingOwnedNFTs}=useOwnedNFTs(contract,address)
    const [transferAddress,setTransferAddress]=React.useState("");
    const toast=useToast();
  return (
    <>
    <Container maxW={"1200px"} mt={10}>
<Button onClick={()=>router.push("/")}>Back</Button>
<Heading mt={10}>Profile</Heading>
<Box mt={10}>
<Text fontWeight={"bold"}>My Elements</Text>
<SimpleGrid columns={4} spacing={10} my={4}>
{!loadingOwnedNFTs&&ownerNFTs?.map((nft,index)=>(
    <Card key={index} overflow={"hidden"} p={2}>
        <MediaRenderer
        src={nft.metadata.image}
        height='100%'
        width='100%'
        />
    <Flex justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
        <Text ml={4} fontWeight={"bold"}>{nft.metadata.name}</Text>
        <Text mr={4}>Qty: {nft.quantityOwned}</Text>
    </Flex>
    <Text fontSize={"x-small"} ml={4}>Transfer to:</Text>
    <Input
    placeholder='0x000000'
    width={"90%"}
    mx={"auto"}
    value={transferAddress}
    onChange={(e)=> setTransferAddress(e.target.value)}
    mb={4}
    />
    {transferAddress!=""&&(
        <Box mb={4} mx={"auto"}>
            <Web3Button
            contractAddress={NFT_COLLECTION}
            action={(contract)=>contract.erc1155.transfer(transferAddress,nft.metadata.id,1)}
            onSubmit={()=>setTransferAddress("")}
            onSuccess={()=>
            toast({
                title:'Transfer Completed.',
                description:"Your Saiyan has been transfered.",
                status:"success",
                duration:9000,
                isClosable:true,
            })
        }
        >Transfer</Web3Button>
        </Box>
    )}
    </Card>
))}
</SimpleGrid>
</Box>
    </Container>
    </>
  )
}

export default ProfilePage