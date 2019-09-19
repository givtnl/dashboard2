import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input()
  public showCloseButton = false;

  @Output()
  public closeButtonClicked = new EventEmitter();

  constructor(private accountService: AccountService, private router: Router) {}

  public closeMenu(): void {
    this.closeButtonClicked.emit();
  }

  logOut(): void {
    this.accountService.logOut();
    this.router.navigate(['/', 'account', 'login']);
  }
}
