import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        console.log('=== AUTH SERVICE INIT ===');
        console.log('Endpoint:', conf.appwriteUrl);
        console.log('Project ID:', conf.appwriteProjectId);
        
        if (!conf.appwriteUrl || !conf.appwriteProjectId) {
            console.error('Missing Appwrite configuration!');
            throw new Error('Appwrite configuration is missing');
        }
        
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        console.log('Auth service initialized successfully');
    }

    async createAccount({email, password, name}) {
        try {
            console.log('Creating account for:', email);
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log('Account created successfully');
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            console.log('Attempting login for:', email);
            const result = await this.account.createEmailSession(email, password);
            console.log('Login successful:', result);
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

