import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from '../services/jQuery.service';

@Directive({
  selector: '[modal-trigger]'//The [brackets] indicate that it is an attribute, not an element, which is whar is used for components.
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input('modal-trigger') modalId:string;

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $:any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({})
    })
  }
}
