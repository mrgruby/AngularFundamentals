import { Component, OnInit } from '@angular/core';
import { ISession } from 'src/app/models/event.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventServiceService } from 'src/app/shared/services/event-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private eventService:EventServiceService) { }
  searchTerm:string="";
  foundSessions:ISession[];
  ngOnInit(): void {
  }

  searchSessions(searchTerm){
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    })
  }
}