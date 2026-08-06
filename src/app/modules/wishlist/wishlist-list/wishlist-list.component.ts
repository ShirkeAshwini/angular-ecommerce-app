import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {

  wishlistItems: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(){
    const user = this.authService.getUser();

    if(!user?.id){
      this.toastr.warning('Please login first');
      return;
    }

    this.wishlistService.getWishlist(user.id).subscribe({
      next:(res: any[]) => {
        this.wishlistItems = res;
        console.log('Wishlist Data:', res);
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  getImageUrl(path: string): string {
    if (!path) return 'https://via.placeholder.com/150?text=No+Image';

    return `https://localhost:44387${path}`;
  }

  removeFromWishlist(id: number) {
  this.wishlistService.removeFromWishlist(id).subscribe({

    next: () => {

      this.wishlistItems = this.wishlistItems.filter(x=>x.Id!==id);

      this.toastr.info('Removed from wishlist');
    },

    error:(err:any)=>{
      console.log('Delete error:', err);
    }
  });
}

}