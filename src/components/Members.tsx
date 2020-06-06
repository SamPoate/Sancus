import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addUser } from '../redux/slices/userSlice';
import { Header, Icon, Card, Table, Form, Button } from 'semantic-ui-react';

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const addMember = () => {
        if (name && description) {
            dispatch(addUser(name, description));
            setName('');
            setDescription('');
        }
    };

    return (
        <>
            <Header
                as='h1'
                content='Our Members'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Table color='purple'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member</Table.HeaderCell>
                        <Table.HeaderCell>Today's Discounts</Table.HeaderCell>
                        <Table.HeaderCell>Total Discounts</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>5</Table.Cell>
                            <Table.Cell textAlign='right'>
                                <Icon name='edit' color='blue' size='large' />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Card className='add-member'>
                <Form onSubmit={addMember}>
                    <Form.Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Member's Name"
                        placeholder='Name please'
                        // error={{
                        //     content: 'Please enter your first name',
                        //     pointing: 'below'
                        // }}
                        fluid
                    />
                    <Form.Input
                        fluid
                        label='Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Button type='submit' color='green'>
                        Add Member
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default Members;
