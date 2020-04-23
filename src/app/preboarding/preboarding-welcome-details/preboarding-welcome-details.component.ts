import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preboarding-welcome-details',
  templateUrl: './preboarding-welcome-details.component.html',
  styleUrls: ['./preboarding-welcome-details.component.scss']
})
export class PreboardingWelcomeDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  startPreboarding() {
    this.router.navigate(['/preboarding/register/name-in-app']);
  }
}
