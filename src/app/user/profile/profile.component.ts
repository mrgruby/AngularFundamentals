import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private firstName: FormControl
  private lastName: FormControl

  constructor(private authService: AuthService, private router: Router) { }
  profileForm: FormGroup//Bind to this property in the template form like this: [formGroup]="profileForm"

  ngOnInit(): void {
    //Set up a reactive form for the profile

    //Bind to each property in the template input fields like this: [formControlName]="firstName"
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);//First param to FormControl is what to display in the input field initially
    this.lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);//Second param is the validators

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel() {
    this.router.navigate(['events'])
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events'])
    }//
  }

  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched
  }
  validateLastName(){
    return this.lastName.valid || this.lastName.untouched
  }

}
