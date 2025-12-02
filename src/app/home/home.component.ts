import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent implements OnInit {

  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
  
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

  onPurchase(product: any) {
    console.log('User clicked buy on:', product.name);

    this.productService.selectProduct(product).subscribe(() => {
    
      this.router.navigate(['/review']);
    });
  }
}