import React from 'react';
import { Form,Button,Message, Input } from 'semantic-ui-react';
import Campaign from '../../../backend/campaign';
import web3 from '../../../backend/web3';
import Layout from '../../../components/Layout';
import { Link,Router } from '../../../routes/routes';

class RequestNew extends React.Component {

    state = {
        value:'',
        description:'',
        recipient:'',
        loading:false,
        errorMessage:''
    }

    static getInitialProps = async (props) => {
        const { address } = props.query;

        return {
            address
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description,value,recipient } = this.state;

        this.setState({
            loading:true,
            errorMessage:''
        })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value,'ether'),
                recipient
            ).send({
                from:accounts[0]
            });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`)
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
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <h3>Back</h3>
                    </a>
                </Link>
                <h2>New Request</h2>
                <Form 
                    onSubmit={this.onSubmit} 
                    error={this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={ (event) =>
                                this.setState({
                                    description: event.target.value
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value (ether)</label>
                        <Input 
                            value={this.state.value}
                            onChange={ (event) => 
                                this.setState({
                                    value: event.target.value
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={ (event) => 
                                this.setState({
                                    recipient: event.target.value
                                })
                            }
                        />
                    </Form.Field>
                    <Message 
                        error
                        header='Oops! Error'
                        content={this.state.errorMessage}
                    />
                    <Button 
                        primary
                        loading={this.state.loading}
                    >Submit</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;