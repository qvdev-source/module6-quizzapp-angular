import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Category} from "../../models/category";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [null, Validators.maxLength(5000)]
    })
  }

  get title(): AbstractControl {
    return this.categoryForm.get('title');
  }

  get description(): AbstractControl {
    return this.categoryForm.get('description');
  }

  formSubmit(category: Category): void {
    if (this.categoryForm.invalid) {
      this.snack.open("All fields is required !!", '', {
        duration: 3000
      });
    } else {
      this.categoryService.saveCategory(category).subscribe(() => {
        this.categoryForm.reset();
        Swal.fire('Success !!', 'Category is added successfully', 'success');
      }, () => {
        Swal.fire('Error !!', 'server error !!', 'error');
      });
      this.router.navigate(['/categories']);
    }
  }

}
