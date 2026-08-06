import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm!: FormGroup;
  productId!: number;

  imageBase64: string = '';
  imagePreview: string = '';

  products: any[] = [];

 selectedFile: File | null = null;

  

  constructor(
   private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  

  ngOnInit(): void {

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productForm = this.fb.group({
      Name: [''],
      Price: [''],
      Category: [''],
      Description: [''],
      Stock: [0],
      IsActive: [true],
      ImageUrl: ['']
    });

    this.loadProduct();

  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}



  loadProduct() {

    this.productService.getProductById(this.productId).subscribe({

      next: (res: any) => {

        this.productForm.patchValue(res);

      }

    });

  }

  updateProduct() {

  const formData = new FormData();

  formData.append('Name', this.productForm.get('Name')?.value);
  formData.append('Price', this.productForm.get('Price')?.value);
  formData.append('Category', this.productForm.get('Category')?.value);
  formData.append('Description', this.productForm.get('Description')?.value);
  formData.append('Stock', this.productForm.get('Stock')?.value);
  formData.append('IsActive', this.productForm.get('IsActive')?.value);

  // IMPORTANT: only send new image if selected
  if (this.selectedFile) {
    formData.append('Image', this.selectedFile);
  }

  this.productService.updateProduct(this.productId, formData)
    .subscribe({

      next: () => {
        this.toastr.success('Product updated successfully');
        this.router.navigate(['/admin/products']);
      },

      error: () => {
        this.toastr.error('Update failed');
      }

    });
}

}
