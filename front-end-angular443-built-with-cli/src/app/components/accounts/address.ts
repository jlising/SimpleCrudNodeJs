import { AddressType } from "./address-type.enum";

export interface Address {
    id: String;
    street: String;
    city: String;
    state: String;
    country: String;
    zip: String;
    account_id: String;
    type: AddressType;
    phone: String;
}
