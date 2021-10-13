import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { VoteComponent } from "./vote/vote.component";
import { ResultsComponent } from "./results/results.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
      path: 'vote',
      component: VoteComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
      path: 'event/:idEvent/:eventName',
      component: VoteComponent
    },
  {
    path: 'results/:idEvent/:eventName',
    component: ResultsComponent
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
