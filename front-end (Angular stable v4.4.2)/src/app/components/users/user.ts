/**
 * User model
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { Account } from  '../accounts/account';

export interface User{
    id: String;
    fname: String;
	mname: String;
	lname: String;
	email: String;
    password: String;
    account_id : String;
	account : Account;
}