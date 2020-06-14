import { ITransaction } from './transactions';

export interface IMember {
    id: string;
    name: string;
    description: string;
    points: number;
    lastTransaction?: ITransaction;
}
