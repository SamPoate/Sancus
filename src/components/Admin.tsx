import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Header, Divider, Table, Icon, Dropdown } from 'semantic-ui-react';
import { IMember, IUser, IPartner } from '../types';
import {
    updateRole,
    updateUserMemberId,
    updateUserPartnerId
} from '../redux/slices/userSlice';

interface HomeProps {}

const Admin: React.FC<HomeProps> = () => {
    const [userEditor, setUserEditor] = useState<IUser | null>(null);
    const [assignedMember, setAssignedMember] = useState<string>('');
    const [assignedPartner, setAssignedPartner] = useState<string>('');
    const [assignedRole, setAssignedRole] = useState<string>('');

    const dispatch = useDispatch();
    const { user, members, partners } = useSelector(
        (state: RootState) => state
    );

    const memberDictionary = Object.fromEntries(
        members.map((member: IMember) => [member.id, member])
    );

    const partnerDictionary = Object.fromEntries(
        partners.map((partner: IPartner) => [partner.id, partner])
    );

    const submitUserUpdate = () => {
        assignedRole && dispatch(updateRole(assignedRole));
        assignedMember && dispatch(updateUserMemberId(assignedMember));
        assignedPartner && dispatch(updateUserPartnerId(assignedPartner));
        setAssignedMember('');
        setAssignedPartner('');
        setUserEditor(null);
    };

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
            <p>Do adminy things here</p>
            <Divider />
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Assigned Member</Table.HeaderCell>
                        <Table.HeaderCell>Assigned Partner</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {[user].map((listedUser: IUser) => {
                        if (listedUser.id === userEditor?.id) {
                            return (
                                <Table.Row key={listedUser.id}>
                                    <Table.Cell>{listedUser.name}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            value={
                                                assignedMember ||
                                                userEditor.memberId
                                            }
                                            onChange={(_, { value }) =>
                                                value &&
                                                setAssignedMember(
                                                    value.toString()
                                                )
                                            }
                                            options={members.map(
                                                (member: IMember) => ({
                                                    value: member.id,
                                                    text: member.name
                                                })
                                            )}
                                            search
                                            selection
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            value={
                                                assignedPartner ||
                                                userEditor.partnerId
                                            }
                                            onChange={(_, { value }) =>
                                                value &&
                                                setAssignedPartner(
                                                    value.toString()
                                                )
                                            }
                                            options={partners.map(
                                                (partner: IPartner) => ({
                                                    value: partner.id,
                                                    text: partner.name
                                                })
                                            )}
                                            search
                                            selection
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            value={
                                                assignedRole || userEditor.role
                                            }
                                            onChange={(_, { value }) =>
                                                value &&
                                                setAssignedRole(
                                                    value.toString()
                                                )
                                            }
                                            options={[
                                                {
                                                    value: 'admin',
                                                    text: 'Admin'
                                                },
                                                {
                                                    value: 'partner',
                                                    text: 'Partner'
                                                },
                                                {
                                                    value: 'member',
                                                    text: 'Member'
                                                }
                                            ]}
                                            selection
                                            fluid
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Icon
                                            name='check'
                                            color='green'
                                            size='large'
                                            onClick={submitUserUpdate}
                                        />
                                        <Icon
                                            name='close'
                                            color='red'
                                            size='large'
                                            onClick={() => setUserEditor(null)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }

                        return (
                            <Table.Row key={listedUser.id}>
                                <Table.Cell>{listedUser.name}</Table.Cell>
                                <Table.Cell>
                                    {listedUser.memberId
                                        ? memberDictionary[listedUser.memberId]
                                              .name
                                        : 'Unassigned'}
                                </Table.Cell>
                                <Table.Cell>
                                    {listedUser.partnerId
                                        ? partnerDictionary[
                                              listedUser.partnerId
                                          ].name
                                        : 'Unassigned'}
                                </Table.Cell>
                                <Table.Cell>{listedUser.role}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Icon
                                        name='edit'
                                        color='blue'
                                        size='large'
                                        onClick={() =>
                                            setUserEditor(listedUser)
                                        }
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </>
    );
};

export default Admin;
