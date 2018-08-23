import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { EmployeeExtended } from '../Models/employee.model';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import{ BsModalRef,BsModalService } from 'ngx-bootstrap/modal';

@Component({
  //selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  //General Methods
  employeeList: EmployeeExtended[];
  currPage: number = 1;

  //Modal Settings
  modalRef : BsModalRef;
  modelEmployeeId = 0;
  modalConfiguration = {
    keyboard: true,
    class : 'modal-sm'
  };

  constructor(private _empService: EmployeeService, private _router: Router, private _toastr: ToastrService, private _modalService : BsModalService ) {
  }

  ngOnInit() {
    //Empty Service Employee Object
    this._empService.selectedEmployeeExtended = null;

    this._empService.getEmployeesList().subscribe(departmentData => this.employeeList = departmentData,
      error => {
        console.error(error);
      });
  }

  openModal(template: TemplateRef<any>, employeeId) {
    this.modelEmployeeId = employeeId;
    this.modalRef = this._modalService.show(template,this.modalConfiguration);
  }

  confirmDelete(){
    this.modalRef.hide();
    this._empService.deleteEmployee(this.modelEmployeeId)
        .subscribe(empDate => {
          this._empService.getEmployeesList().subscribe(departmentData => this.employeeList = departmentData,
            error => {
              console.error(error);
            });
          this._toastr.warning('Deleted Successfully', 'Employee Register');
        }, error => {
          console.error(error)
        });

    this.modelEmployeeId = 0;
  }

  EditEmployee(empObject: EmployeeExtended): void {
    this._empService.selectedEmployeeExtended = Object.assign({}, empObject);
    this._router.navigateByUrl("/CUEmployee");
  }
}
