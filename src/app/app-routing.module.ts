import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'dashboard', component: PagesComponent,
    children: [
      { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
      { path: 'usuario', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
      { path: 'preguntas', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
