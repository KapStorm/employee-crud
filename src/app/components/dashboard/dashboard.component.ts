import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employees!: MatTableDataSource<Employee>;
  tableColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'position',
    'email',
    'phone',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  filter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();

    if (this.employees.paginator) {
      this.employees.paginator.firstPage();
    }
  }

  getAll(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = new MatTableDataSource(data);
      this.employees.paginator = this.paginator;
    });
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.getAll();
    });
  }
}
