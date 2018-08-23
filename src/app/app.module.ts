//Assemblies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropDown_SelectValidatorDirective } from './Shared/DropDown-SelectValidator.Directive';
import { ConfirmPasswordValidatorDirective } from './Shared/ConfirmPasswordValidator.Directive';

//Modules
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';

//Services
import { DepartmentService } from  './Services/department.service'
import { EmployeeService } from  './Services/employee.service';
import { DisplayEmployeesComponent } from './employees/display-employees.component'

const appRoutes : Routes = [
  {path:'EmployeeManagement', component:ListEmployeesComponent},
  {path:'CUEmployee', component:CreateEmployeeComponent},
  {path:'CUEmployee/:empObject', component:CreateEmployeeComponent},
  {path:'' ,redirectTo:'/EmployeeManagement', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    DropDown_SelectValidatorDirective,
    ConfirmPasswordValidatorDirective,
    DisplayEmployeesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [
    DepartmentService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
