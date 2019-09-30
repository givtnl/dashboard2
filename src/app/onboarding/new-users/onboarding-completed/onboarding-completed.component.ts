import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-onboarding-completed',
  templateUrl: './onboarding-completed.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-completed.component.scss']
})
export class OnboardingCompletedComponent {
  public redirectUrl = '/';
}
