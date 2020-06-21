import { IUser } from './user';
import { IItem } from './items';

export interface IAdmin {
    users: Array<IUser>;
    items: Array<IItem>;
}
