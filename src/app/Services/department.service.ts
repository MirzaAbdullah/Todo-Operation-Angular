import { Injectable } from '@angular/core';
import { Department } from '../Models/department.model';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

const API_URL = environment.apiUrl;

@Injectable()

export class DepartmentService {

    constructor(private _http: HttpClient) { }

    getDepartments(): Observable<Department[]> {
        return this._http.get(API_URL + "/api/AngularDB/GetDepartment")
            //.map((response: Response) => <Department[]>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}