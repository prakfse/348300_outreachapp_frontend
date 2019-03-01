import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SigninComponent } from 'src/app/user/signin/signin.component';
import { UserprofileComponent } from 'src/app/userprofile/userprofile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserListComponent } from 'src/app/user-list/user-list.component';

const routes: Routes = [
    { path: 'signup', component: UserComponent, data: {title: 'User'} ,
     children: [{ path: '', component: SignUpComponent, data: {title: 'Sign Up'} }]},
     { path: 'signin', component: UserComponent, data: {title: 'User'} ,
     children: [{ path: '', component: SigninComponent, data: {title: 'Sign In'} }]},
     { path: 'userprofile', component: UserprofileComponent, data: {title: 'User Profile'}, canActivate: [AuthGuard] },
     { path: 'registration', component: RegistrationComponent, data: {title: 'Event Registration'} },
     { path: 'userlist', component: UserListComponent, data: {title: 'Event Registration'} },
     { path: '', component: SigninComponent, pathMatch: 'full',data: {title: 'User'} },
];

export const routing = RouterModule.forRoot(routes);