import { Client, Account, ID } from "appwrite"
import conf from '../conf/conf.js'

class AuthService{
    client  = new Client();
    account ;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    
    async createAccount({email, password, name}){   //signup
        try {
            // const id= 
            const userAccount = await this.account.create(ID.unique(),email, password, name)
            if(userAccount){
                // call login method        
                console.log(userAccount)        
                return this.login({email, password})
            }
            else return userAccount
        } catch (error) {
            console.log("error ",error)
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("AuthService :: Login :: error ",error)
            throw error
        }
    }

    async logOut(){
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log("AuthService :: Logout :: error ",error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error ",error)
        }
        return null
    }
}

const authService = new AuthService();

export default authService