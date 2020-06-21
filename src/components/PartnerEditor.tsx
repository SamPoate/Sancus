import React, { useReducer, useEffect } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import {
    Header,
    Segment,
    Card,
    Image,
    Form,
    Button,
    Grid,
    Divider,
    Statistic,
    Icon
} from 'semantic-ui-react';
import { IPartner, IItem, IUser } from '../types';
import { updatePartner } from '../redux/slices/partnerSlice';

interface PartnerEditorProps {
    partner: IPartner;
    closeEditor: Function;
}

const initialState: IPartner = {
    id: '',
    name: '',
    joinDate: '',
    partnerLevel: '',
    items: [],
    totalPointsAllocated: 0
};

const reducer = (state: IPartner, { type, payload }: any) => {
    switch (type) {
        default:
            return { ...state, ...payload };
    }
};

export const PartnerEditor: React.FC<PartnerEditorProps> = ({
    partner,
    closeEditor
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { items, admin } = useSelector((state: RootState) => state);

    const reduxDispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'hydrate_state',
            payload: partner
        });
    }, [partner]);

    const submit = () => {
        //do stuff
        reduxDispatch(updatePartner(state));

        closeEditor();
    };

    return (
        <>
            <Header
                as='h1'
                inverted
                style={{
                    fontSize: '3em'
                }}
            >
                {partner.name}'s Overview
                <Icon
                    name='close'
                    color='red'
                    onClick={() => closeEditor()}
                    style={{
                        marginLeft: 'auto',
                        fontSize: '0.5em',
                        float: 'right'
                    }}
                />
            </Header>
            <Segment inverted>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Card>
                                <Image src={partner.logo} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{partner.name}</Card.Header>
                                    <Card.Description>
                                        <strong>Join Date: </strong>
                                        <span className='date'>
                                            {moment(
                                                partner.joinDate,
                                                'DD-MM-YY'
                                            ).format('Do MMM YYYY')}
                                        </span>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic
                                color='teal'
                                inverted
                                style={{ marginBottom: '1em' }}
                            >
                                <Statistic.Label>Total Points</Statistic.Label>
                                <Statistic.Value>
                                    {state.totalPointsAllocated}
                                </Statistic.Value>
                            </Statistic>
                            <Form onSubmit={submit} inverted>
                                <Form.Input
                                    label="Partners's Name"
                                    placeholder='Name'
                                    value={state.name}
                                    onChange={e =>
                                        dispatch({
                                            type: 'partner_name',
                                            payload: {
                                                ...state,
                                                name: e.target.value
                                            }
                                        })
                                    }
                                    fluid
                                />
                                <Form.Select
                                    label='Partner Level'
                                    placeholder='Their Partner Level'
                                    value={state.partnerLevel}
                                    onChange={(_, { value }) =>
                                        dispatch({
                                            type: 'partner_level',
                                            payload: {
                                                ...state,
                                                partnerLevel: value
                                            }
                                        })
                                    }
                                    options={[
                                        {
                                            value: 'platinum',
                                            text: 'Platinum'
                                        },
                                        { value: 'gold', text: 'Gold' },
                                        { value: 'silver', text: 'Silver' },
                                        { value: 'basic', text: 'Basic' }
                                    ]}
                                />
                                <Button type='submit' color='green'>
                                    Submit
                                </Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Divider />
            <Header as='h2' content={`${partner.name}'s Items`} inverted />
            <Segment inverted>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>Item Name</Grid.Column>
                        <Grid.Column>Item Points</Grid.Column>
                    </Grid.Row>
                    {state.items.map((partnerItem: string) => {
                        const item = items.find(
                            (item: IItem) => item.id === partnerItem
                        );

                        if (!item) return null;

                        return (
                            <Grid.Row key={item.id}>
                                <Grid.Column>{item.name}</Grid.Column>
                                <Grid.Column>{item.points}</Grid.Column>
                            </Grid.Row>
                        );
                    })}
                </Grid>
            </Segment>
            <Divider />
            <Header as='h2' content={`${partner.name}'s Users`} inverted />
            <Segment inverted>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>Name</Grid.Column>
                        <Grid.Column>Join Date</Grid.Column>
                    </Grid.Row>
                    {admin.users
                        .filter((user: IUser) => user.partnerId === state.id)
                        .map((user: IUser) => {
                            return (
                                <Grid.Row key={user.id}>
                                    <Grid.Column>{user.name}</Grid.Column>
                                    <Grid.Column>
                                        {moment(
                                            user.joinDate,
                                            'DD-MM-YYYY'
                                        ).format('Do MMM YYYY')}
                                    </Grid.Column>
                                </Grid.Row>
                            );
                        })}
                </Grid>
            </Segment>
        </>
    );
};
