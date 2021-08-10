import React from 'react';
import { Card,Button } from 'semantic-ui-react';
import factory from '../backend/factory';


import Layout from '../components/Layout';

class CampaignIndex extends React.Component {

    static getInitialProps = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {
            campaigns: campaigns
        };
    }

    renderCampaigns = () => {
        const items = this.props.campaigns.map((address) => {
            return {
                header:address,
                description:<a>View Campaign</a>,
                fluid:true
            }
        });

        return <Card.Group items={items} />
    }


    render() {
        return(
        <>
            <Layout>
                <h3>Open Campaigns</h3>
                
                <Button 
                    content="create campaign"
                    icon="add circle"
                    primary
                    floated="right"
                />
                {this.renderCampaigns()}
            </Layout>
        </>
    )}
}

export default CampaignIndex;

