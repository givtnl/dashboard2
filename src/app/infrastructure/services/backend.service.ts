import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	protected baseUrl: String;

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl + '/api/';
    }
    
    public get<T>(path: string): Observable<T>{
        return this.http.get<T>(`${this.baseUrl}${path}`);
    }

	public post<T>(path: string, body: Object): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}${path}`, body);
	}
}
