import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Object;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    }
  );
  }
}


