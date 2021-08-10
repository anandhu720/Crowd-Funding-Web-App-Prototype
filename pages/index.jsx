import React from 'react';
import { Card } from 'semantic-ui-react';
import factory from '../backend/factory';
import { Link } from '../routes/routes';


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
                description:(
                    <Link route={`/campaigns/${address}`}>
                        <a>
                            View Campaign
                        </a>
                    </Link>
                ),
                fluid:true,
                style:{
                    overflowWrap:'break-word',
                }
            }
        });

        return <Card.Group items={items} />
    }


    render() {
        return(
        <>
            <Layout>
                <h3>Open Campaigns</h3>
                {this.renderCampaigns()}
            </Layout>
        </>
    )}
}

export default CampaignIndex;

