import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { RosterViewComponent } from './components/roster-view/roster-view.component';

const routes: Routes = [
  { path: 'roster', component: RosterViewComponent },
  { path: 'home-screen', component: HomeScreenComponent },
  { path:'', redirectTo:'home-screen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
