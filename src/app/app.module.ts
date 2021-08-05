import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { EventThumbnailComponent } from './event-thumbnail/event-thumbnail.component';
import { EventServiceService } from './shared/services/event-service.service';
import { ToasterService } from './shared/services/toaster.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CreateEventComponent } from './create-event/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventRouteActivatorService } from './shared/services/event-route-activator.service';
import { EventsListResolverService } from './shared/services/events-list-resolver.service';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    NavbarComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent, 
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  //Providers are shared across modules in the app, so if they are registered here in app.module, they can be used in the entire app.
  //Therefore, the auth service is registered here.
  providers: [
    EventServiceService,
    ToasterService,
    EventRouteActivatorService,
    EventsListResolverService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?');
  return true;
}
