import { Injectable } from '@angular/core';
import { ISession } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor() { }

  deleteVoter(session: ISession, userName:string){
    session.voters = session.voters.filter(voter => voter !== userName)
  }
  addVoter(session: ISession, userName:string){
    session.voters.push(userName);
  }
  userHasVoted(session: ISession, userName:string){
    //some returns true if the collection has an item that matches the specified condition, in this case if the passed in username exists in the voters array
    return session.voters.some(voter => voter === userName)
  }
}
