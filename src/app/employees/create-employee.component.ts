import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Department } from '../Models/department.model';
import { Message } from '../Models/message.model';
import { Employee, EmployeeExtended } from '../Models/employee.model';
import { DepartmentService } from '../Services/department.service';
import { EmployeeService } from '../Services/employee.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { Validators, Validator, AbstractControl, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { serialize, deserialize } from 'serializer.ts/Serializer';
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  //General Declarations
  datePickerConfig: Partial<BsDatepickerConfig>;
  departmentsList: Department[];
  returnMessage: Message;
  photoPreview: boolean = false;
  photoPreviewIcon : string = "fa fa-eye-slash fa-2x";
  CustomButtonName : string = "";

  constructor(private _deptService: DepartmentService, private _empService: EmployeeService,
    private _toastr: ToastrService, private _activatedRoute: ActivatedRoute, private _router: Router) 
    {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: "DD/MM/YYYY"
      }
    );
  }

  ngOnInit() {
    this.resetEmployeeForm();

    if (this._empService.selectedEmployeeExtended != null) {
      let empData: EmployeeExtended = this._empService.selectedEmployeeExtended;
      this._empService.selectedEmployee = {
        Id: empData.Id,
        FullName: empData.FullName,
        Email: empData.Email,
        PhoneNumber: empData.PhoneNumber,
        ContactPreference: empData.ContactPreference,
        Gender: empData.Gender,
        DepartmentId: empData.DepartmentId,
        DateOfBirth: empData.DateOfBirth,
        Photo: empData.Photo,
        IsActive: empData.IsActive
      };
    }

    //Loading DropDown for Departments
    this._deptService.getDepartments()
      .subscribe(departmentData => this.departmentsList = departmentData,
      error => {
        console.error(error);
      });
  }

  toggleImage(){
    this.photoPreview = !this.photoPreview;
    if(this.photoPreview){
      this.photoPreviewIcon = "fa fa-eye fa-2x";
    } 
    else{
      this.photoPreviewIcon = "fa fa-eye-slash fa-2x";
    }
  }

  saveEmployee(empForm: NgForm): void {

    if (empForm.value.Id == undefined || empForm.value.Id == 0) {
      this._empService.createEmployee(empForm.value)
        .subscribe(employeeData => {
          this.resetEmployeeForm(empForm);
          this._toastr.success("New Record Addedd Successfully", "Employee Register");
          let _return: Employee = employeeData;
          this._router.navigateByUrl('/EmployeeManagement');
        },
        error => {
          this._toastr.error("Error occured from the serice. Please Try Again", "Employee Register");
          console.error(error);
        });
    }
    else {
      this._empService.updateEmployee(empForm.value.Id, empForm.value)
        .subscribe(employeeData => {
          this.resetEmployeeForm(empForm);
          this._toastr.info("Record Updated Successfully", "Employee Register");
          let _return: Employee = employeeData;
          this._router.navigateByUrl('/EmployeeManagement');
        },
        error => {
          this._toastr.error("Error occured from the serice. Please Try Again", "Employee Register");
          console.error(error);
        });
    }
  }

  resetEmployeeForm(empForm?: NgForm): void {
    if (empForm != null)
      empForm.reset();
    this._empService.selectedEmployee = {
      Id : 0,
      FullName : null,
      Email : null,
      PhoneNumber : null,
      DateOfBirth : null,
      ContactPreference : null,
      Gender : null,
      DepartmentId : null,
      Photo : null,
      IsActive : false
    };
  }
}
