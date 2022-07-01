import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId!: number;
  employeePhotoUrl?: string;

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    position: new FormControl(''),
  });

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeId = this.activeRouter.snapshot.params['id'];

    this.employeeService
      .getOneEmployee(this.employeeId)
      .subscribe((res: Employee) => {
        this.employeePhotoUrl = res.photoUrl;

        this.form = new FormGroup({
          firstName: new FormControl(res?.firstName, Validators.required),
          lastName: new FormControl(res?.lastName, Validators.required),
          phone: new FormControl(res?.phone, [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^[0-9]*$/),
          ]),
          email: new FormControl(res?.email, [
            Validators.required,
            Validators.email,
          ]),
          position: new FormControl(res?.position, Validators.required),
        });
      });
  }

  submit(): void {
    if (!this.form.valid) return;

    const employee: Employee = this.form.value;
    employee.id = this.employeeId;
    employee.photoUrl = this.employeePhotoUrl;

    this.employeeService.updateEmployee(employee).subscribe();

    this.router.navigateByUrl('');
  }
}
