import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import {
    Header,
    Button,
    Divider,
    Grid,
    Card,
    Table,
    Image
} from 'semantic-ui-react';
import { IMember, IPartner } from '../types';
import { PartnerEditor } from './PartnerEditor';

interface HomeProps {}

const Overview: React.FC<HomeProps> = () => {
    const [partnerEditor, setPartnerEditor] = useState<IPartner | null>(null);
    const { partners, members } = useSelector((state: RootState) => state);
    const partnerLevels = {
        platinum: 'Platinum',
        gold: 'Gold',
        silver: 'Silver',
        bronze: 'Bronze',
        basic: 'Basic'
    };

    const sortedPartners = [...partners].sort(
        (a, b) => b.totalPointsAllocated - a.totalPointsAllocated
    );

    const sortedMembers = [...members].sort((a, b) => {
        if (a.lastTransaction && b.lastTransaction) {
            return a.lastTransaction.date < b.lastTransaction.date
                ? -1
                : a.lastTransaction.date > b.lastTransaction.date
                ? 1
                : 0;
        }
        return 0;
    });

    const findPartnerName = (member: IMember) => {
        const partner = partners.find(
            (partner: IPartner) =>
                partner.id === member.lastTransaction?.partnerId
        );

        if (partner) return partner.name;
        return null;
    };

    if (partnerEditor)
        return (
            <PartnerEditor
                partner={partnerEditor}
                closeEditor={setPartnerEditor}
            />
        );

    return (
        <>
            <Header
                as='h1'
                content='Overview'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Divider />
            <Grid columns={2} divided>
                <Header
                    as='h2'
                    style={{ marginTop: '1em' }}
                    content='Top Partners'
                    inverted
                />
                <Grid.Row>
                    {sortedPartners.map(
                        (partner, index) =>
                            index < 4 && (
                                <Grid.Column
                                    key={partner.id}
                                    style={{ marginBottom: '2em' }}
                                >
                                    <Card style={{ width: '100%' }}>
                                        <Card.Content>
                                            <Image
                                                floated='right'
                                                size='mini'
                                                src={partner.logo}
                                            />
                                            <Card.Header>
                                                {partner.name}
                                            </Card.Header>
                                            <Card.Meta
                                                style={{
                                                    color: partner.partnerLevel
                                                }}
                                            >
                                                {
                                                    partnerLevels[
                                                        partner.partnerLevel
                                                    ]
                                                }{' '}
                                                Member
                                            </Card.Meta>
                                            <Card.Description>
                                                <Table color='pink'>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Given Points
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {
                                                                    partner.totalPointsAllocated
                                                                }
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>
                                                                Total Items
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {
                                                                    partner
                                                                        .items
                                                                        .length
                                                                }
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button
                                                inverted
                                                color='blue'
                                                style={{ width: '100%' }}
                                                onClick={() =>
                                                    setPartnerEditor(partner)
                                                }
                                            >
                                                Info
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            )
                    )}
                </Grid.Row>
            </Grid>
            <Divider />
            <Header
                as='h2'
                style={{ marginTop: '1em', textAlign: 'left' }}
                content='Recent Member Activity'
                inverted
            />
            <Table color='purple'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member</Table.HeaderCell>
                        <Table.HeaderCell>Used at</Table.HeaderCell>
                        <Table.HeaderCell>Total Points Earnt</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedMembers.map(
                        (member, index) =>
                            index < 3 &&
                            member.lastTransaction && (
                                <Table.Row key={member.id}>
                                    <Table.Cell>{member.name}</Table.Cell>
                                    <Table.Cell>
                                        {findPartnerName(member)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {member.lastTransaction.points}
                                    </Table.Cell>
                                </Table.Row>
                            )
                    )}
                </Table.Body>
            </Table>
        </>
    );
};

export default Overview;
