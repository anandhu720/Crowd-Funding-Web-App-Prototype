import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x39421451E93FE50547678687180E69eb9195Eb66"
);

export default instance;