import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
//These are provided by the toastr service. The token and the Toastr interface are both registrered in app.module to make them globally available
import { TOASTR_TOKEN, Toastr } from '../../shared/services/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private firstName: FormControl
  private lastName: FormControl

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr:Toastr) { }

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
      this.toastr.success('Profile saved');
    }//
  }

  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched
  }
  validateLastName(){
    return this.lastName.valid || this.lastName.untouched
  }

}
