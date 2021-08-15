import { Component, OnInit } from '@angular/core';
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


  constructor() { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords]);

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
  private restrictedWords(control: FormControl): {[key:string]:any}{
    return control.value.includes('foo')
    ? {'restrictedWords':'foo'}
    : null
  }

  saveSession(formValues){
    let session:ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,//+ casts to a number
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    }
    console.log(session)
  }
}
