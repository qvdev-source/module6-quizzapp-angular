import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ViewCategoriesComponent } from './admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './admin/delete-category/delete-category.component';
import { ViewQuizzComponent } from './admin/view-quizz/view-quizz.component';
import { AddQuizComponent } from './admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { EditQuizComponent } from './admin/edit-quiz/edit-quiz.component';
import { ViewQuizQuestionsComponent } from './admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { StartQuizComponent } from './user/start-quiz/start-quiz.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxUiLoaderHttpModule, NgxUiLoaderModule} from "ngx-ui-loader";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    SidebarComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    ViewQuizzComponent,
    AddQuizComponent,
    EditQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    StartQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    FontAwesomeModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
