import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updatePartner } from '../redux/slices/partnerSlice';
import {
    Header,
    Icon,
    Input,
    Table,
    Card,
    Form,
    Button
} from 'semantic-ui-react';
import { IPartner } from '../types';

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
    const [search, setSearch] = useState<string>('');
    const dispatch = useDispatch();
    const partners = useSelector((state: RootState) => state.partners);
    const [partnerEdit, setPartnerEdit] = useState<IPartner | null>(null);

    const onSubmit = () => {
        if (partnerEdit) {
            dispatch(updatePartner(partnerEdit));
            setPartnerEdit(null);
        }
    };

    return (
        <>
            <Header
                as='h1'
                content='Our Partners'
                inverted
                style={{
                    fontSize: '3em'
                }}
            />
            <Input
                placeholder='Search...'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Table color='green'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member</Table.HeaderCell>
                        <Table.HeaderCell>Today's Discounts</Table.HeaderCell>
                        <Table.HeaderCell>Total Discounts</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {partners
                        .filter(partner =>
                            partner.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map(partner => (
                            <Table.Row key={partner.id}>
                                <Table.Cell>{partner.name}</Table.Cell>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>
                                    {partner.totalPointsAllocated}
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                    <Icon
                                        name='edit'
                                        color='blue'
                                        size='large'
                                        onClick={() => setPartnerEdit(partner)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
            {partnerEdit && (
                <Card className='partner-edit'>
                    <Form onSubmit={onSubmit}>
                        <Form.Input
                            value={partnerEdit.name}
                            onChange={e =>
                                setPartnerEdit({
                                    ...partnerEdit,
                                    name: e.target.value
                                })
                            }
                            label="Partners's Name"
                            placeholder='Name'
                            // error={{
                            //     content: 'Please enter your first name',
                            //     pointing: 'below'
                            // }}
                            fluid
                        />
                        <Form.Input
                            value={partnerEdit.totalPointsAllocated}
                            onChange={e =>
                                setPartnerEdit({
                                    ...partnerEdit,
                                    totalPointsAllocated: parseInt(
                                        e.target.value,
                                        10
                                    )
                                })
                            }
                            label='Points'
                            placeholder='Point value of item'
                            // error={{
                            //     content: 'Please enter your first name',
                            //     pointing: 'below'
                            // }}
                            fluid
                        />
                        <Button type='submit' color='blue'>
                            Update Partner
                        </Button>
                    </Form>
                </Card>
            )}
        </>
    );
};

export default Partners;
