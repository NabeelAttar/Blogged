// auth is a service file to handle authentication related tasks
// any sevice is a class that does that specific task and can be used anywhere in the app

import conf from '../conf/conf.js'
import { Client, Account, ID} from 'appwrite'

// instead of using the boiler plate code in docs of appwrite which uses creation of multiple object, we will create a class and use its object anywhere in the app
// this helps in creating a generalised code, when some other day you want to use some other backend as a service instead of appwrite, you just have to change inside this class according to your new backend 
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


