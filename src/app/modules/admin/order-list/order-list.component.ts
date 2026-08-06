import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any[]=[];

   constructor(
      private orderService: OrderService,
      private toastr: ToastrService
    ) {}

    ngOnInit(): void {
      this.loadOrders();
    }

    loadOrders(){
      this.orderService.getAllOrders().subscribe({
        next: (res:any) => {
          console.log(res);
          console.log(res[0]);
          this.orders = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    changeStatus(orderId: number, status: string) {
    
      this.orderService.updateStatus(orderId, status).subscribe({
        next: () => {
          this.toastr.success('Status updated successfully');
          this.loadOrders();
        },
        error: () => {
          this.toastr.error('Failed to update order status');
        }
      });
    
    }

}
