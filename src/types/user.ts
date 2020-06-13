export interface IUser {
    id: string;
    role: string | 'member';
    memberId?: string;
    partnerId?: string;
    name: string;
    joinDate: string;
}
