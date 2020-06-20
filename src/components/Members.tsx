import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMember } from '../redux/slices/memberSlice';
import {
    Header,
    Icon,
    Card,
    Table,
    Form,
    Button,
    Input
} from 'semantic-ui-react';
import { IMember } from '../types';
import { MemberEditor } from './MemberEditor';

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
    const [search, setSearch] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [memberEditor, setMemberEditor] = useState<IMember | null>(null);

    const dispatch = useDispatch();
    const members = useSelector((state: RootState) => state.members);

    const submitMember = () => {
        if (id && name && description) {
            dispatch(addMember(id, name, description));
            setId('');
            setName('');
            setDescription('');
        }
    };

    if (memberEditor)
        return (
            <MemberEditor
                member={memberEditor}
                setMemberEditor={setMemberEditor}
            />
        );

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
            <Input
                placeholder='Search...'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Table color='purple'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Total Points</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {members
                        .filter((member: IMember) =>
                            member.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((member: IMember) => (
                            <Table.Row key={member.id}>
                                <Table.Cell>{member.name}</Table.Cell>
                                <Table.Cell>{member.description}</Table.Cell>
                                <Table.Cell>{member.points}</Table.Cell>
                                <Table.Cell textAlign='right'>
                                    <Icon
                                        name='edit'
                                        color='blue'
                                        size='large'
                                        onClick={() => setMemberEditor(member)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
            <Card className='add-member'>
                <Form onSubmit={submitMember}>
                    <Form.Input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        label="Member's Card ID"
                        placeholder='The barcode ID'
                        fluid
                    />
                    <Form.Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Member's Name"
                        placeholder='Their name'
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
