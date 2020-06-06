import { IItem } from './items';

export interface IPartner {
    id?: string;
    name?: string;
    logo?: string;
    currentDiscountedItems?: Array<IItem>;
    totalDiscountsUsed?: number;
}
