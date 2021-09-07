import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISession } from '../models/event.model';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  filteredSessions: ISession[] = [];

  //Handle changes in the input parameters
  ngOnChanges() {
    //Check if sessions are loaded before handling the filterBy change
    if (this.sessions) {
      this.filterSessions(this.filterBy);

      this.sortBy === 'name' ? this.filteredSessions.sort(sortByNameAsc) : this.filteredSessions.sort(sortByVotesDesc)
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
      //Slice creates a clone of the sessions array, We want to display all sessions if 'all' is selected, but not the original sessions array.
      this.filteredSessions = this.sessions.slice(0);
    }
    else {
      this.filteredSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      })
    }
  }
}

//By sorting an array of type ISession, it is inferred that S1 and S2 are of type ISession
function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name)
    return 1;
  else if (s1.name === s2.name)
    return 0;
  else return -1;
}
function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
