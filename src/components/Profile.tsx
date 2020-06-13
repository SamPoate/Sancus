import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updateRole } from '../redux/slices/userSlice';
import {
    Container,
    Header,
    Grid,
    Card,
    Image,
    Icon,
    Segment,
    Statistic,
    Dropdown
} from 'semantic-ui-react';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
    const dispatch = useDispatch();
    const { user, members } = useSelector((state: RootState) => state);

    const userMember = members.find(member => member.id === user.memberId);

    return (
        <Container>
            <Header
                as='h1'
                content='Profile'
                inverted
                textAlign='center'
                style={{
                    fontSize: '3em'
                }}
            />
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column>
                        <Card>
                            <Image src='img/abe.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{user.name}</Card.Header>
                                <Card.Meta>
                                    Joined on{' '}
                                    {moment(user.joinDate, 'dd-mm-yyyy').format(
                                        'Do MMMM YYYY'
                                    )}
                                </Card.Meta>
                                <Card.Description>
                                    {user.name} is a comedian living in
                                    Washington.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='money bill alternate' />
                                {userMember ? userMember.points / 10 : 0} Loyal
                                Bucks
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign='center' inverted>
                            <Statistic color='teal' inverted>
                                <Statistic.Label>Total Points</Statistic.Label>
                                <Statistic.Value>
                                    {userMember && userMember.points}
                                </Statistic.Value>
                            </Statistic>
                        </Segment>
                        <Segment textAlign='center' inverted>
                            <Statistic color='violet' inverted>
                                <Statistic.Label>
                                    Amount of scans
                                </Statistic.Label>
                                <Statistic.Value>16</Statistic.Value>
                            </Statistic>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Testing Role'
                            search
                            selection
                            value={user.role}
                            onChange={(_, { value }) =>
                                value && dispatch(updateRole(value.toString()))
                            }
                            options={[
                                { value: 'admin', text: 'Admin' },
                                { value: 'partner', text: 'Partner' },
                                { value: 'member', text: 'Member' }
                            ]}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Profile;
