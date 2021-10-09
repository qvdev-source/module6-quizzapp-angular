import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService : CategoryService,
    private snack : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if (this.category.title.trim()=='' || this.category.title == null){
      this.snack.open("Title Required !!",'',{
        duration:3000
      })
      return;
    }

    // @ts-ignore
    this.categoryService.saveCategory(this.category).subscribe(data=>{
      this.category.title='';
      this.category.description='';
      Swal.fire('Success !!','Category is added successfully','success');
    },error => {
      Swal.fire('Error !!','server error !!','error')
    })
  }

}
