import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  searchText: string = '';
  


  isLoading: boolean = true;

  get filteredProducts() {

  return this.products.filter((product: any) =>

    product.Name?.toLowerCase()
      .includes(this.searchText.toLowerCase())

    ||

    product.Category?.toLowerCase()
      .includes(this.searchText.toLowerCase())

  );

}
  
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
  this.productService.getProducts().subscribe({
    next: (res: any) => {
      console.log("API RESPONSE:", res); // IMPORTANT
      this.products = res;

      this.isLoading = false;
    },
    error: (err) => { 
      console.log("ERROR:", err);
    }
  });
}

 deleteProduct(id: number) {

  Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be deleted permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, Delete'
  }).then((result) => {

    if (result.isConfirmed) {

      this.productService.deleteProduct(id).subscribe({

        next: () => {

          this.toastr.success('Product deleted successfully');

          this.loadProducts();

        },

        error: () => {

          this.toastr.error('Delete failed');

        }

      });

    }

  });

}

getImageUrl(path: string): string {
  if (!path) return 'assets/no-image.png';
  return `https://shirkeash-001-site1.ltempurl.com${path}`;
}

setDefaultImage(event: any) {
  event.target.src = 'assets/no-image.png';
}

}
