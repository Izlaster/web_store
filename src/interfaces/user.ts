export interface IUser {
    id: number;
    username: string;
    balance: number;
}

export interface UserProps {
    data: IUser;
    setUser: (user: IUser) => void;
}