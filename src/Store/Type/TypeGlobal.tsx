export type CustomerIdParam = {
    id: any;
};
export type Customer = {
    id: number,
    name: string,
    email: string
};
export type LoginUser = {
    name: string,
    email: string,
    phoneNumber:string,
    createPassword:string,
    confirmPassword:string
};
export type UserDetails = {
    username: string,
    password:string
};