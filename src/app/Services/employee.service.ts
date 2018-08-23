import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Employee, EmployeeExtended } from '../Models/employee.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { identifierModuleUrl } from '@angular/compiler';

const API_URL = environment.apiUrl;

@Injectable()

export class EmployeeService {

    //General Methods
    selectedEmployee: Employee;
    selectedEmployeeExtended: EmployeeExtended;

    constructor(private _http: Http, private _httpClient: HttpClient) {

    }

    createEmployee(employee: Employee) {
        let headerOptions = new Headers({ 'Content-Type': 'application/json' });
        let requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
        let body = JSON.stringify(employee);

        return this._http.post(API_URL + '/api/Employees/PostEmployee', body, requestOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateEmployee(id: number, employee: Employee) {
        let headerOptions = new Headers({ 'Content-Type': 'application/json' });
        let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
        let body = JSON.stringify(employee);

        return this._http.post(API_URL + '/api/Employees/PutEmployee/' + id, body, requestOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteEmployee(id: number) {
        return this._http.delete(API_URL + '/api/Employees/DeleteEmployee/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getEmployeesList(): Observable<EmployeeExtended[]> {
        return this._http.get(API_URL + "/api/Employees/GetEmployees")
            .map((response: Response) => <EmployeeExtended[]>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        
        return Observable.throw(error);
    }
}