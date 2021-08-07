const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../backend/build/CampaignFactory.json');
const compiledCampaign = require('../backend/build/Campaign.json');

let accounts,factory,campaignAddress,campaign;

beforeEach( async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({
            data:compiledFactory.bytecode
        })
        .send({
            gas: "1000000",
            from: accounts[0]
        });
    
    await factory.methods.createCampaign('100')
        .send({
            from:accounts[0],
            gas: "1000000"
        });
    
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );

});

describe('Campaigns',() => {

    it('deploys a campaign and factory', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as manager',async () => {
        const manager = await campaign.methods.manager().call();

        assert.equal(manager,accounts[0]);
    });

    it('allows people to contribute money and mark approvers',async () => {
        await campaign.methods.contribute().send({
            value:'200',
            from:accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    it('requires minimum contribution',async () => {
        try {
            await campaign.methods.contribute().send({
                value:'50',
                from: accounts[1]
            });
        assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allows a manager to make payment request',async () => {
        await campaign.methods.createRequest(
            'Buy batteries',
            '100', 
            accounts[1],
        ).send({
            from: accounts[0],
            gas: "1000000"
        });

        const request = await campaign.methods.requests(0).call();

        assert.equal('100',request.value);
    });

    it('process request',async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')
        });

        await campaign.methods.createRequest(
            'Buy batteries',
            web3.utils.toWei('5','ether'), 
            accounts[1],
        ).send({
            from: accounts[0],
            gas: "1000000"
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);

        assert(balance > 104);
    });

})