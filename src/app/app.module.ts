import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { PasswordModule } from 'primeng/password';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Pages/home/home.component';
import { MenuComponent } from './Pages/menu/menu.component';
import { UsuarioComponent } from './Pages/Cadastros/usuario/usuario.component';
import { MaquinaComponent } from './Pages/Cadastros/maquina/maquina.component';
import { VeiculoComponent } from './Pages/Cadastros/veiculo/veiculo.component';
import { DiametroComponent } from './Pages/Cadastros/diametro/diametro.component';
import { EquipeComponent } from './Pages/Cadastros/equipe/equipe.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    UsuarioComponent,
    MaquinaComponent,
    VeiculoComponent,
    DiametroComponent,
    EquipeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    NgxMaskModule.forRoot(),

    CheckboxModule,
    InputTextModule,
    ButtonModule,
    BlockUIModule,
    ToastModule,
    ProgressBarModule,
    MenubarModule,
    TableModule,
    TagModule,
    TooltipModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    PickListModule,
    PasswordModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
