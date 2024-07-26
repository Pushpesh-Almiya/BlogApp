import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  cliet = new Client();
  account;
  constructor() {
    this.cliet
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.cliet);
  }

  //Sign up >>>>>>>>>>>>>>>

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("UserData from auth.js ", userAccount);
      if (userAccount) {
        //Call another method Successfull
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //Sign In>>>>>>>>>>>>>>>
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  // Verify you are using the correct version of the library

  //Get current User >>>>>>>>>>>>>>>
  async getCurrentUser() {
    try {
      // return await this.account.get()
      // const user = await this.account.get()
      // if(user){
      //     console.log(user);
      // }else{
      //     console.log("error in getCurrentUser :: ", user);
      // }
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUserError :: error", error);
      // throw error
    }
    return null;
  }

  //Logout >>>>>>>>>>>>>>>
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: Logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
