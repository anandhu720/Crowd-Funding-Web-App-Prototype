import {Link} from '../../../routes/routes';
import React from 'react';
import { Button,Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../backend/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends React.Component {

    static getInitialProps = async (props) => {
        const {address} = props.query;

        const campaign = Campaign(address);

        const requestCount = await campaign.methods.getRequestCount().call();

        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element,index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return {
            address,
            requests,
            requestCount,
            approversCount
        }
    }

    renderRow = () => {
        return this.props.requests.map((request,index)=>{
            return <RequestRow 
                request={request}
                key={index}
                id={index}
                approversCount={this.props.approversCount}
                address={this.props.address}
            />
        })
    }


    render() {

        const { Header,Row,HeaderCell,Body } = Table;

        return (
            <Layout>
                <h2>Request List</h2>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                    <Button 
                        primary 
                        floated="right"
                        style={{marginBottom:'10px'}}
                    >Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>
                    Found {this.props.requestCount} requests
                </div>
            </Layout>
        );
    }
}

export default RequestIndex;