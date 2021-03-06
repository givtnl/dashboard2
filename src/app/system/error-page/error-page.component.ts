import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss', '../system.module.scss']
})
export class ErrorPageComponent implements OnInit {
  public errorMessage: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.errorMessage = this.route.snapshot.queryParams.error || 'errorPageComponent.description';
  }
}
