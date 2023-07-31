import type { AppProps } from "next/app";
import { ThirdwebProvider, ThirdwebSDK, localWallet, metamaskWallet, smartWallet, useSDK, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { API_KEY, FACTORY_ADDRESS, SECRET_KEY } from "../constants/addresses";
import Navbar from "../components/Navbar";
import { config } from "process";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const sdk = new ThirdwebSDK("mumbai", {
    clientId: "a7d6e7c5719911940aa9c48c358e4ee5",
  });
  return (
    <ThirdwebProvider
    
      clientId={API_KEY}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          paymasterUrl:"",
          factoryAddress:FACTORY_ADDRESS,
          gasless:true,
          
          personalWallets:[
            metamaskWallet(),
            localWallet({persist:true}),
            walletConnect(),
          ]
        })
    ]
    }
    >
      <ChakraProvider>
        <Navbar/>
      <Component {...pageProps} />
      </ChakraProvider>
      </ThirdwebProvider>
  );
}

export default MyApp;
