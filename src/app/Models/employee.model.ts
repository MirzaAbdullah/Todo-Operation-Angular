export class Employee {
    Id : number;
    FullName: string;
    Email: string;
    PhoneNumber: number;
    ContactPreference: string;
    Gender: string;   
    DepartmentId: number;
    DateOfBirth?: Date;
    Photo:string;
    IsActive: boolean;
}

export class EmployeeExtended {
    Id : number;
    FullName: string;
    Email: string;
    PhoneNumber: number;
    ContactPreference: string;
    Gender: string;   
    DepartmentId: number;
    Department: string;
    DateOfBirth: Date;
    Photo:string;
    IsActive: boolean;
}