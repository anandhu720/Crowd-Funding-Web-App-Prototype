import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xbFD362c29019154059CD9E988195e208FC6F23eD"
);

export default instance;