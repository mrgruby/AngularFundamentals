import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from '../shared/services/event-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  constructor(private router:Router, private eventService:EventServiceService) { }
  event;

  public isDirty: boolean = true;

  
  cancel(){
    this.router.navigate(['/events']);
  }

  saveEvent(formValues){
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
