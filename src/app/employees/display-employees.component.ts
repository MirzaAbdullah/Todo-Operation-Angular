import { Component, OnInit, Input, Inject } from '@angular/core';
import { Employee, EmployeeExtended } from '../Models/employee.model';
import { ListEmployeesComponent } from './list-employees.component';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {

  @Input() EmployeeList : EmployeeExtended[];
  modelRef : BsModalRef;

  constructor(@Inject(ListEmployeesComponent) private _Parent: ListEmployeesComponent) { 
  }

  ngOnInit() {
  }

  EditEmployee(_employee: EmployeeExtended){
    this._Parent.EditEmployee(_employee);
  }

  openModal(template,employeeId){
    this._Parent.openModal(template,employeeId);
  }

  confirmDelete(){
    this._Parent.confirmDelete();
  }

}
