import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router, RouterLink } from '@angular/router';

//Router link added to imports to allow for home btn functionality
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.sass'
})

export class ReviewComponent implements OnInit {

  selectedProduct: any = null;
  confirmationMessage: string = '';
  isSubmitting: boolean = false;

  //used to get the necessary tools from angular
  constructor(
    private productService: ProductService, 
    private router: Router
  ) {}

  //fetches data on the components init.
  ngOnInit(): void {
    this.loadSelectedProduct();
  }

  loadSelectedProduct() {
    this.productService.getSelectedProduct().subscribe({
      next: (data) => {
        this.selectedProduct = data;
      }
    });
  }

  submitOrder() {
    this.isSubmitting = true;
    
    //send the order data to the backend
    this.productService.submitOrder(this.selectedProduct).subscribe({
      next: (response: any) => {
        //Display the success message from the backend
        this.confirmationMessage = response.message; 
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Order failed', err);
        this.isSubmitting = false;
      }
    });
  }
}