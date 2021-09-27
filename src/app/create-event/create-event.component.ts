import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from '../shared/services/event-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  constructor(private router: Router, private eventService: EventServiceService) { }
  event;

  //isDirty is used by a route guard function to make sure that you can't navigate away from the create new event page, until the event is saved.
  //This function is located in the app.module.ts file.
  public isDirty: boolean = true;


  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues) {
    //saveEvent actually returns an observable with the new event that has been created, but we don't need to do anything with it here.
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events'])
    });
  }
}
