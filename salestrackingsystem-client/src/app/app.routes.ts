import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UserListComponent } from './components/user-list/user-list/user-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'main', component: MainComponent},
    { path: 'admin-panel', component: AdminPanelComponent,children:[
        { path: 'user-list', component: UserListComponent},
    ]}
  

];
