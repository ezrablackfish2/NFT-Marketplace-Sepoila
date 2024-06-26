import { MetaMaskInpageProvider } from "@metamask/providers"; 
import { Contract, providers } from "ethers";


declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
	}
}



export type Web3Params = {
	ethereum: MetaMaskInpageProvider | null;
	provider: providers.Web3Provider | null;
	contract: Contract | null;
}


export type web3State = {
	isLoading: boolean;

} & Web3Params

export const createDefaultState = () => {
	return {
		ethereum: null,
		provider: null,
		contract: null,
		isLoading: true,

	}
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, provider: providers.Web3Provider): Promise<Contract> => {
	if (!NETWORK_ID) {
		return Promise.reject("Network ID is not defined!");
	}

	const res = await fetch(`/contracts/${name}.json`);
	const Artifact = await res.json();
	
	if (Artifact.networks[NETWORK_ID].address) {
		const contract = new Contract(
			Artifact.networks[NETWORK_ID].address,
			Artifact.abi,
			provider
		)

		return contract;
	} else {
		return Promise.reject(`Contract: [${name}] cannot be loaded!`);
	}
}
