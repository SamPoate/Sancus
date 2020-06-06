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

const Home: React.FC<HomeProps> = () => {
    const partners = useSelector((state: RootState) => state.partners);
    const users = useSelector((state: RootState) => state.users);

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
                    {partners.map(partner => {
                        const coinFlip = Math.random() < 0.5;

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
                                                color: coinFlip
                                                    ? 'platinum'
                                                    : 'gold'
                                            }}
                                        >
                                            {coinFlip ? 'Platinum' : 'Gold'}{' '}
                                            Member
                                        </Card.Meta>
                                        <Card.Description>
                                            <Table color='pink'>
                                                <Table.Body>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            Today's usage
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                partner.totalDiscountsUsed
                                                            }
                                                        </Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            Amount discounted
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            £23.24
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
                        <Table.HeaderCell>Total Discount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(
                        (user, index) =>
                            index < 3 && (
                                <Table.Row>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>£12.22</Table.Cell>
                                </Table.Row>
                            )
                    )}
                </Table.Body>
            </Table>
        </>
    );
};

export default Home;
