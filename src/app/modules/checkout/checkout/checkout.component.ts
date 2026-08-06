import { Component, OnInit } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Product } from 'src/app/shared/models/product.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  // simple form model
  address = {
    name: '',
    mobile: '',
    city: '',
    addressLine: ''
  };


  constructor(private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}
  
 ngOnInit(): void {

  this.cartService.getCartItems().subscribe({
    next: (res) => {
      this.cartItems = res;

      this.totalPrice = this.cartItems.reduce(
        (sum, item) => sum + (item.Price * (item.Quantity || 1)),
        0
      )
    }
  });

  const user = this.authService.getUser();

  this.address.name = user.name || '';

}

  // placeOrder() {

  // if (!this.address.name ||
  //     !this.address.mobile ||
  //     !this.address.city ||
  //     !this.address.addressLine) {

  //   alert('Please fill all details');
  //   return;
  // }

 placeOrder(form: NgForm) {

  if (form.invalid) {

    this.toastr.warning(
      'Please fill all required fields.',
      'Validation'
    );

    return;
  }

  const userId = this.authService.getUserId();

  if (!userId) {

    this.toastr.warning(
      'Please login first.',
      'Login Required'
    );

    return;
  }

  const orderData = {

    userId: userId,

    customerName: this.address.name,

    mobile: this.address.mobile,

    city: this.address.city,

    addressLine: this.address.addressLine,

    totalAmount: this.totalPrice,

    orderItems: this.cartItems.map(item => ({

      productId: item.Id,

      productName: item.Name,

      price: item.Price,

      quantity: item.Quantity || 1,

      imageUrl: item.ImageUrl

    }))

  };

  console.log('Order Data:', orderData);

  this.orderService.placeOrder(orderData).subscribe({

    next: (res) => {

      this.toastr.success(
        'Your order has been placed successfully.',
        'Order Placed'
      );

      // Clear cart
      this.cartItems = [];
      this.totalPrice = 0;

      // Clear address
      this.address = {

        name: '',

        mobile: '',

        city: '',

        addressLine: ''

      };

      // Reset form
      form.resetForm();

      // If your CartService has clearCart()
      // this.cartService.clearCart();

    },

    error: (err) => {

      console.error(err);

      this.toastr.error(
        'Failed to place order.',
        'Error'
      );

    }

  });

}

getImageUrl(imagePath:string): string{
  if(!imagePath){
    return 'assets/no-image.png';
  }

  return `https://localhost:44387${imagePath}`;
}

} 
