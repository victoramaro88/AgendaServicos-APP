import { DiametroComponent } from './Pages/Cadastros/diametro/diametro.component';
import { VeiculoComponent } from './Pages/Cadastros/veiculo/veiculo.component';
import { MaquinaComponent } from './Pages/Cadastros/maquina/maquina.component';
import { UsuarioComponent } from './Pages/Cadastros/usuario/usuario.component';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'maquina', component: MaquinaComponent },
  { path: 'veiculo', component: VeiculoComponent },
  { path: 'diametro', component: DiametroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
