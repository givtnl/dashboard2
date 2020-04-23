import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preboarding-welcome-details',
  templateUrl: './preboarding-welcome-details.component.html',
  styleUrls: ['./preboarding-welcome-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingWelcomeDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
