import { Injectable } from "@angular/core";
import { IUser } from "src/app/models/user.model"; 

@Injectable()
export class AuthService{
    currentUser:IUser
    
    loginUser(userName:string, password:string){
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa',
        }
    }

    isAuthenticated(){
        return !!this.currentUser;//Returns true if the current user object is set. !! converts to boolean
    }

    updateCurrentUser(firstName:string, lastName:string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}