import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

    products: Product[] = [];

    searchText:string='';

    selectedCategory: string='';

    filteredProducts: Product[] =[];

    categories: string[] = [];
   
    wishlistItems: any[] = [];

    sortOption: string='';


  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastr: ToastrService,
    private authService: AuthService
    
  ) {}

ngOnInit(): void {
  this.productService.getProducts().subscribe({
    next: (res) => {
      this.products = res;
      this.filteredProducts = res;
      this.loadWishlist();
    }
  });
}

loadProducts() {
  this.productService.getProducts().subscribe({
    next: (res) => {
      console.log("API RESPONSE:", res); // 👈 IMPORTANT

      this.products = res;
      this.filteredProducts = res;
    },
    error: (err) => {
      console.log("API ERROR:", err);
    }
  });
}

loadWishlist() {
  const user = this.authService.getUser();

  if (!user?.id) return;

  this.wishlistService.getWishlist(user.id)
    .subscribe({

      next:(res: any[]) =>{
        this.wishlistItems = res;
        this.wishlistService.setWishlistCount(res.length);
      },
      error: (err:any)=>console.log(err)

    });
}

isWishlisted(productId: number): boolean {
  return this.wishlistItems.some(x=>x.ProductId === productId)
}

getWishlistId(productId: number): number{
  const item = this.wishlistItems.find(x => x.ProductId === productId);

  return item ? item.Id : 0;
}

//  addToCart(product: Product) {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const cartItem = {
//     userId: user.id,
//     productId: product.Id,
//     quantity: 1
//   };

//   this.cartService.addToCart(cartItem).subscribe();
// }


addToCart(product: Product) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const cartItem = {
    userId: user.id,
    productId: product.Id,
    quantity: 1
  };

  this.cartService.addToCart(cartItem).subscribe({
    next: (res) => {
      this.toastr.success('Product added to cart successfully!', 'Success');
    },
    error: (err) => {
      this.toastr.error('Failed to add product to cart', 'Error');
    }
  });
}
  filterProducts() {

  let result = [...this.products];

  // SEARCH
  if (this.searchText) {
    result = result.filter(p =>
      p.Name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // CATEGORY
  if (this.selectedCategory) {
    result = result.filter(p =>
      p.Category === this.selectedCategory
    );
  }

  // SORT
  if (this.sortOption === 'priceLow') {
    result.sort((a, b) => a.Price - b.Price);
  }

  if (this.sortOption === 'priceHigh') {
    result.sort((a, b) => b.Price - a.Price);
  }

  if (this.sortOption === 'name') {
    result.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  this.filteredProducts = result;
}


  toggleWishlist(product: Product) {

   const user = this.authService.getUser();

    if (!user.id){
      this.toastr.warning('Please login first.');
      return;
    }

    const existing = this.getWishlistId(product.Id);

    if(existing) {
      this.wishlistService.removeFromWishlist(existing).subscribe({
        next: () => {
          this.wishlistItems =this.wishlistItems.filter(
            x => x.Id !== existing
          );
          this.toastr.info('Removed from wishlist');
        },
        error:(err:any) => console.log(err)
      });
    }

    else{

      const payload = {
        userId: user.id,
        productId: product.Id,
        name: product.Name,
        category: product.Category,
        price: product.Price,
        imageUrl: product.ImageUrl
      };
  
      this.wishlistService.addToWishlist(payload).subscribe({
        next:()=>{
          this.toastr.success('Added to wishlist');
          this.loadWishlist();
        },
  
        error: (err)=> {
          console.log(err);
        }
      });
    }

  }

 

  
getImageUrl(path: string): string {
  if (!path) return '';

  return `http://shirkeash-001-site1.ltempurl.com${path}`;
}
  


}
  






  

