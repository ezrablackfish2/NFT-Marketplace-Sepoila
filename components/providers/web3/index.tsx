import { createContext, FunctionComponent, useContext, useState, useEffect } from "react";
import { createDefaultState, Web3State, loadContract } from "./utils";
import { ethers } from "ethers";





const Web3Context = createContext<Web3State>(createDefaultState());


const Web3Provider:FunctionComponent = ({ children }) => {

	const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());


	useEffect(() => {
		async function initWeb3() {
		
		const provider = new ethers.providers.Web3Provider(window.ethereum as any);
		const contract = await loadContract("NftMarket", provider);

			setWeb3Api({
				ethereum: window.ethereum,
				provider,
				contract,
				isLoading: false
			})
		}	

		initWeb3();
	}, [])


	return (
		<Web3Context.Provider value={web3Api}>
			{children}
		</Web3Context.Provider>
	)
}


export function useWeb3() {
	return useContext(Web3Context);
}


export default Web3Provider;
