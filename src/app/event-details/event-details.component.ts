import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from 'src/app/models/event.model';
import { EventServiceService } from '../shared/services/event-service.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService: EventServiceService, private route: ActivatedRoute) { }

  id: number;
  ngOnInit(): void {
    //The ActivatedRoute snapshot already has a list of the data that has been resolved, so no need to use the params object here.
    //Therefore, the data will be available in route.data
    this.route.data.forEach((data) => {
      this.event = data['event']
      this.addMode = false;
    });//+ sign casts to a number
  }

  addSession() {
    this.addMode = true;
  }

  addNewSession(session: ISession) {
    //Create a new id for the new session. This will take the session id with the biggets value, from the sessions array.
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    //sSet the new session id to nextId plus 1 to make it unique.
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddNewSession() {
    this.addMode = false;
  }
}
