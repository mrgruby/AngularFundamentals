import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from 'src/app/shared/services/event-service.service';
import { IEvent } from 'src/app/models/event.model';
import { ToasterService } from 'src/app/shared/services/toaster.service';

declare let toastr;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  constructor(private service: EventServiceService, private toastrService: ToasterService, private route: ActivatedRoute) { }

  events: IEvent[];
  ngOnInit(): void {
    //this.getEvents().subscribe(events => this.events = events); - This is now done in the EventsListResolverService
    this.events = this.route.snapshot.data['events'];//Data for the events property is now taken from the route
  }

  // getEvents(){
  //   return this.service.getEvents();
  // }

  handleThumbnailClick(name){

    this.toastrService.success(name);
  }

}
