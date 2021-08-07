import React, { useEffect } from 'react'
import factory from '../backend/factory';

const inter = () => {

    useEffect(() => {
        const getDeploy = async () => {
           const campaigns =  await factory.methods.getDeployedCampaigns().call();

           console.log(campaigns);
        }
        getDeploy();

    },[factory]);
    
    return (
        <div>
            testing
        </div>
    )
}

export default inter
