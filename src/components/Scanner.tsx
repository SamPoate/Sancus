import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addMemberPoints } from '../redux/slices/memberSlice';
import { addPartnerPoints } from '../redux/slices/partnerSlice';
// import _ from 'lodash';
import {
    Grid,
    Header,
    Form,
    Card,
    Image,
    Input,
    Button,
    Segment,
    List
} from 'semantic-ui-react';
import { IMember, IItem } from '../types';

interface ScannerProps {}

const Scanner: React.FC<ScannerProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Array<IMember>>([]);
    const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
    const [itemId, setItemId] = useState<string>('');
    const [scannedItems, setScannedItems] = useState<Array<IItem>>([]);

    const dispatch = useDispatch();
    const { user, members, partners, items } = useSelector(
        (state: RootState) => state
    );

    const searchedItem = items.find(item => item.id === itemId);
    const userPartner = partners.find(partner => partner.id === user.partnerId);

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
            setSearchValue('');
        }

        setIsLoading(false);
    };

    const selectItem = (item: IItem) => {
        if (scannedItems.some(scannedItem => scannedItem.id === item.id))
            return;

        setScannedItems([...scannedItems, item]);
        setItemId('');
    };

    const submitPoints = (member: IMember) => {
        const totalPoints = scannedItems.reduce(
            (totalPoints, currentItem) => (totalPoints += currentItem.points),
            0
        );

        if (userPartner) {
            dispatch(addMemberPoints(member.id, totalPoints, userPartner.id));
            dispatch(addPartnerPoints(userPartner.id, totalPoints));
        }

        setSelectedMember(null);
        setShowUsers(false);
    };

    if (selectedMember) {
        return (
            <>
                <Header
                    as='h1'
                    content='Apply Points'
                    inverted
                    textAlign='center'
                    style={{
                        fontSize: '3em'
                    }}
                />
                {scannedItems.length > 0 && (
                    <>
                        <Segment>
                            <List>
                                {scannedItems.map(item => (
                                    <List.Item key={item.id}>
                                        {item.name} -{' '}
                                        <strong>{item.points}</strong> Points
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                        <Button
                            color='green'
                            onClick={() => submitPoints(selectedMember)}
                        >
                            Apply Points
                        </Button>
                    </>
                )}
                <div className='item-list'>
                    <Input
                        placeholder='Item Id'
                        value={itemId}
                        onChange={e => setItemId(e.target.value)}
                    />
                    {searchedItem && (
                        <Card>
                            <Card.Content>
                                <Card.Header>{searchedItem.name}</Card.Header>
                                <Card.Meta>
                                    {searchedItem.description}
                                    <br />
                                    Points: {searchedItem.points}
                                </Card.Meta>
                                <Card.Description></Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui buttons'>
                                    <Button
                                        color='green'
                                        onClick={() => selectItem(searchedItem)}
                                        style={{ width: '100%' }}
                                    >
                                        Select Item
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )}
                </div>
                <List>
                    {items.map(item => (
                        <List.Item key={item.id}>
                            {item.name} - <strong>{item.id}</strong>
                        </List.Item>
                    ))}
                </List>
            </>
        );
    }

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
                                            <Card.Description></Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui buttons'>
                                                <Button
                                                    color='green'
                                                    onClick={() =>
                                                        setSelectedMember(
                                                            member
                                                        )
                                                    }
                                                >
                                                    Select User
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
                        </>
                    ) : (
                        <Grid.Row>
                            <Form onSubmit={search}>
                                <Form.Field>
                                    <Form.Input
                                        icon='user'
                                        placeholder='Search Members...'
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
