import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updateUserMemberId } from '../redux/slices/userSlice';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { IMember } from '../types';

interface MemberEditorProps {
    member: IMember;
    setMemberEditor: Function;
}

interface State {
    userId: string;
    id: string;
    name: string;
    description: string;
}

const initialState: State = {
    userId: '',
    id: '',
    name: '',
    description: ''
};

const reducer = (state: any, { type, payload }: any) => {
    switch (type) {
        default:
            return { ...state, ...payload };
    }
};

export const MemberEditor: React.FC<MemberEditorProps> = ({
    member,
    setMemberEditor
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { admin, user } = useSelector((state: RootState) => state);
    const reduxDispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'hydrate_state',
            payload: { ...member, userId: user.id }
        });
    }, [member, user]);

    const updateMember = () => {
        reduxDispatch(updateUserMemberId(state.id));
        setMemberEditor(null);
    };

    return (
        <>
            <Header
                as='h1'
                content={`Edit ${member.name}`}
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Segment inverted>
                <Form onSubmit={updateMember} inverted>
                    <Form.Group widths='equal'>
                        <Form.Input
                            value={state.name}
                            onChange={e =>
                                dispatch({
                                    type: 'update_name',
                                    payload: { ...state, name: e.target.value }
                                })
                            }
                            label='Name'
                            placeholder='Name'
                            fluid
                        />
                        <Form.Input
                            value={state.description}
                            onChange={e =>
                                dispatch({
                                    type: 'update_description',
                                    payload: {
                                        ...state,
                                        description: e.target.value
                                    }
                                })
                            }
                            label='Description'
                            placeholder='Description'
                            fluid
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            value={state.id}
                            onChange={e =>
                                dispatch({
                                    type: 'update_id',
                                    payload: { ...state, id: e.target.value }
                                })
                            }
                            label="Member's ID"
                            placeholder='Their Card ID'
                            fluid
                        />
                        <Form.Select
                            label='Assigned User'
                            value={state.userId}
                            onChange={(_, { value }) =>
                                dispatch({
                                    type: 'update_userMemberId',
                                    payload: { ...state, userId: value }
                                })
                            }
                            options={admin.users.map(user => ({
                                value: user.id,
                                text: user.name
                            }))}
                            fluid
                        />
                    </Form.Group>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button type='submit' color='green'>
                        Submit
                    </Button>
                </Form>
            </Segment>
        </>
    );
};
