import React from 'react';
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

interface HomeProps {}

const Overview: React.FC<HomeProps> = () => {
    const { partners, members } = useSelector((state: RootState) => state);
    const partnerDictionary = {
        platinum: 'Platinum',
        gold: 'Gold',
        bronze: 'Bronze',
        basic: 'Basic'
    };

    const sortedPartners = partners.sort(
        (left, right) => right.totalPointsAllocated - left.totalPointsAllocated
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
                    {sortedPartners.map(partner => {
                        return (
                            <Grid.Column key={partner.id}>
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
                                                partnerDictionary[
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
                                                                    .itemsInStock
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
                                        >
                                            Info
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        );
                    })}
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
                    {members.map(
                        (member, index) =>
                            index < 3 && (
                                <Table.Row key={member.id}>
                                    <Table.Cell>{member.name}</Table.Cell>
                                    <Table.Cell>{member.name}</Table.Cell>
                                    <Table.Cell>120</Table.Cell>
                                </Table.Row>
                            )
                    )}
                </Table.Body>
            </Table>
        </>
    );
};

export default Overview;
