import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { stringify } from "querystring";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "src/app/models/user.model";

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: HttpClient) { }

    loginUser(userName: string, password: string) {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        let loginInfo = { username: userName, password: password };

        //tap() lets you tap into the data that is returned by an observable http call. 
        //We want to get the returned login info to set the current user. tap() doesn't change data, it only reads. Map() will manipulate data.
        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user'];//data['user'] is waht is returned from the server.
            }))
            .pipe(catchError(err => {
                return of(false);
            }));
    }

    isAuthenticated() {
        return !!this.currentUser;//Returns true if the current user object is set. !! converts to boolean
    }

    checkAuthenticationStatus() {
        //This could also be done in a subscribe. Using tap() instead, gives the user the option to subscribe to the returned data where
        //checkAuthenticationStatus is called, and use it for something there. 
        return this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data;
                }
            }))//We could also write .subscribe(); here, remove the return, and then write .subscribe(); over in app.component like, this.auth.checkAuthenticationStatus().subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}