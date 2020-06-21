import React from 'react';
import { Header, Tab, Divider } from 'semantic-ui-react';

import AdminUserList from './AdminUserList';
import AdminItemList from './AdminItemList';

interface HomeProps {}

const Admin: React.FC<HomeProps> = () => {
    const panes = [
        {
            menuItem: 'Users',
            render: () => (
                <Tab.Pane>
                    <AdminUserList />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Items',
            render: () => (
                <Tab.Pane>
                    <AdminItemList />
                </Tab.Pane>
            )
        }
    ];

    return (
        <>
            <Header
                as='h1'
                content='Admin Panel'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Divider />
            <Tab
                panes={panes}
                menu={{
                    color: 'violet',
                    inverted: true
                }}
                className='admin-table'
            />
        </>
    );
};

export default Admin;
