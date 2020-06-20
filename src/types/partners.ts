export interface IPartner {
    id: string;
    name: string;
    joinDate: string;
    partnerLevel: string | 'basic';
    logo?: string;
    items: Array<string>;
    totalPointsAllocated: number | 0;
}
