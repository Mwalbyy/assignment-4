import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

//meta data for our component
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {

  //stores our products from the server so that html can read from it.
  products: any[] = [];

  //used to get the necessary tools from angular
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  //fetches data on the components init.
  ngOnInit(): void {
    this.loadProducts();
  }

  //service function
  loadProducts() {
    
    //sub to the observable to init the request.
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; 
        console.log('Products loaded:', this.products);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  //onClick function that is called when the user clicks buy btn.
  onPurchase(product: any) {
    console.log('User clicked buy on:', product.name);

    this.productService.selectProduct(product).subscribe(() => {
    
      this.router.navigate(['/review']);
    });
  }
}