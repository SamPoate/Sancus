import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
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
import { PartnerEditor } from './PartnerEditor';
import { addPartner } from '../redux/slices/partnerSlice';

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
    const [search, setSearch] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [partnerLevel, setPartnerLevel] = useState<string>('basic');
    const [logo, setLogo] = useState('img/apple-logo.jpg');
    const [partnerEdit, setPartnerEdit] = useState<IPartner | null>(null);

    const partners = useSelector((state: RootState) => state.partners);
    const dispatch = useDispatch();

    const submitPartner = () => {
        if (name && partnerLevel) {
            dispatch(addPartner(name, logo, partnerLevel));
            setName('');
            setPartnerLevel('basic');
        }
    };

    if (partnerEdit)
        return (
            <PartnerEditor partner={partnerEdit} closeEditor={setPartnerEdit} />
        );

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
            <Card className='add-member'>
                <Form onSubmit={submitPartner}>
                    <Form.Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Partner's Name"
                        placeholder='Jimmy Bobs Fishing Supplies'
                        fluid
                    />
                    <Form.Input
                        fluid
                        label='Logo URL'
                        value={logo}
                        onChange={e => setLogo(e.target.value)}
                    />
                    <Form.Select
                        label='Partner Level'
                        placeholder='Their Partner Level'
                        value={partnerLevel}
                        onChange={(_, { value }) =>
                            typeof value === 'string' && setPartnerLevel(value)
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
                        Add Partner
                    </Button>
                </Form>
            </Card>
        </>
    );
};

export default Partners;
