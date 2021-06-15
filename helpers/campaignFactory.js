import getWeb3 from "../helpers/getWeb3.js";
import CampaignFactoryJson from "../contracts/CampaignFactory.json";

const campaignFactory = async () => {
    var web3 = await getWeb3();

    return new web3.eth.Contract(
            CampaignFactoryJson.abi,
            '0xF51d44E6be69aD57796d1F2c62b417D90BdeBB69'
        );
    
}

export default campaignFactory;

