import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {
  @Input() count: number;

  //This input parameter is now a setter, and its value is set based on whether the user has voted or not. 
  //In upvote.component.html, the [style.color]  is then bound to the iconColor property, and the color of the element will change to red or white...
  @Input() set voted(val){
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter();
  iconColor:string;
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.vote.emit({});
  }
}
