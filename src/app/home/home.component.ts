import { Component, Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { Product } from '../models/Product';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listProduct: Product[] = [];
  isAddForm: boolean = true;
  isEditForm: boolean = false;
  currentProduct: Product;
  constructor(private productService: ProductsService) {
    this.currentProduct = {
      productId: 0,
      productName: '',
      employeeId: 0,
      employee: new Employee(),
    };
    this.productService.getAllProduct().subscribe((data: Product[]) => {
      this.listProduct = <Product[]>data;
    });
    this.isAddForm = true;
    this.isEditForm = false;
  }

  ngOnInit(): void {
    this.refreshData();
  }
  changeToAddProduct(): void {
    this.isAddForm = true;
    this.isEditForm = false;
  }
  editProduct(product: Product): void {
    if (product != null) {
      this.isAddForm = false;
      this.isEditForm = true;
    }
    var product2 = new Product(product);
    this.currentProduct = product2;
  }
  editCertainProduct(): void {

    var putData = {
      productName: this.currentProduct.productName,
      productId: this.currentProduct.productId,
    };
    this.productService.editProduct(putData).subscribe((data: Product) => { });
    const index = this.listProduct.findIndex(
      (product) => product.productId === this.currentProduct.productId
    );
    this.listProduct[index] = this.currentProduct as any;
  }
  removeProduct(product: Product) {
    this.productService
      .removeProduct(product.productId)
      .subscribe((data: Product) => { });
    const index = this.listProduct.findIndex(
      (item) => item.productId === product.productId
    );
    this.listProduct.splice(index, 0);
  }

  addProduct() {

    var postData = {
      productName: this.currentProduct.productName,
      employeeId: this.currentProduct.employeeId,
    };
    this.productService.addProduct(postData).subscribe(
    );

  }

  refreshData() {
    this.productService.getAllProduct().subscribe((data: Product[]) => {
      this.listProduct = data;
    });
  }

}
