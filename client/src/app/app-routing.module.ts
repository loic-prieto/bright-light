import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RosterViewComponent } from './components/roster-view/roster-view.component';

const routes: Routes = [
  { path: 'roster', component: RosterViewComponent },
  { path:'', redirectTo:'roster', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
