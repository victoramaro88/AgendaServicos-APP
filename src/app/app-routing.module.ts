import { EquipeComponent } from './Pages/Cadastros/equipe/equipe.component';
import { DiametroComponent } from './Pages/Cadastros/diametro/diametro.component';
import { VeiculoComponent } from './Pages/Cadastros/veiculo/veiculo.component';
import { MaquinaComponent } from './Pages/Cadastros/maquina/maquina.component';
import { UsuarioComponent } from './Pages/Cadastros/usuario/usuario.component';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { ItemChecklistComponent } from './Pages/Cadastros/Checklist/item-checklist/item-checklist.component';
import { ChecklistComponent } from './Pages/Cadastros/Checklist/checklist/checklist.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'maquina', component: MaquinaComponent },
  { path: 'veiculo', component: VeiculoComponent },
  { path: 'diametro', component: DiametroComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'itemCheckList', component: ItemChecklistComponent },
  { path: 'checklist', component: ChecklistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
