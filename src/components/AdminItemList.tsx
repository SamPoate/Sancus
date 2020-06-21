import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';

import { Table, Icon, Input } from 'semantic-ui-react';
import { IItem, IPartner } from '../types';
import { updateItem } from '../redux/slices/itemSlice';

interface AdminItemList {}

const AdminItemList: React.FC<AdminItemList> = () => {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [points, setPoints] = useState<number | null>(null);
    const [itemEditor, setItemEditor] = useState<IItem | null>(null);

    const dispatch = useDispatch();
    const { items, partners } = useSelector((state: RootState) => state);

    const submitItemUpdate = (item: IItem) => {
        dispatch(
            updateItem({
                ...item,
                name: name || item.name,
                description: description || item.description,
                points:
                    typeof points === 'number'
                        ? points
                        : item.points || item.points
            })
        );
        setItemEditor(null);
    };

    return (
        <Table inverted selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Points</Table.HeaderCell>
                    <Table.HeaderCell>Assigned To</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item: IItem) => {
                    if (item.id === itemEditor?.id) {
                        return (
                            <Table.Row key={item.id}>
                                <Table.Cell>
                                    <Input
                                        value={name || item.name}
                                        onChange={e => setName(e.target.value)}
                                        fluid
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        value={description || item.description}
                                        onChange={e =>
                                            setDescription(e.target.value)
                                        }
                                        fluid
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        value={
                                            typeof points === 'number'
                                                ? points
                                                : item.points
                                        }
                                        onChange={e =>
                                            setPoints(
                                                !e.target.value
                                                    ? 0
                                                    : parseInt(
                                                          e.target.value,
                                                          10
                                                      )
                                            )
                                        }
                                        fluid
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        partners.find((partner: IPartner) =>
                                            partner.items.includes(item.id)
                                        )?.name
                                    }
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Icon
                                        name='check'
                                        color='green'
                                        size='large'
                                        onClick={() => submitItemUpdate(item)}
                                    />
                                    <Icon
                                        name='close'
                                        color='red'
                                        size='large'
                                        onClick={() => setItemEditor(null)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    }

                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>{item.points}</Table.Cell>
                            <Table.Cell>
                                {
                                    partners.find((partner: IPartner) =>
                                        partner.items.includes(item.id)
                                    )?.name
                                }
                            </Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Icon
                                    name='edit'
                                    color='blue'
                                    size='large'
                                    onClick={() => setItemEditor(item)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default AdminItemList;
