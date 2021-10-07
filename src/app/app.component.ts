import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService) { }

  //Here in the app.component, we check if the user is still autheticated. 
  //For instance, when the user refreshes the page, this ngOnInit is run.
  ngOnInit() {
    this.auth.checkAuthenticationStatus().subscribe();
  }
}
