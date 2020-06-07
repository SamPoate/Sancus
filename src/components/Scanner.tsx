import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { incrementPartnerTotalDiscounts } from '../redux/slices/partnerSlice';
// import _ from 'lodash';
import {
    Grid,
    Header,
    Form,
    Card,
    Image,
    Input,
    Button,
    Segment
} from 'semantic-ui-react';
import { IMember } from '../types';

interface ScannerProps {}

const Scanner: React.FC<ScannerProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Array<IMember>>([]);
    const [itemId, setItemId] = useState<string>('');
    const { user, members, partners, items } = useSelector(
        (state: RootState) => state
    );
    const dispatch = useDispatch();

    const userPartner = partners.find(
        partner =>
            partner.users &&
            partner.users.some(partnerUser => partnerUser === user.id)
    );

    const search = () => {
        setIsLoading(true);

        const filteredSeachResults = members.filter(
            member =>
                member.id.includes(searchValue) ||
                member.name.toLowerCase().includes(searchValue)
        );

        if (filteredSeachResults.length >= 1) {
            setSearchResults(filteredSeachResults);
            setShowUsers(true);
        }

        setIsLoading(false);
    };

    const submitDiscount = (member: IMember) => {
        if (userPartner) {
            dispatch(incrementPartnerTotalDiscounts(userPartner.id));
        }
    };

    return (
        <>
            <Header
                as='h1'
                content='Scanner'
                inverted
                textAlign='center'
                style={{
                    fontSize: '3em'
                }}
            />
            <section className='scanner'>
                <Grid columns={1}>
                    {showUsers ? (
                        <>
                            {searchResults.map(member => (
                                <Grid.Row key={member.id}>
                                    <Card>
                                        <Card.Content>
                                            <Image
                                                floated='right'
                                                size='mini'
                                                src='img/am-logo.png'
                                            />
                                            <Card.Header>
                                                {member.name}
                                            </Card.Header>
                                            <Card.Meta>
                                                {member.description}
                                                <br />
                                                ID: {member.id}
                                            </Card.Meta>
                                            <Card.Description>
                                                <strong>Apply Discount?</strong>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui buttons'>
                                                <Button
                                                    color='green'
                                                    onClick={() =>
                                                        submitDiscount(member)
                                                    }
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                </Grid.Row>
                            ))}
                            <Button
                                color='red'
                                onClick={() => setShowUsers(false)}
                            >
                                Cancel
                            </Button>

                            {/* Temp item finder */}
                            <div className='temp-partner-info'>
                                <Input
                                    placeholder='Item Id'
                                    value={itemId}
                                    onChange={e => setItemId(e.target.value)}
                                />
                                <Segment>
                                    <ul>
                                        {items
                                            .filter(item =>
                                                item.id.includes(itemId)
                                            )
                                            .map(item => (
                                                <li key={item.id}>
                                                    {item.name} -{' '}
                                                    {item.totalDiscount}
                                                </li>
                                            ))}
                                    </ul>
                                </Segment>
                            </div>
                        </>
                    ) : (
                        <Grid.Row>
                            <Form onSubmit={search}>
                                <Form.Field>
                                    <Form.Input
                                        icon='user'
                                        placeholder='Search...'
                                        value={searchValue}
                                        onChange={e =>
                                            setSearchValue(e.target.value)
                                        }
                                        loading={isLoading}
                                        autoFocus
                                    />
                                </Form.Field>
                                <Button
                                    color='green'
                                    type='submit'
                                    style={{ width: '100%' }}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Grid.Row>
                    )}
                </Grid>
            </section>
        </>
    );
};

export default Scanner;
