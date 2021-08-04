import { IEvent } from 'src/app/models/event.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {//{green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}

  constructor() { }
  @Input() event:IEvent;//event comes from the events-list parent component.

  ngOnInit(): void {
  }

  getStartTimeClass(){
    if(this.event?.time === '8:00 am'){
      return 'green bold';//or return ['bold', 'green']
    }
    return '';
  }

}
