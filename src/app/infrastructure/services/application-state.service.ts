import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../models/current-user.model';
import { CurrentTokenModel } from '../models/current-token.model';
import { CurrentUserExtensionModel } from '../models/current-user-extension.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('ApplicationStateService.CurrentUserModel');
    this.storage.removeItem('ApplicationStateService.CurrentTokenModel');
    this.storage.removeItem('ApplicationStateService.CurrentUserExtensionModel');
  }

  public get currentUserModel(): CurrentUserModel {
    const key = 'ApplicationStateService.CurrentUserModel';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  public set currentUserModel(value: CurrentUserModel) {
    const key = 'ApplicationStateService.CurrentUserModel';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get currentTokenModel(): CurrentTokenModel {
    const key = 'ApplicationStateService.CurrentTokenModel';
    try {
      const serializedRequest = JSON.parse(this.storage.getItem(key));
      return serializedRequest;
    } catch (error) {
      return null;
    }
  }

  public set currentTokenModel(value: CurrentTokenModel) {
    const key = 'ApplicationStateService.CurrentTokenModel';
    this.storage.setItem(key, JSON.stringify(value));
  }


  public get currentUserExtensionModel(): CurrentUserExtensionModel {
    const key = 'ApplicationStateService.CurrentUserExtensionModel';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  public set currentUserExtensionModel(value: CurrentUserExtensionModel) {
    const key = 'ApplicationStateService.CurrentUserExtensionModel';
    this.storage.setItem(key, JSON.stringify(value));
  }
}
