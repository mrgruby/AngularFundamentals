import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(private router:Router) { }

  public isDirty: boolean = true;

  ngOnInit(): void {
  }
  cancel(){
    this.router.navigate(['/events'])
  }

}
