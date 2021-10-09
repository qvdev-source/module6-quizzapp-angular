import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private delService: CategoryService) { }

  cid!: number;
  category:[];
  ngOnInit(): void {
    this.cid = this.activatedRoute.snapshot.params.cid;
    // alert(this.id);
    // @ts-ignore
    this.delService.getCategory(this.cid).subscribe(
      (data:any) => {
        this.category = data;
      }
    )
  }
  deleteCate(cid:any){
    if (window.confirm(

    ))

    this.delService.deleteCategory(this.cid).subscribe(
      (data:any)=>{
        Swal.fire("Success","Category deleted","success")
        this.router.navigate(["/category"])
      }, (error:any) =>{
        Swal.fire("Error"," Error deleting Category","error")
      }
    );

  }

}
