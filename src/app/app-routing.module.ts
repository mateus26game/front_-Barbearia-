import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { MainAtividadeComponent } from './components/main-atividade/main-atividade.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: MainAtividadeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
