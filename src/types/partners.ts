export interface IPartner {
    id: string;
    name: string;
    partnerLevel: string | 'basic';
    logo?: string;
    users?: Array<string>;
    currentDiscountedItems: Array<string>;
    totalDiscountsUsed: number | 0;
}
