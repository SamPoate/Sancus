import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMember } from '../redux/slices/memberSlice';
import { Header, Icon, Card, Table, Form, Button } from 'semantic-ui-react';

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
    const dispatch = useDispatch();
    const members = useSelector((state: RootState) => state.members);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const submitMember = () => {
        if (name && description) {
            dispatch(addMember(name, description));
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
                    {members.map(member => (
                        <Table.Row key={member.id}>
                            <Table.Cell>{member.name}</Table.Cell>
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
                <Form onSubmit={submitMember}>
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
