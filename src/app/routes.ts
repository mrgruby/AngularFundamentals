import { Routes } from "@angular/router";
import { EventsListComponent } from "./events/events-list/events-list.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { CreateEventComponent } from "./create-event/create-event.component";

export const appRoutes:Routes = [
    {path: 'events/new', component: CreateEventComponent},
    {path: 'events', component: EventsListComponent},
    {path: 'events/:id', component: EventDetailsComponent},
    {path: '', redirectTo: '/events', pathMatch: 'full'}
]