import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApplicationStateService } from './application-state.service';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	protected baseUrl: String;

	public currentUser = this.applicationStateService.currentUserModel;

	constructor(private http: HttpClient, private applicationStateService: ApplicationStateService) {
		this.baseUrl = environment.apiUrl + '/api/';
    }
    
    public get<T>(path: string, params: HttpParams = null): Observable<T>{
        return this.http.get<T>(`${this.baseUrl}${path}`, {
			params
		});
    }

	public post<T>(path: string, body: Object): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}${path}`, body);
	}

	public patch<T>(path:string, body: Object = null): Observable<T>{
		return this.http.patch<T>(`${this.baseUrl}${path}`, body);
	}
}
