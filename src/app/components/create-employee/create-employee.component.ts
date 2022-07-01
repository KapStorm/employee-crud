import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl('', Validators.required),
  });

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    if (!this.form.valid) return;

    const employee: Employee = this.form.value;
    this.employeeService.addEmployee(employee).subscribe();

    this.router.navigateByUrl('');
  }
}
