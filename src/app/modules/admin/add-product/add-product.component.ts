import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  imageBase64: string = '';

  imagePreview: string | null = null;

  productForm!: FormGroup;

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.productForm = this.fb.group({

      name: ['', Validators.required, Validators.minLength(3), Validators.maxLength(100)],

      price: ['', Validators.required, Validators.min(1)],

      category: ['', Validators.required],

      description: ['', Validators.required, Validators.minLength(10)],

      stock: ['', Validators.required, Validators.min(1)],

      Image: ['', Validators.required]

    });

  }

    isLoading: boolean = false;

submitProduct() {

  if (this.productForm.invalid) {
   
    this.productForm.markAllAsTouched();

    this.toastr.warning(
      'Please fill all required fields correctly.',
      'Validation'
    );

    return;
  }

  if (!this.selectedFile) {
    this.toastr.error('Please select an image');
    return;
  }

  this.isLoading = true;

  const formData = new FormData();

  formData.append('Name', this.productForm.value.name);
  formData.append('Price', this.productForm.value.price);
  formData.append('Category', this.productForm.value.category);
  formData.append('Description', this.productForm.value.description);
  formData.append('Stock', this.productForm.value.stock);

  formData.append('Image', this.selectedFile);

  this.productService.addProduct(formData).subscribe({
    next: (res) => {

      this.toastr.success('Product added successfully');

      // reset form
      this.productForm.reset();
      this.selectedFile = null;
      this.imagePreview = null;

      this.fileInput.nativeElement.value = '';


      // reset loading
      this.isLoading = false;
    },

    error: (err) => {
      console.error(err);
      this.toastr.error('Error saving product');

      this.isLoading = false;
    }
  });
}

    onFileSelected(event: any) {
  
    const file = event.target.files[0];
  
    if (!file){
      return;
    } 

    //Allow only image files
    if(!file.type.startsWith('image/')){
      this.toastr.error(
        'Please select a valid image file.',
        'Invalid File'
      );
      return;
    }
  
    this.selectedFile = file;

    //Update FromControl
    this.productForm.patchValue({
      image: file
    });

    this.productForm.get('image')?.updateValueAndValidity();

    // optional preview only
    const reader = new FileReader();
  
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  
    reader.readAsDataURL(file);
  }
}