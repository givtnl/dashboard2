import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {
    private baseUrl: String

    constructor (private http: HttpClient) {
        this.baseUrl = environment.apiUrl + '/api/'
    }

    post(path: String, body: Object){
        console.log("posting..")
        return this.http.post(`${this.baseUrl}${path}`, body, {observe: 'response'})
            .subscribe(resp => {
                console.log(resp)
            })
    }
}