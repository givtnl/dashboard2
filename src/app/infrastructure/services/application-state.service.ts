import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  private storage = sessionStorage;

  public get currentUserModel(): CurrentUserModel {
    const key = 'ApplicationStateService.CurrentUserModel';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  public set currentUserModel(value: CurrentUserModel) {
    const key = 'ApplicationStateService.CurrentUserModel';
    this.storage.setItem(key, JSON.stringify(value));
  }
}
