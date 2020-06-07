import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { addItem, updateItem } from '../redux/slices/itemSlice';
import { addPartnerItem } from '../redux/slices/partnerSlice';
import {
    Header,
    Icon,
    Card,
    Table,
    Form,
    Input,
    Image,
    Button
} from 'semantic-ui-react';
import { IItem } from '../types';

interface MembersProps {}

const Members: React.FC<MembersProps> = () => {
    const dispatch = useDispatch();
    const { user, items, partners } = useSelector((state: RootState) => state);
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const [activeItem, setActiveItem] = useState<IItem | null>(null);

    let displayedItems: Array<IItem> = [];
    const userPartner = partners.find(
        partner =>
            partner.users &&
            partner.users.some(partnerUser => partnerUser === user.id)
    );

    const submitItem = () => {
        if (id && name && description && totalDiscount && userPartner) {
            dispatch(addItem({ id, name, description, totalDiscount }));
            dispatch(addPartnerItem(id, userPartner.id));
            setId('');
            setName('');
            setDescription('');
            setTotalDiscount(0);
        }
    };

    switch (user.role) {
        case 'member':
            displayedItems = items;
            break;

        case 'partner':
            if (userPartner && userPartner.currentDiscountedItems) {
                displayedItems = items.filter(item =>
                    userPartner.currentDiscountedItems.includes(item.id)
                );
            }

            break;
    }

    return (
        <>
            <Header
                as='h1'
                content='Discounted Items'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Table color='purple'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Total Discount (%)</Table.HeaderCell>
                        {user.role === 'member' ? (
                            <Table.HeaderCell textAlign='right'>
                                Partner
                            </Table.HeaderCell>
                        ) : (
                            <Table.HeaderCell />
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayedItems.map(item => {
                        if (activeItem && activeItem.id === item.id) {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        <Input
                                            value={activeItem.name}
                                            onChange={e =>
                                                setActiveItem({
                                                    ...activeItem,
                                                    name: e.target.value
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            value={activeItem.description}
                                            onChange={e =>
                                                setActiveItem({
                                                    ...activeItem,
                                                    description: e.target.value
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            value={activeItem.totalDiscount}
                                            onChange={e =>
                                                setActiveItem({
                                                    ...activeItem,
                                                    totalDiscount:
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        ) || 0
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        <Icon
                                            name='check'
                                            color='green'
                                            size='large'
                                            onClick={() => {
                                                item !== activeItem &&
                                                    dispatch(
                                                        updateItem(activeItem)
                                                    );
                                                setActiveItem(null);
                                            }}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }

                        return (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.description}</Table.Cell>
                                <Table.Cell>{item.totalDiscount}</Table.Cell>
                                {user.role === 'member' ? (
                                    <Table.Cell textAlign='center'>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            src={
                                                partners.find(partner =>
                                                    partner.currentDiscountedItems.includes(
                                                        item.id
                                                    )
                                                )?.logo
                                            }
                                        />
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell textAlign='right'>
                                        <Icon
                                            name='edit'
                                            color='blue'
                                            size='large'
                                            onClick={() => setActiveItem(item)}
                                        />
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {user.role !== 'member' && (
                <Card className='add-item'>
                    <Form onSubmit={submitItem}>
                        <Form.Input
                            value={id}
                            onChange={e => setId(e.target.value)}
                            label='Id'
                            fluid
                        />
                        <Form.Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            label='Name'
                            // error={{
                            //     content: 'Please enter your first name',
                            //     pointing: 'below'
                            // }}
                            fluid
                        />
                        <Form.Input
                            label='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fluid
                        />
                        <Form.Input
                            label='Discount (%)'
                            value={totalDiscount}
                            onChange={e =>
                                setTotalDiscount(
                                    parseFloat(e.target.value) || 0
                                )
                            }
                            fluid
                        />
                        <Button type='submit' color='green'>
                            Add Item
                        </Button>
                    </Form>
                </Card>
            )}
        </>
    );
};

export default Members;
