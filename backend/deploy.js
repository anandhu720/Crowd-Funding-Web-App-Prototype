const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../backend/build/CampaignFactory.json");

const provider = new HDWalletProvider(
 "winner return fringe solution paddle device disagree raise pelican spawn across vault",
  "https://rinkeby.infura.io/v3/fee8e683628245ec9f7a2e11de38ed88"

);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
        ).deploy({
            data: compiledFactory.bytecode 
        }).send({
            gas: "1000000",
            from: accounts[0] 
    });

    console.log("Contract deployed to", result.options.address);
};
deploy();
