import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventServiceService } from './event-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsListResolverService implements Resolve<any> {

  constructor(private eventsService: EventServiceService) { }

  resolve() {
    return this.eventsService.getEvents().pipe(map(events => events))
  }
}
