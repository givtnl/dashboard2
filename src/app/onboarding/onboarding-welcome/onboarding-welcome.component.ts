import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-onboarding-welcome',
  templateUrl: './onboarding-welcome.component.html',
  styleUrls: ['./onboarding-welcome.component.scss']
})
export class OnboardingWelcomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addUser() {
    //this.userService.createCollectGroupAdmin()
  }
}
