export interface IPartner {
    id: string;
    name: string;
    partnerLevel: string | 'basic';
    logo?: string;
    itemsInStock: Array<string>;
    totalPointsAllocated: number | 0;
}
