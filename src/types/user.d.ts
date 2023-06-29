export interface ILogin {
    username: string;
    password: string;
}
export interface IUser extends ILogin {
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    verified: boolean;
    role: Role;
    _id: string;
}
