import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    // this.product = this.productService.getProductById(id);

    this .productService.getProductById(id).subscribe({
      next: (res: any)=>{
        this.product =res;
        console.log('Product Details', res);
      },

      error:(err)=> {
        console.error(err);
      }
    });

  }

  getImageUrl(image: string){
    return 'https://shirkeash-001-site1.ltempurl.com/' + image;
  }

  
  addToCart(product: Product) {
    alert(product.Name + ' added to cart');
  }

}