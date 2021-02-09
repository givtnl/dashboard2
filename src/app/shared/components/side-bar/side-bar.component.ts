import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { Router } from '@angular/router';
import * as pkg from './../../../../../package.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  versionNumber = "";
  
  @Input()
  public showCloseButton = false;

  @Output()
  public closeButtonClicked = new EventEmitter();

  constructor(private accountService: AccountService, private router: Router) {
    if (!environment.production) this.versionNumber = pkg['version'];
  }

  public closeMenu(): void {
    this.closeButtonClicked.emit();
  }

  logOut(): void {
    this.accountService.logOut();
    this.router.navigate(['/', 'account', 'login']);
  }
}
