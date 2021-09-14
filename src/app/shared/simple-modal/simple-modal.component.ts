import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { JQ_TOKEN } from '../services/jQuery.service';

@Component({
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent implements OnInit {
  @Input() title: string;
  @Input() elementId: string;
  @Input() closeOnBodyClick: string;//This is used as a setting for weather you want to close the modal on body click, or not.

  //When this component is initialized, containerEl will give access to the DOM element that has the #modalContainer
  @ViewChild('modalContainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) { }

  ngOnInit(): void {
  }

  //When the user clicks a result in the result modal-dialog, the modal should close
  closeModal() {
    if (this.closeOnBodyClick === "true")
      this.$(this.containerEl.nativeElement).modal('hide')//containerEl points to the html element that has the #modalContainer on it.
  }
}
