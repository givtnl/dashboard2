import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApplicationStateService } from './application-state.service';
import { CacheService } from 'src/app/shared/services/cache.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
    private cacheService: CacheService
    
	public baseUrl: String;

	public currentUser = this.applicationStateService.currentUserModel;

    constructor(public http: HttpClient,
        private applicationStateService: ApplicationStateService) {
        this.baseUrl = environment.apiUrl + '/api/';
        this.cacheService = new CacheService(sessionStorage);
    }
    
    public get<T>(path: string, params: HttpParams = null): Observable<T>{
        return this.http.get<T>(`${this.baseUrl}${path}`, {
			params
		});
    }

    public getCached<T>(path: string, params: HttpParams = null): Observable<T> {
        const result = this.cacheService.getItem(path);
        if (result === null || result === undefined) {
            return this.get<T>(path, params).pipe(
                map(x => {
                    this.cacheService.setItem(path, x, 30);
                    return x;
                })
            );            
        }
        return new Observable<T>(observer => {
            observer.next(result as T);
            observer.complete();
        });
    }

	public put<T>(path: string, body: Object): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}${path}`, body);
	}

	public post<T>(path: string, body: Object, headers: HttpHeaders = null): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}${path}`, body, {
			headers: headers
		} );
	}

	public patch<T>(path:string, body: Object = null): Observable<T>{
		return this.http.patch<T>(`${this.baseUrl}${path}`, body);
	}
    public delete(path:string): Observable<object>{
		return this.http.delete(`${this.baseUrl}${path}`);
	}
}
