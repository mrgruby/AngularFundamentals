import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../models/event.model';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  //Public properties. They can be accessed directly in the html template
  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  //This is an output parameter. It is used to send data out from this component, to other components.
  //This is an event emitter, and it can tell other components that it fired an event, that can be handled in other components.
  @Output() addNewSession = new EventEmitter;
  @Output() cancelAddNewSession = new EventEmitter;


  constructor() { }

  ngOnInit(): void {
    //Initialize all the formControls with initial value and validation.
    //These will be used in the form fields as formControlName="presenter" etc..
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);

    //The custom validator function restrictedWords, is added to this field, so when this field is validated, the function is called.
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords(['foo', 'bar'])]);

    //Initialize the formGroup with all the formControls. This will be used in the form as [formGroup]="newSessionForm" in the template
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    })
  }

  //This is a custom validator. 
  //The restrictedWords objects that is returned if the field is invalid, can be accessed in the html template like this: {{fieldName.errors.restrictedWords}}
  private restrictedWords(words) {
    return (control: FormControl): { [key: string]: any } => {
      if (!words)
        return null;

      var invalidWords = words
        .map(w => control.value.includes(w) ? w : null)
        .filter(w => w != null)

      return invalidWords && invalidWords.length > 0
        ? { 'restrictedWords': invalidWords.join(', ') }
        : null
    }
  }

  //The ngSubmit function that is called when the create session form is submitted
  saveSession(formValues) {
    let session: ISession = {
      id: undefined,//id will eventually be provided in a http service
      name: formValues.name,
      duration: +formValues.duration,//+ casts to a number
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    }
    //The create-session component is used as a child component in the event-details component. So when a new session is added here, this event is fired, and it can
    //then be handled in the component that uses it.
    this.addNewSession.emit(session);
  }

  cancel(){
    this.cancelAddNewSession.emit();
  }
}
