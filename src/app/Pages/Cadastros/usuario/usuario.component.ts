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
  modoEdicao: boolean = true;

  listaPerfil: PerfilModel[] = [];
  listaUsuario: UsuarioTbModel[] = [];
  objUsuario: UsuarioTbModel = {
    usuCod: 0,
    usuNome: '',
    usuLogin: '',
    usuSenha: '',
    usuStatus: true,
    perfCod: 0
  };
  confirmaSenha: string = '';
  boolLoginValido: boolean = false;
  boolConfirmaSenha: boolean = true;
  boolAlterarSenha: boolean = false;

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

    NovoRegistro() {
      this.objUsuario = {
        usuCod: 0,
        usuNome: '',
        usuLogin: '',
        usuSenha: '',
        usuStatus: true,
        perfCod: 0
      };
      this.modoEdicao = true;
    }

    IniciaEdicao(objUsr: UsuarioTbModel) {
      this.objUsuario.usuCod = objUsr.usuCod;
      this.objUsuario.usuNome = objUsr.usuNome;
      this.objUsuario.usuLogin = objUsr.usuLogin;
      this.objUsuario.usuSenha = objUsr.usuSenha;
      this.objUsuario.usuStatus = objUsr.usuStatus;
      this.objUsuario.perfCod = objUsr.perfCod;

      this.modoEdicao = true;
    }

    AlteraStatusUsuario(objUsr: UsuarioTbModel) {
      this.boolLoading = true;
      this.http.AlteraStatusUsuario(objUsr.usuCod, objUsr.usuStatus).subscribe((response: string) => {
        if (response) {
          this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Usuário '+ (objUsr.usuStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error) });
        this.listaUsuario = [];
        this.ListaPerfil(0);
      });
    }

    Cancelar() {
      this.objUsuario = {
        usuCod: 0,
        usuNome: '',
        usuLogin: '',
        usuSenha: '',
        usuStatus: true,
        perfCod: 0
      };
      this.confirmaSenha = '';
      this.boolAlterarSenha = false;
      this.boolLoginValido = false;
      this.modoEdicao = false;
    }

    Salvar() {
      // this.boolLoading = true;
      if (this.ValidaInformacoes(this.objUsuario))
      {
        console.log(this.objUsuario);
        // this.http.ManterMaquina(this.objMaquina).subscribe((response: string) => {
        //   if (response) {
        //     this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Máquina '+ (this.objMaquina.maqCod > 0 ? 'alterada' : 'inserida') + ' com sucesso!'});
        //     setTimeout(() => {
        //       this.listaMaquina = [];
        //       this.ListaDiametroFuro(0);
        //     }, 2000);
        //   }
        //   this.boolLoading = false;
        // }, error => {
        //   this.msgs = [];
        //   this.boolLoading = false;
        //   this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
        // });
      }
    }

    ValidaSenha() {
      if (this.confirmaSenha !== this.objUsuario.usuSenha) {
        this.boolConfirmaSenha = false;
      } else {
        this.boolConfirmaSenha = true;
      }
    }

    ValidaInformacoes(objUsr: UsuarioTbModel) {
      if (objUsr.usuNome.length > 0) {
        if (objUsr.usuLogin.length > 0 && !this.boolLoginValido) {
          if (objUsr.perfCod > 0) {
            if (objUsr.usuSenha === this.confirmaSenha) {
              return true;
            } else {
              this.boolLoading = false;
              this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Verifique a senha!' });
              return false;
            }
          } else {
            this.boolLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um perfil!' });
            return false;
          }
        } else {
          this.boolLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um login válido!' });
          return false;
        }
      } else {
        this.boolLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um nome!' });
        return false;
      }
  }

  VerificaLogin(usuLogin: string) {
    // this.boolLoading = true;
    this.http.VerificaLogin(usuLogin).subscribe((response: boolean) => {
      // this.boolLoading = false;
      console.log(response);
      this.boolLoginValido = response;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error) });
    });
  }
  }
