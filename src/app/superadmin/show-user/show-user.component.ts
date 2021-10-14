import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Role} from "../../models/role";
import {HistoryQuizComponent} from "../../user/history-quiz/history-quiz.component";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'createTime', 'role', 'action'];
  currenUser: User = new User;
  users = [{
    id: '',
    username: '',
    name: '',
    role: '',
    createTime: '',
    password: '',
    token: '',
    updateTime: ''
  }];
  private history: HistoryQuizComponent
  userId: number;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currenUser = data;
    });
  }

  ngOnInit(): void {

    this.userService.getAllUser().subscribe(
      (data: any) => {
        this.users = data;
        console.log(this.users);
      }
    )
  }

  deleteUser(id: number) {
    if (confirm("Ban co muon xoa")) {
      this.userService.deleteUser(id).subscribe(
        (data: any) => {
          this.ngOnInit()
        })
    }
  }

  isSuperAdmin() {
    return this.currenUser?.role === Role.SUPER_ADMIN;
  }

  updateRole(username: string) {
    console.log(username)
    Swal.fire({
      title: 'Do you want to update the role?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.makeAdmin(username).subscribe(() => {
          Swal.fire({
            title: 'Save success',
            confirmButtonText: 'OK',
            icon: "success"
          }).then((e) => {
            window.location.reload();
          })
        }, error => {
          Swal.fire('Error', 'Have error , try again later', 'info')
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  updateRoleToUser(username: string) {
    console.log(username)
    Swal.fire({
      title: 'Do you want to update the role?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.makeUser(username).subscribe(() => {
          Swal.fire({
            title: 'Save success',
            confirmButtonText: 'OK',
            icon: "success"
          }).then((e) => {
            window.location.reload();
          })
        }, error => {
          Swal.fire('Error', 'Have error , try again later', 'info')
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  showHistory(userId: number): void {
    this.router.navigate(['/list/'+userId ]);
    console.log(userId);
  }

}
