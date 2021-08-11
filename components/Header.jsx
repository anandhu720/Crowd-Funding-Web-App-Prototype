import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes/routes';

const Header = () => {
    return (
        <Menu style={{
            padding: '10px',
            marginTop: '10px'
        }}>
            <Link route='/'>
                <a className="item">Crowd Funding</a>
            </Link>
            <Menu.Menu position="right">
                <Link route='/'>
                    <a className="item">Campaigns</a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header
