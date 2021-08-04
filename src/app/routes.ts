import { Routes } from "@angular/router";
import { EventsListComponent } from "./events/events-list/events-list.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { CreateEventComponent } from "./create-event/create-event.component";
import { Error404Component } from "./errors/404.component";
import { EventRouteActivatorService } from "./shared/services/event-route-activator.service";
import { EventsListResolverService } from "./shared/services/events-list-resolver.service";

export const appRoutes:Routes = [
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},//This uses a function as a route guard. Check app.module to see how it is hooked up
    {path: 'events', component: EventsListComponent, resolve:{events:EventsListResolverService}},//See notes
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService]},//This uses a service as a route guard
    {path: '404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch: 'full'},
    {
        path: 'user',
        loadChildren: ()=> import('./user/user.module').//This loads the user module with a function, when the path starts with 'user'. 
        then(m => m.UserModule)                         //So, this module is loaded only when the user accesses the user profile, which saves loading ressources in big apps
    }
]

//Notes.
//Before resolving this route, call EventsListResolverService. 
//When this service finishes and returns data, add this data to a property called events on the route.
//This events property can now be picked out of the route in the component that uses the route, in this case the eventsList component.