import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISession } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  deleteVoter(eventId:number, session: ISession, userName:string){
    session.voters = session.voters.filter(voter => voter !== userName)

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;
    this.http.delete(url)
    //The voterService doesn't return any data to where the deleteVoter method is used, so we can subscribe to it directly here instead of where the deleteVoter method is used.
    .pipe(catchError(this.handleError('deleteVoter'))).subscribe();
  }
  addVoter(eventId:number, session: ISession, userName:string){
    session.voters.push(userName);

    let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`;
    //All the data needed for the vote is already in the url, so we pass in an empty object to the http.post method.
    this.http.post(url, {}, options)
    //The voterService doesn't return any data to where the addVoter method is used, so we can subscribe to it directly here instead of where the addVoter method is used.
    .pipe(catchError(this.handleError('addVoter'))).subscribe();
  }
  userHasVoted(session: ISession, userName:string){
    //some returns true if the collection has an item that matches the specified condition, in this case if the passed in username exists in the voters array
    return session.voters.some(voter => voter === userName)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      return of(result as T);
    }
  }
}
