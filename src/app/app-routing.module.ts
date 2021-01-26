import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {RestComponent} from './layout/rest/rest.component';
import {UpdateCommand} from '@angular/cli/commands/update-impl';
import {UpdateComponent} from './layout/update/update.component';
import {CreateComponent} from './layout/create/create.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login List',
    },
  },
  {
    path: 'layout',
    component: LayoutComponent,
    data: {
      title: 'Layout Edit'
    },
    children: [
      {
        path: 'update/:id',
        component: UpdateComponent,
      },
      {
        path: 'list',
        component: RestComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
