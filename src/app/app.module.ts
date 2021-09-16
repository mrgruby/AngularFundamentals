import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { EventThumbnailComponent } from './event-thumbnail/event-thumbnail.component';
import { EventServiceService } from './shared/services/event-service.service';
import { TOASTR_TOKEN, Toastr } from './shared/services/toaster.service';
import { JQ_TOKEN } from './shared/services/jQuery.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CreateEventComponent } from './create-event/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventRouteActivatorService } from './shared/services/event-route-activator.service';
import { EventsListResolverService } from './shared/services/events-list-resolver.service';
import { AuthService } from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './create-session/create-session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { CollapsibleWellComponent } from './shared/collapsible-well/collapsible-well.component';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { SimpleModalComponent } from './shared/simple-modal/simple-modal.component';
import { ModalTriggerDirective } from './shared/directives/modal-trigger.directive';
import { UpvoteComponent } from './upvote/upvote.component';
import { LocationValidatorDirective } from './validators/location-validator.directive';

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    NavbarComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent, 
    Error404Component, 
    CreateSessionComponent, 
    SessionListComponent, 
    CollapsibleWellComponent, 
    DurationPipe, 
    SimpleModalComponent, 
    ModalTriggerDirective, 
    UpvoteComponent, 
    LocationValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  //Providers are shared across modules in the app, so if they are registered here in app.module, they can be used in the entire app.
  //Therefore, the auth service is registered here.
  providers: [
    EventServiceService,
    {
      provide: TOASTR_TOKEN, 
      useValue: toastr
    },
    {
      provide: JQ_TOKEN, 
      useValue: jQuery
    },
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
