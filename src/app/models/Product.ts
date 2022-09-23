import { Employee } from "./Employee";

export class Product {
    productId: number;
    productName: string;
    employeeId: number;
    employee: Employee;
    constructor(data: any) {
        this.productId = data.productId;
        this.productName = data.productName;
        this.employeeId = data.employeeId;
        this.employee = data.employee;
    }

}