import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventServiceService } from './event-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<any> {

  constructor(private eventService: EventServiceService){}

  resolve(route:ActivatedRouteSnapshot) {
    return this.eventService.getEvent(route.params['id']);
  }
}