import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/shared/services/event-service.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

declare let toastr;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  constructor(private service: EventServiceService, private toastrService: ToasterService) { }

  events: any[];
  ngOnInit(): void {
    this.events = this.getEvents();
  }

  getEvents(){
    return this.service.getEvents();
  }

  handleThumbnailClick(name){

    this.toastrService.success(name);
  }

}
