import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PerfilModel } from 'src/app/Models/Perfil.Model';
import { UsuarioTbModel } from 'src/app/Models/UsuarioTb.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService]
})
export class UsuarioComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;

  listaPerfil: PerfilModel[] = [];
  listaUsuario: UsuarioTbModel[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService,
    private errosHttp: MsgErroHttp
  ) {
    this.opcoesStatus = [
      { label: "Inativo", value: false },
      { label: "Ativo", value: true }
    ];
  }

  ngOnInit(): void {
    this.ListaPerfil(0);
  }

  ListaPerfil(perfCod: number) {
    this.boolLoading = true;
    this.http.ListaPerfil(perfCod).subscribe((response: PerfilModel[]) => {
      if (response) {
        this.listaPerfil = response;
      }
      this.ListaUsuario(0);
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaUsuario(usuCod: number) {
    this.boolLoading = true;
    this.http.ListaUsuario(usuCod).subscribe((response: UsuarioTbModel[]) => {
      if (response) {
        this.listaUsuario = response;
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  SelecionaPerfil(perfCod: number) {
    let perfil = this.listaPerfil.find(p => p.perfCod === perfCod); //-> PAREI AQUI!!!!
    return perfil ? perfil.perfDesc : '';
  }

}
