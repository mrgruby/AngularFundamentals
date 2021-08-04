import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password
  userName
  constructor() { }

  ngOnInit(): void {
  }

  login(formValues){
    console.log(formValues)
  }

}
