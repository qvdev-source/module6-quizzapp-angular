import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../models/category";
import Swal from "sweetalert2";
import {User} from "../../models/user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  id!: number;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
      this.getUser(this.id);
    });
  }

  ngOnInit(): void {
  }

  getUser(id: number | undefined) {
    this.http.get<User>(`http://localhost:8080/api/authentication/${id}`).subscribe((data) => {
      this.userForm = new FormGroup({
        name: new FormControl(data.name),
        id: new FormControl(data.id),
        password: new FormControl(data.password),
        username: new FormControl(data.username),
        role: new FormControl(data.role),
      });


      console.log(data.name);
      console.log(data.id);
    })
  }

  saveUser() {
    this.http.put<User>(`http://localhost:8080/api/authentication/${this.id}`, this.userForm.value).subscribe((data) => {
      Swal.fire('Success !!', 'quiz updated', 'success');
    }, error => {
      Swal.fire('Error !!', 'edit error', 'error');
    })
    this.router.navigate(['/user-profile']);
  }

}
