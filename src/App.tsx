import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import './sass/main.scss';

import { Home, Partners, Members, Scanner } from './components';

let userType = 'admin';

const App: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('home');

    let menuItems: Array<string> = [];
    let ActivePage: React.ComponentType<unknown> | null = null;
    const loggedIn: boolean = true;

    switch (userType) {
        case 'admin':
            menuItems = ['home', 'partners', 'members', 'admin'];
            break;

        case 'partner':
            menuItems = ['home', 'scanner'];
            break;
    }

    switch (activeItem) {
        case 'home':
            ActivePage = Home;
            break;

        case 'partners':
            ActivePage = Partners;
            break;

        case 'members':
            ActivePage = Members;
            break;

        case 'scanner':
            ActivePage = Scanner;
            break;

        default:
            ActivePage = null;
            break;
    }

    return (
        <main id='home'>
            <Container>
                <Menu pointing secondary>
                    {menuItems.map(menuItem => (
                        <Menu.Item
                            key={menuItem}
                            name={menuItem}
                            active={activeItem === menuItem}
                            onClick={() => setActiveItem(menuItem)}
                        />
                    ))}
                    <Menu.Menu position='right'>
                        {loggedIn ? (
                            <>
                                <Menu.Item
                                    name='profile'
                                    active={activeItem === 'profile'}
                                    onClick={() => setActiveItem('profile')}
                                />
                                <Menu.Item
                                    name='logout'
                                    active={activeItem === 'logout'}
                                    onClick={() => setActiveItem('logout')}
                                />
                            </>
                        ) : (
                            <Menu.Item
                                name='login'
                                active={activeItem === 'logout'}
                                onClick={() => setActiveItem('logout')}
                            />
                        )}
                    </Menu.Menu>
                </Menu>
                {ActivePage && <ActivePage />}
            </Container>
        </main>
    );
};

export default App;
