import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './page/home/index.component';
import { MainAtividadeComponent } from './page/tela_da_adicionar/main-atividade.component';
import { TelaFiltroComponent } from './page/tela-filtro/tela-filtro.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'home', component: MainAtividadeComponent },
  {path:'pagamento',component:TelaFiltroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
