import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AparelhoNavegacaoModel } from 'src/app/Models/AparelhoNavegacao.Model';
import { EquipeModel } from 'src/app/Models/Equipe.Model';
import { EquipeUsuarioModel } from 'src/app/Models/EquipeUsuario.Model';
import { MaquinaModel } from 'src/app/Models/Maquina.Model';
import { UsuarioEnvioModel } from 'src/app/Models/UsuarioEnvio.Model';
import { UsuarioTbModel } from 'src/app/Models/UsuarioTb.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
  providers: [MessageService]
})
export class EquipeComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;

  listaApNav: AparelhoNavegacaoModel[] = [];
  listaApNavDisponiveis: AparelhoNavegacaoModel[] = [];
  listaMaquina: MaquinaModel[] = [];
  listaMaquinaDisponiveis: MaquinaModel[] = [];
  listaEquipe: EquipeModel[] = [];
  objEquipe: EquipeModel = {
    equipCod: 0,
    equipDesc: 'string',
    equipStatus: true,
    apNavCod: 0,
    maqCod: 0
  };
  listaEquipeUsuario: EquipeUsuarioModel[] = [];
  listaUsuarioTb: UsuarioTbModel[] = [];
  listaUsuarioTbSelecionados: UsuarioTbModel[] = [];
  listaUsuariosDisponiveis: UsuarioTbModel[] = [];

  objEnvio: UsuarioEnvioModel = {
    objEnvioEquipe: {
      equipCod: 0,
      equipDesc: '',
      equipStatus: true,
      apNavCod: 0,
      maqCod: 0
    },
    objEnvioListaUsuario: []
  }

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
    this.ListaAparelhoNavegacao(0);
  }

  ListaAparelhoNavegacao(apNavCod: number) {
    this.boolLoading = true;
    this.modoEdicao = false;
    this.http.ListaAparelhoNavegacao(apNavCod).subscribe((response: AparelhoNavegacaoModel[]) => {
      if (response) {
        for (const itmApNv of response) {
          let objApNv: AparelhoNavegacaoModel = {
            apNavCod: itmApNv.apNavCod,
            apNavMarcMod: itmApNv.apNavMarcMod,
            apNavObse: itmApNv.apNavObse,
            apNavStatus: itmApNv.apNavStatus
          }
          this.listaApNav.push(objApNv);
        }
        this.ListaMaquina(0);
      }
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaEquipe(equipCod: number) {
    this.boolLoading = true;
    this.modoEdicao = false;
    this.http.ListaEquipe(equipCod).subscribe((response: EquipeModel[]) => {
      if (response) {
        this.listaEquipe = response;
        this.ListaUsuario(0);
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaMaquina(maqCod: number) {
    this.boolLoading = true;
    this.http.ListaMaquina(maqCod).subscribe((response: MaquinaModel[]) => {
      if (response) {
        for (const itmMaq of response) {
          let objResp: MaquinaModel = {
            maqCod: itmMaq.maqCod,
            maqMarca: itmMaq.maqMarca + ' / ' + itmMaq.maqModelo,
            maqModelo: itmMaq.maqModelo,
            maqObse: itmMaq.maqObse,
            maqStatus: itmMaq.maqStatus,
            diamCod: itmMaq.diamCod,
            veicCod: itmMaq.veicCod
          };
          this.listaMaquina.push(objResp);
        }
      }
      this.boolLoading = false;
      this.ListaEquipe(0);
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaUsuario(usuCod: number) {
    this.boolLoading = true;
    this.listaUsuarioTb = [];
    this.http.ListaUsuario(usuCod).subscribe((response: UsuarioTbModel[]) => {
      if (response) {
        for (const itmUsr of response) {
          let objResp: UsuarioTbModel = {
            usuCod: itmUsr.usuCod,
            usuNome: !itmUsr.usuStatus ? '(INATIVO) ' + itmUsr.usuNome : itmUsr.usuNome,
            usuLogin: itmUsr.usuLogin,
            usuSenha: itmUsr.usuSenha,
            usuStatus: itmUsr.usuStatus,
            perfCod: itmUsr.perfCod
          };
          this.listaUsuarioTb.push(objResp);
        }
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaUsuariosDisponiveis() {
    this.boolLoading = true;
    this.listaUsuarioTb = [];
    this.http.ListaUsuariosDisponiveis().subscribe((response: UsuarioTbModel[]) => {
      if (response) {
        for (const itmUsr of response) {
          let objResp: UsuarioTbModel = {
            usuCod: itmUsr.usuCod,
            usuNome: itmUsr.usuNome,
            usuLogin: itmUsr.usuLogin,
            usuSenha: itmUsr.usuSenha,
            usuStatus: itmUsr.usuStatus,
            perfCod: itmUsr.perfCod
          };
          this.listaUsuariosDisponiveis.push(objResp);
          this.listaUsuarioTb.push(objResp);
        }
        console.log(this.listaUsuariosDisponiveis);
        console.log(this.listaUsuarioTb);
        this.NovoRegistro();
      }
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  IniciaEdicao(objEquipe: EquipeModel) {
    this.boolLoading = true;
    this.listaEquipeUsuario = [];
    this.http.ListaEquipeUsuario(objEquipe.equipCod).subscribe((response: EquipeUsuarioModel[]) => {
      if (response) {
        for (const itmEqUs of response) {
          let objResp: EquipeUsuarioModel = {
            equipCod: itmEqUs.equipCod,
            equipDesc: itmEqUs.equipDesc,
            equipStatus: itmEqUs.equipStatus,
            usuCod: itmEqUs.usuCod,
            usuNome: itmEqUs.usuNome,
            usuStatus: itmEqUs.usuStatus,
            perfCod: itmEqUs.perfCod,
            perfDesc: itmEqUs.perfDesc
          };
          this.listaEquipeUsuario.push(objResp);
        }
        this.PreencheInfosEdicao(objEquipe);
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  SelecionaMaquina(maqCod: number) {
    let maquina = this.listaMaquina.find(v => v.veicCod === maqCod);
    return maquina ? maquina.maqMarca : '';
  }

  SelecionaApNaveg(apNavCod: number) {
    let apNav = this.listaApNav.find(v => v.apNavCod === apNavCod);
    return apNav ? apNav.apNavMarcMod : '';
  }

  AlteraStatus(objEquipe: EquipeModel) {
    this.boolLoading = true;
    this.http.AlteraStatusEquipe(objEquipe.equipCod, objEquipe.equipStatus).subscribe((response: string) => {
      if (response) {
        this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Equipe '+ (objEquipe.equipStatus ? 'ativada' : 'inativada') + ' com sucesso!'});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error) });
      this.listaEquipe = [];
      this.ListaAparelhoNavegacao(0);
    });
  }

  NovoRegistro() {
    this.listaMaquinaDisponiveis = [];
    this.listaApNavDisponiveis = [];
    for (const itemMaq of this.listaMaquina) {
      this.listaMaquinaDisponiveis.push(itemMaq);
    }
    for (const itmEqu of this.listaEquipe) {
      for (const itmMaqu of this.listaMaquinaDisponiveis) {
        if (itmEqu.maqCod === itmMaqu.maqCod) {
          let itmExc = this.listaMaquinaDisponiveis.findIndex(m => m.maqCod === itmEqu.maqCod);
          this.listaMaquinaDisponiveis.splice(itmExc,1);
        }
      }
    }

    for (const itemApNav of this.listaApNav) {
      this.listaApNavDisponiveis.push(itemApNav);
    }
    for (const itmEqu of this.listaEquipe) {
      for (const itmapNav of this.listaApNavDisponiveis) {
        if (itmEqu.apNavCod === itmapNav.apNavCod) {
          let itmExc = this.listaApNavDisponiveis.findIndex(a => a.apNavCod === itmEqu.apNavCod);
          this.listaApNavDisponiveis.splice(itmExc,1);
        }
      }
    }

    this.objEquipe = {
      equipCod: 0,
      equipDesc: '',
      equipStatus: true,
      apNavCod: 0,
      maqCod: 0
    };

    this.modoEdicao = true;
    this.boolLoading = false;
  }

  PreencheInfosEdicao(objEquipe: EquipeModel) {
    this.listaMaquinaDisponiveis = [];
    this.listaApNavDisponiveis = [];

    //-> Inserindo Usuários já selecionados, e removendo da lista inicial
    for (const itmUsrEqu of this.listaEquipeUsuario) {
      for (const itmUsr of this.listaUsuarioTb) {
        if(itmUsrEqu.usuCod === itmUsr.usuCod) {
          this.listaUsuarioTbSelecionados.push(itmUsr);
          let itmExc = this.listaUsuarioTb.findIndex(u => u.usuCod === itmUsrEqu.usuCod);
          this.listaUsuarioTb.splice(itmExc,1);
        }
      }
    }

    for (const itemMaq of this.listaMaquina) {
      this.listaMaquinaDisponiveis.push(itemMaq);
    }
    for (const itmEqu of this.listaEquipe) {
      for (const itmMaq of this.listaMaquinaDisponiveis) {
        if (itmEqu.maqCod === itmMaq.maqCod && itmEqu.equipCod !== objEquipe.equipCod) {
          let itmExc = this.listaMaquinaDisponiveis.findIndex(v => v.maqCod === itmMaq.maqCod);
          this.listaMaquinaDisponiveis.splice(itmExc,1);
        }
      }
    }

    for (const itemApNav of this.listaApNav) {
      this.listaApNavDisponiveis.push(itemApNav);
    }
    for (const itmEqu of this.listaEquipe) {
      for (const itmapNav of this.listaApNavDisponiveis) {
        if (itmEqu.apNavCod === itmapNav.apNavCod && itmEqu.equipCod !== objEquipe.equipCod) {
          let itmExc = this.listaApNavDisponiveis.findIndex(a => a.apNavCod === itmEqu.apNavCod);
          this.listaApNavDisponiveis.splice(itmExc,1);
        }
      }
    }

    this.objEquipe.equipCod = objEquipe.equipCod;
    this.objEquipe.equipDesc = objEquipe.equipDesc;
    this.objEquipe.equipStatus = objEquipe.equipStatus;
    this.objEquipe.apNavCod = objEquipe.apNavCod;
    this.objEquipe.maqCod = objEquipe.maqCod;

    this.modoEdicao = true;
  }

  Cancelar() {
    this.listaMaquina = [];
    this.listaApNav = [];
    this.listaMaquinaDisponiveis = [];
    this.listaApNavDisponiveis = [];
    this.listaUsuarioTbSelecionados = [];

    this.objEquipe = {
      equipCod: 0,
      equipDesc: '',
      equipStatus: true,
      apNavCod: 0,
      maqCod: 0
    };
    this.modoEdicao = false;
    this.ListaAparelhoNavegacao(0);
  }

  Salvar() {
    console.log(this.objEquipe);
    console.log(this.listaUsuarioTbSelecionados);

    this.objEnvio.objEnvioEquipe = this.objEquipe;
    this.objEnvio.objEnvioListaUsuario = this.listaUsuarioTbSelecionados;
    console.log(this.objEnvio);
  }

}
