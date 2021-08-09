import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from '../shared/services/event-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  newEvent: any;
  constructor(private router:Router, private eventService:EventServiceService) { }

  public isDirty: boolean = true;

  ngOnInit(): void {
    this.newEvent = {
      name: 'New event',
      date: '9/9/2021',
      time: '12am',
      price: '500',
      location: {
        address:'The address street',
        city:'The city',
        country:'The country',
      },
      onlineUrl:'http://theUrl.com',
      imageUrl:'http://theUrl.com/test.jpg',

    }
  }
  cancel(){
    this.router.navigate(['/events']);
  }

  saveEvent(formValues){
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }

}
