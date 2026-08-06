import { Component, DoCheck } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {

  isLoggedIn: boolean=false;

  currentUser: any=null;


  cartCount: number = 0;

  wishlistCount: number = 0;

  userRole: string='';

  constructor(private cartService: CartService,
              private wishlistService: WishlistService,
              private authService:AuthService,
              private router:Router
  ) {}

ngOnInit(): void {

   this.authService.currentUser$.subscribe(user => {
    this.currentUser = user;
  
    const userId = user?.Id ?? user?.id;
  
   if (userId) {
       // Load Cart Count
       this.cartService.getCart(userId).subscribe(res => {
         this.cartCount = res.length;
       });
     
       // Load Wishlist Count
       this.loadWishlistCount(userId);
     
     } else {
     
       this.cartCount = 0;
       this.wishlistCount = 0;
     
     }
  });


  this.authService.isLoggedIn$.subscribe(status => {
    this.isLoggedIn = status;
  });


}

loadWishlistCount(userId: number){
  this.wishlistService.getWishlist(userId).subscribe({
    next:(res:any[])=>{
      this.wishlistCount =res.length;
    },
    error:(err)=>{
      console.log(err);
    }
  });
}

 logout() {

  this.authService.logout();

  this.cartCount = 0;
  this.wishlistCount = 0;

  this.router.navigate(['/auth/login']);

}

adminMenuOpen = false;

toggleAdminMenu() {
  this.adminMenuOpen = !this.adminMenuOpen;
}

isAdmin():boolean{

    return this.currentUser?.Role==="Admin";

}
}