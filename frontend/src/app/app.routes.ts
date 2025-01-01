import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { AuthGuard } from './service/auth.guard';

export const routes: Route[] = [
 { path: '', component: HomeComponent },  // Stock Visualize Component route
 { path: 'login', component: LoginComponent },  // Stock Visualize Component route
 { path: 'register', component: RegisterComponent },  // Stock Visualize Component route
 { path: 'prediction', component: PredictionComponent, canActivate: [AuthGuard] },  // Stock Visualize Component route
];
