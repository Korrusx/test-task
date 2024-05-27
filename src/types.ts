export interface Address {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
    description: string;
}