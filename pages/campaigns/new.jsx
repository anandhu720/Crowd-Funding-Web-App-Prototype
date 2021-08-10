import React from 'react';
import { Form,Button,Input,Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../backend/factory';
import web3 from '../../backend/web3';

import { Router } from '../../routes/routes';

class CampaignNew extends React.Component {

    state = {
        minimumContribution:'',
        errorMessage:'',
        loading:false
    }

    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            loading: true,
            errorMessage:''
        })

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createCampaign(
                this.state.minimumContribution
                ).send({
                    from:accounts[0]
                });
            
            Router.pushRoute('/');
        } catch (error) {
            this.setState({
                errorMessage:error.message
            })
        }

        this.setState({
            loading:false
        })

    }

    render() {
        return(
            <Layout>
                <h1>Lets give your dream project a life</h1>
                <br /><br />
                <h2>Create a Campaign</h2>
                <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei"
                            labelPosition="right" 
                            type="text"
                            value={this.state.minimumContribution}
                            onChange={e => this.setState({minimumContribution:e.target.value})}
                        />
                    </Form.Field>
                    <Message
                        error
                        header='Oops!'
                        content={this.state.errorMessage}
                    />
                    <Button
                        primary
                        loading={this.state.loading}
                    >
                        Create
                    </Button>
                </Form>

            </Layout>
        )
    }
}

export default CampaignNew;