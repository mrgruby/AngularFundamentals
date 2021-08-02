import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../shared/services/event-service.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;

  constructor(private eventService: EventServiceService, private route:ActivatedRoute) { }

  id: number;
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']//+ sign casts to a number
    this.event = this.eventService.getEvent(this.id);
  }

}
