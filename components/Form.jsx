import React from 'react';
import { Message,Input, Form,Button } from 'semantic-ui-react';
import Campaign from '../backend/campaign';
import web3 from '../backend/web3';
import { Router } from '../routes/routes';

class ContributeForm extends React.Component {

    state = {
        value:'',
        errorMessage:'',
        loading:false
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({
            loading:true,
            errorMessage:''
        })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                value:web3.utils.toWei(this.state.value,'ether'),
                from:accounts[0]
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (error) {
            this.setState({
                errorMessage: error.message
            });
        }

        this.setState({
            loading: false,
            value:''
        })

        

    }

    render() {
        return (
            <>
                <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
                    <Form.Field>
                        <label>Amount to contribute</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.value}
                            onChange={e => this.setState({ value: e.target.value})}
                        />
                    </Form.Field>
                    <Message
                        error
                        header='Opps!Error'
                        content={this.state.errorMessage}
                    />
                    <Button
                        primary
                        loading={this.state.loading}
                    >
                        Contribute
                    </Button>
                </Form>
            </>
        
    )}
}

export default ContributeForm;