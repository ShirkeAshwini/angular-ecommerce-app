import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService,
    private authService:AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

 ngOnInit(): void {
   const user = this.authService.getUser();

   const userId =user?.Id ?? user?.id;

   console.log('Order Page User:', user);

   if(!userId){
    this.toastr.error('Please login first');
    return;
   }

   this.loadOrders(userId);
 }

  getImageUrl(imagePath: string): string{
    if(!imagePath){
      return 'assets/no-image.png';
    }
    return`https://localhost:44387${imagePath}`;
  }

  loadOrders(userId: number){
    if(!userId || userId ===0){
      console.log('Invalid userId for orders');
      return;
    }

    this.orderService.getOrdersByUser(userId).subscribe({
      next: (res: any) => {
        console.log("Orders API Response:", res);
        this.orders = res;
      },
      error: (err) => {
        console.log("Orders API Error:",err);
      }
    })
  }

  reorder(order: any){
   const user = this.authService.getUser();

   const userId = user?.Id ?? user?.id;
   
   if (!userId) {
     console.error('User not logged in');
     return;
   }
   

    if(!order.OrderItems || order.OrderItems.length ===0){
      this.toastr.warning('No items found in this order');
      return;
    }

    const requests = order.OrderItems.map((item: any) => {
      console.log('Order Item:', item);

      const cartItem = {
        userId: user.Id,
        productId: item.ProductId,
        quantity: item.Quantity
      };

      console. log('Cart Payload:', cartItem);

      return this.cartService.addToCart(cartItem);

    });
     
    forkJoin(requests).subscribe({
      next: (res) => {
        console.log('Cart Success:', res);
        this.toastr.success('Order items added to cart successfully.')

        this.cartService.refreshCart();
      },

      error: (err)=>{
        console.log('Cart Error:', err);
        this.toastr.error('Reoder failed')
      }
    });
  }
}