import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category";
import Swal from "sweetalert2";
import {environment} from "../../../environments/environment";
const API_URL = `${environment}/api/category/`
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  cid!: number;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.cid = parseInt(<string>paramMap.get('cid'));
      this.getCategory(this.cid);
    });
  }

  ngOnInit(): void {
  }


  getCategory(cid: number) {
    this.http.get<Category>(`${API_URL}${cid}`).subscribe((data) => {
      this.categoryForm = new FormGroup({
        title: new FormControl(data.title),
        cid: new FormControl(data.cid),
        description: new FormControl(data.description),
      });
    })
  }

  saveCategory() {
    this.http.put<Category>(`${API_URL}${this.cid}`, this.categoryForm.value).subscribe((data) => {
      Swal.fire('Success !!','quiz updated','success');
      this.router.navigate(['/categories']);
    },error => {
      Swal.fire('Error !!','quiz error','error');
    })
  }
}
