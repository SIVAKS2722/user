import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user_management';

  constructor(private router: Router){
    if(!localStorage.getItem("userLoggedIn")){
      this.router.navigateByUrl(`/login`);
    }
  }
}
