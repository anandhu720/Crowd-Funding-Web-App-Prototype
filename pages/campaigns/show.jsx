import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../backend/campaign';
import { Card,Grid } from 'semantic-ui-react';
import web3 from '../../backend/web3';
import Form from '../../components/Form';

class CampaignShow extends React.Component {

    static getInitialProps = async (props) => {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.grtSummary().call();

        console.log(summary);

        return {
            minimumContribution:summary[0],
            balance:summary[1],
            requestCount:summary[2],
            approversCount:summary[3],
            managerAddress:summary[4]
        }
    }

    renderCards = () => {
        const {balance,managerAddress,minimumContribution,approversCount,requestCount} = this.props;

        const items = [
            {
                header:managerAddress,
                meta:'address of manager',
                description:'The manager created this Campaign and who controls this campaign',
                style:{
                    overflowWrap:'break-word',
                },
                fluid:true
            },
            {
                header:minimumContribution,
                meta:'minimum contribution(wei)',
                description:'You must contribute atleast this much wei to became an approver',
                style:{
                    overflowWrap:'break-word',
                }
            },
            {
                header:requestCount,
                meta:'no of request',
                description:'The request try to withdraw money from the contract to purchase things',
                style:{
                    overflowWrap:'break-word',
                }
            },
            {
                header:approversCount,
                meta:'approvers count',
                description:'No of persons who can approve the request and take part in this campaign',
                style:{
                    overflowWrap:'break-word',
                }
            },
            {
                header:web3.utils.fromWei(balance,'ether'),
                meta:'balance of campaign (ether)',
                description:'The balance is how much money the campaign have to send',
                style:{
                    overflowWrap:'break-word',
                }
            }
        ];

        return <Card.Group items={items}/>
    }

    render = () => {
        return (
            <Layout>
                <h1>Campaign Details</h1>
                <Grid>
                    <Grid.Column computer={10} mobile={16}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16}>
                        <Form />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;