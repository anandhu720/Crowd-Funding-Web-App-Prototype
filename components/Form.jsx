import React from 'react';
import { Message,Input, Form,Button } from 'semantic-ui-react';

class ContributeForm extends React.Component {

    render() {
        return (
            <>
                <Form>
                    <Form.Field>
                        <label>Amount to contribute</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                        />
                    </Form.Field>
                    <Button
                        primary
                    >
                        Contribute
                    </Button>
                </Form>
            </>
        
    )}
}

export default ContributeForm;