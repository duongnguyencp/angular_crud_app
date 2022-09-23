import { Component } from '@angular/core';
import { Employee } from './models/Employee';
import { Product } from './models/Product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crud_app';
  
}
