import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

// Material UI Imports
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuizQuestionComponent } from './pages/admin/add-quiz-question/add-quiz-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { LoadQuizzesComponent } from './pages/user/load-quizzes/load-quizzes.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

// Interceptors
import { AuthInterceptor } from './auth.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    AdminHomeComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    ConfirmDialogComponent,
    UpdateQuizComponent,
    ViewQuizQuestionComponent,
    AddQuizQuestionComponent,
    UpdateQuestionComponent,
    UserSidebarComponent,
    LoadQuizzesComponent,
    InstructionsComponent,
    StartQuizComponent,
    UpdateCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,

    // Material Modules
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
