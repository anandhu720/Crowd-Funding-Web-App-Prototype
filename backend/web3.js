import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && window.ethereum !== 'undefined'){
    window.ethereum.request({
        method: 'eth_requestAccounts'
    });

    web3 = new Web3(window.ethereum);
}else{
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/fee8e683628245ec9f7a2e11de38ed88"
    );

    web3 = new Web3(provider);
}

export default web3;