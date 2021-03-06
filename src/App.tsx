import React, { useState } from 'react';
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
    Profile,
    Admin
} from './components';

interface AppProps {}

const App: React.StatelessComponent<AppProps> = () => {
    const [activeMenuItem, setActiveMenuItem] = useState<string>('home');
    const { user } = useSelector((state: RootState) => state);

    let menuItems: Array<string> = [];

    //TODO: Move to API call
    const loggedIn: boolean = true;

    switch (user.role) {
        case 'admin':
            menuItems = ['home', 'overview', 'members', 'partners', 'admin'];
            break;

        case 'partner':
            menuItems = ['home', 'items', 'scanner'];
            break;

        case 'member':
            menuItems = ['home', 'items'];
            break;
    }

    return (
        <Router>
            <main id='home'>
                <Container>
                    <Menu pointing secondary>
                        {menuItems.map(menuItem => (
                            <Menu.Item
                                key={menuItem}
                                name={menuItem}
                                active={activeMenuItem === menuItem}
                                as={Link}
                                to={`/${menuItem}`}
                                onClick={() => setActiveMenuItem(menuItem)}
                            />
                        ))}
                        <Menu.Menu position='right'>
                            {loggedIn ? (
                                <>
                                    <Menu.Item
                                        name='profile'
                                        active={activeMenuItem === 'profile'}
                                        onClick={() =>
                                            setActiveMenuItem('profile')
                                        }
                                        as={Link}
                                        to='/profile'
                                    />
                                    <Menu.Item
                                        name='logout'
                                        active={activeMenuItem === 'logout'}
                                        onClick={() =>
                                            setActiveMenuItem('logout')
                                        }
                                        to='/logout'
                                    />
                                </>
                            ) : (
                                <Menu.Item
                                    name='login'
                                    active={activeMenuItem === 'login'}
                                    onClick={() => setActiveMenuItem('login')}
                                    to='/login'
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
                        <Route path='/admin'>
                            <Admin />
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
