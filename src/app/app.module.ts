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

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    NavbarComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventServiceService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
