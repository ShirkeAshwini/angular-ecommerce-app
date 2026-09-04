import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;


  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

 
  ngOnInit(): void {
    this.loadCart();

    this.cartService.cartUpdated$.subscribe(()=>{
      this.loadCart();
    })
  }

// loadCart() {
//   const userId = this.authService.getUserId();

//   this.cartService.getCart(userId).subscribe(res => {
//     this.cartItems = res;
//     this.calculateTotal();
//     console.log('Cart Items:', res);
//   });
// }

loadCart() {

  const userId = this.authService.getUserId();

  console.log('Cart UserId:', userId);

  this.cartService.getCart(userId).subscribe({
    next: (res) => {
      console.log('Cart API Response:', res);

      this.cartItems = res;
      this.calculateTotal();
    },
    error: (err) => {
      console.log('Cart Responce:', err);
    }
  });
}

 calculateTotal() {
  this.totalPrice = this.cartItems.reduce(
    (sum, item: any) =>
      sum + (item.Price * item.Quantity),
    0
  );
}

increase(item: any) {

  console.log('Item:', item);

  const payload = {
    userId: item.UserId,
    productId: item.ProductId,
    quantity: 1
  };

  console.log('Payload:', payload);

  this.cartService.increaseQty(payload).subscribe({
    next: () => this.loadCart(),
    error: err => console.log(err)
  });
}

 decrease(item: any) {
  const payload = {
    userId: item.UserId,
    productId: item.ProductId,
    quantity: 1
  };

  this.cartService.decreaseQty(payload)
      .subscribe(() => this.loadCart());
}


  removeItem(id: number) {
  this.cartService.removeItem(id).subscribe({
    next: () => {

      this.toastr.success(
        'Product removed from cart successfully.',
        'Removed'
      );

      this.loadCart();
    },

    error: (err) => {
      console.error(err);

      this.toastr.error(
        'Failed to remove product from cart.',
        'Error'
      );
    }
  });
}

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  getImageUrl(imagePath: string): string {

    if (!imagePath) {
    return 'assets/no-image.png';
  }

  return imagePath.startsWith('http')
    ? imagePath
    : `http://shirkeash-001-site1.ltempurl.com${imagePath}`;
}

}