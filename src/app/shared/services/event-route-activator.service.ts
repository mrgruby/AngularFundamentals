import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EventServiceService } from './event-service.service';

@Injectable({
  providedIn: 'root'
})

//This service is used as a route guard. It is called in the route that we want to check, using canActivate.
//When the route is hit with an id, this service checks if the event with the id parameter exists. If not, it redirects to the 404 route that shows an error page.
export class EventRouteActivatorService implements CanActivate {

  constructor(private eventService: EventServiceService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot) {
    const eventExists = !!this.eventService.getEvent(+route.params['id'])
    //!! casts to boolean. + casts to a number, needs to be done since the route.params['id'] is a string
    if (!eventExists)
      this.router.navigate(['/404']);
    return eventExists;
  }
}
