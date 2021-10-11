import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role";
import {AdminComponent} from "./admin/admin/admin.component";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {UnauthorizedComponent} from "./error/unauthorized/unauthorized.component";
import {ViewCategoriesComponent} from "./admin/view-categories/view-categories.component";
import {AddCategoryComponent} from "./admin/add-category/add-category.component";
import {DeleteCategoryComponent} from "./admin/delete-category/delete-category.component";
import {ViewQuizzComponent} from "./admin/view-quizz/view-quizz.component";
import {AddQuizComponent} from "./admin/add-quiz/add-quiz.component";
import {EditQuizComponent} from "./admin/edit-quiz/edit-quiz.component";
import {ViewQuizQuestionsComponent} from "./admin/view-quiz-questions/view-quiz-questions.component";
import {AddQuestionComponent} from "./admin/add-question/add-question.component";
import {StartQuizComponent} from "./user/start-quiz/start-quiz.component";
import {ProfileComponent} from "./user/profile/profile.component";
<<<<<<< Updated upstream
=======
import {EditCategoryComponent} from "./admin/edit-category/edit-category.component";
import {ChatComponent} from "./admin/chat/chat.component";
>>>>>>> Stashed changes

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SignupComponent},

  { path: 'profile',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'user-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.USER]}
  },

  { path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN,Role.USER]},
  },

  {
    path: 'categories',
    component: ViewCategoriesComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN,Role.USER]},
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]},
  },
  {
    path: 'delete-category/:cid',
    component: DeleteCategoryComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]},
  },

  {
    path: 'quiz',
    component: ViewQuizzComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN,Role.USER]},
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN, Role.USER]},
  },
  {
    path: 'add-quiz',
    component: AddQuizComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]},
  },
  {
    path: 'edit-quiz/:qid',
    component: EditQuizComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]},
  },

  {
    path: 'start-quiz/:qid',
    component: StartQuizComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER,Role.ADMIN]},
  },

  {
    path: 'view-questions/:qid/:title',
    component: ViewQuizQuestionsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN,Role.USER]},
  },
  {
    path: 'add-question/:qid/:title',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]},
  },



  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnauthorizedComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
