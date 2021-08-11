import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../backend/web3';
import Campaign from '../backend/campaign';
import { Router } from '../routes/routes';

class RequestRow extends React.Component {

    onApprove = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();

        await campaign.methods.approveRequest(this.props.id).send({
            from:accounts[0]
        })
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();

        await campaign.methods.finalizeRequest(this.props.id).send({
            from:accounts[0]
        })
    }

    render() {

        const { Row,Cell } = Table;
        const { id,request,approversCount } = this.props;
        const { description,value,recipient,approvalCount } = request;
        const readyToFinalize = request.approvalCount > approversCount/2;

        return(
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id+1}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value,'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{approvalCount}/{approversCount}</Cell>
                <Cell>
                {   request.complete? null :
                    <Button 
                        color="teal"
                        onClick = {this.onApprove}
                    >
                        approve
                    </Button>
                }
                </Cell>
                <Cell>
                    { request.complete?null:
                    <Button
                        color='red'
                        onClick={this.onFinalize}
                    >
                        Finalize
                    </Button>
    }
                </Cell>
            </Row>
        )
    }
}

export default RequestRow;