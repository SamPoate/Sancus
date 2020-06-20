import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updateRole } from '../redux/slices/userSlice';
import { Header, Divider, Grid, Dropdown } from 'semantic-ui-react';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const { user } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <>
            <Header
                as='h1'
                content='Home'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Divider />
            <p>Welcome {user.name}</p>
            <Divider />
            <Grid>
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
        </>
    );
};

export default Home;
