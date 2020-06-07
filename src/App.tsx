import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import './sass/main.scss';

import {
    Home,
    Overview,
    Partners,
    Members,
    Items,
    Scanner,
    Profile
} from './components';

const App: React.FC = () => {
    const { user } = useSelector((state: RootState) => state);

    let menuItems: Array<string> = [];
    const loggedIn: boolean = true;

    switch (user.role) {
        case 'admin':
            menuItems = [
                'home',
                'overview',
                'members',
                'partners',
                'items',
                'admin'
            ];
            break;

        case 'partner':
            menuItems = ['home', 'items', 'scanner'];
            break;

        case 'member':
            menuItems = ['home', 'items'];
            break;
    }

    //TODO: Fix menu item highlight on href change
    return (
        <Router>
            <main id='home'>
                <Container>
                    <Menu pointing secondary>
                        {menuItems.map(menuItem => (
                            <Menu.Item
                                key={menuItem}
                                name={menuItem}
                                active={window.location.href.includes(menuItem)}
                                as={Link}
                                to={`/${menuItem}`}
                            />
                        ))}
                        <Menu.Menu position='right'>
                            {loggedIn ? (
                                <>
                                    <Menu.Item
                                        name='profile'
                                        active={window.location.href.includes(
                                            'profile'
                                        )}
                                        as={Link}
                                        to='/profile'
                                    />
                                    <Menu.Item
                                        name='logout'
                                        active={window.location.href.includes(
                                            'logout'
                                        )}
                                    />
                                </>
                            ) : (
                                <Menu.Item
                                    name='login'
                                    active={window.location.href.includes(
                                        'login'
                                    )}
                                />
                            )}
                        </Menu.Menu>
                    </Menu>
                    <Switch>
                        <Route path='/partners'>
                            <Partners />
                        </Route>
                        <Route path='/overview'>
                            <Overview />
                        </Route>
                        <Route path='/members'>
                            <Members />
                        </Route>
                        <Route path='/items'>
                            <Items />
                        </Route>
                        <Route path='/scanner'>
                            <Scanner />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </Container>
            </main>
        </Router>
    );
};

export default App;
