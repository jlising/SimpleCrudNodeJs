/**
 * Account model
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { Address } from './address';

export interface Account{
    id: String;
    name: String;
    type: String;
    addresses : Address[];
}