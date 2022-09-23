import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(data=>{
        console.log(data);
    });
  }

}
