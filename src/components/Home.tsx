import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Header, Divider } from 'semantic-ui-react';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const { user } = useSelector((state: RootState) => state);

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
        </>
    );
};

export default Home;
