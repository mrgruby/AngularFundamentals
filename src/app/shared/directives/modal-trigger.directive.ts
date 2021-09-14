import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from '../services/jQuery.service';

@Directive({
  selector: '[modal-trigger]'//The [brackets] indicate that it is an attribute, not an element, which is what is used for components.
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;

  //This is used to get the value from the modal-trigger element in navbar.component.html.
  //Since modal-trigger is not a valid name for an input parameter, we need to create an Alias for it (modalId), which is done like this.
  @Input('modal-trigger') modalId:string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $:any) {
    //This is used to get a handle to the html element on which the directive is used.
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    //Here, we use the element handle to listen to the click event on that element. That way, the modal is opened on the click event instead of onInit.
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({})
    })
  }
}