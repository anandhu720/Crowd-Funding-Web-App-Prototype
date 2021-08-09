import React from 'react';
import { Container,Card,Button } from 'semantic-ui-react';
import factory from '../backend/factory';
import 'semantic-ui-css/semantic.min.css'

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
        <Container>
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
        </Container>
    )}
}

export default CampaignIndex;

