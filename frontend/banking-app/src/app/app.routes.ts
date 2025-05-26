import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { AdminTransactionComponent } from './admin-transaction/admin-transaction.component';
export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'}, //default route
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user-dashboard', component: UserDashboardComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'create-account', component: CreateAccountComponent},
    {path: 'create-user', component: CreateUserComponent},
    {path: 'view-users', component: ViewUsersComponent},
    {path: 'view-accounts', component: ViewAccountsComponent},
    {path: 'admin-card', component: AdminCardComponent},
    {path: 'admin-transaction', component: AdminTransactionComponent}
];
