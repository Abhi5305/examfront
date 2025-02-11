import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { AddQuizQuestionComponent } from './pages/admin/add-quiz-question/add-quiz-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { LoadQuizzesComponent } from './pages/user/load-quizzes/load-quizzes.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path : 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path : 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children:[
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoryComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:id',
        component: UpdateQuizComponent,
      },
      {
        path: 'questions/quiz/:id/:title',
        component: ViewQuizQuestionComponent,
      },
      {
        path: 'add-questions/quiz/:id/:title',
        component: AddQuizQuestionComponent,
      },
      {
        path: 'update-question/quiz/:id',
        component: UpdateQuestionComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
    children: [
      {
        path: ':id',
        component: LoadQuizzesComponent,
      },
      {
        path: 'instruction/:id',
        component: InstructionsComponent,
      },
    ]
  },
  {
    path: 'start/:id',
    component: StartQuizComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  { path: '**', redirectTo: '',
    pathMatch: 'full',
  }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
