import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { updatePartner } from '../redux/slices/partnerSlice';
import { Header, Icon, Table, Card, Form, Button } from 'semantic-ui-react';
import { IPartner } from '../types';

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
    const dispatch = useDispatch();
    const partners = useSelector((state: RootState) => state.partners);
    const [partnerEdit, setPartnerEdit] = useState<IPartner | null>(null);

    const onSubmit = () => {
        if (
            partnerEdit &&
            partnerEdit.id &&
            partnerEdit.name &&
            partnerEdit.totalDiscountsUsed
        ) {
            dispatch(
                updatePartner(
                    partnerEdit.id,
                    partnerEdit.name,
                    partnerEdit.totalDiscountsUsed
                )
            );
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
                    {partners.map(partner => (
                        <Table.Row key={partner.id}>
                            <Table.Cell>{partner.name}</Table.Cell>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>
                                {partner.totalDiscountsUsed}
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
                            value={partnerEdit.totalDiscountsUsed}
                            onChange={e =>
                                setPartnerEdit({
                                    ...partnerEdit,
                                    totalDiscountsUsed: parseInt(
                                        e.target.value,
                                        10
                                    )
                                })
                            }
                            label='Discounts'
                            placeholder='Total Discounts'
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
