import { ConnectWallet, useContract, useMetadata } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { Box, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { NFT_COLLECTION } from "../constants/addresses";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const {contract}=useContract(NFT_COLLECTION)
  const {data:metadata,isLoading:loadingMetadata}:any=useMetadata(contract)
  const collectionImage = metadata?.image;
  const collectionName=metadata?.name;

  return (
    <>
    <Container maxWidth={'1200px'}>
    {
      loadingMetadata ? (
        <Flex h={"90vh"} direction={"column"} justifyContent={"center"} alignItems={"center"}>
          <Spinner/>
        </Flex>
      ) : (
        <Container maxW={"1200px"}>
          <Box 
          backgroundImage={`url(${collectionImage})`}
          backgroundPosition={"center"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          h={"75vh"}
          p={8}
          borderRadius={8}
          >
          <Heading>{collectionName}</Heading>
          </Box>
          <SimpleGrid columns={2} spacing={10} my={10}>
           <NFTCard tokenId="4"/>
           <NFTCard tokenId="5"/>
           <NFTCard tokenId="2"/>
           <NFTCard tokenId="3"/>
          </SimpleGrid>
          </Container>
      )}
    </Container>
    </>
  );
};

export default Home;
