import { Routes } from "@angular/router";
import { EventsListComponent } from "./events/events-list/events-list.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { CreateEventComponent } from "./create-event/create-event.component";
import { Error404Component } from "./errors/404.component";
import { EventRouteActivatorService } from "./shared/services/event-route-activator.service";

export const appRoutes:Routes = [
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},//This uses a function as a route guard. Check app.module to see how it is hooked up
    {path: 'events', component: EventsListComponent},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService]},//This uses a service as a route guard
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch: 'full'}
]