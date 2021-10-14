import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import Swal from 'sweetalert2'
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {Role} from "../../models/role";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

const API_URL = `${environment}/api/category/find/`

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  currenUser: User = new User;

  categories : Array<Category>=[];
  searchText: any;

  constructor(private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
  }


  ngOnInit(): void {

    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });

    this.categoryService.getAllCategory().subscribe(data => {

      this.categories = data;
      console.log(this.categories)
    }, error => {
      console.log(error);
      Swal.fire("Error!!", "Error loading data!!", "error");
    })
  }

  isAdmin() {
    return this.currenUser?.role === Role.ADMIN;
  }

  deleteCategory(cid: any) {

    Swal.fire({
      icon: "info",
      title: " Are you sure ?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(cid).subscribe(data => {
          this.categories = this.categories.filter(cate => cate.cid != cid);
          Swal.fire('Success', 'Category Deleted', 'success');

        }, error => {
          Swal.fire('Error', 'Error in deleteing category', 'error')
        })
      }
    })

  }

  title: string;

  private getTitle() {

    this.http.get<Category>(`http://localhost:8080/api/category/find/${this.title}`).subscribe(title => {
      // @ts-ignore
       this.categories = title;
    });
  }

  searchCategory() {
    this.getTitle();
  }
}
