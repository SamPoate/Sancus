import React, { useState } from 'react';
// import _ from 'lodash';
import { Grid, Header, Form, Card, Image, Button } from 'semantic-ui-react';
import { IUser } from '../types';

interface ScannerProps {}

const Scanner: React.FC<ScannerProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Array<IUser>>([]);

    const users = [
        {
            name: 'Fred Johnson',
            description: 'Absolute Legend',
            id: '123-123-123'
        },
        {
            name: 'Luke Evans',
            description: 'Medium Legend',
            id: '123-321-321'
        }
    ];

    const search = () => {
        setIsLoading(true);

        const filteredSeachResults = users.filter(
            user =>
                user.id.includes(searchValue) ||
                user.name.toLowerCase().includes(searchValue)
        );

        if (filteredSeachResults.length >= 1) {
            setSearchResults(filteredSeachResults);
            setShowUsers(true);
        }

        setIsLoading(false);
    };

    const submitDiscount = (user: IUser) => {
        console.log(user);
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
                            {searchResults.map(user => (
                                <Grid.Row key={user.id}>
                                    <Card>
                                        <Card.Content>
                                            <Image
                                                floated='right'
                                                size='mini'
                                                src='img/am-logo.png'
                                            />
                                            <Card.Header>
                                                {user.name}
                                            </Card.Header>
                                            <Card.Meta>
                                                {user.description}
                                                <br />
                                                ID: {user.id}
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
                                                        submitDiscount(user)
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
