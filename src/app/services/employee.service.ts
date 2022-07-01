import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //  --proxy-config proxy.conf.json
  private API_URL = 'https://employees-api-kappa.herokuapp.com/api/employee';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.API_URL}/all`);
  }

  getOneEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.API_URL}/find/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.API_URL}/add`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${this.API_URL}/update`, employee);
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.delete<Employee>(
      `${this.API_URL}/delete/${employee.id}`
    );
  }
}
