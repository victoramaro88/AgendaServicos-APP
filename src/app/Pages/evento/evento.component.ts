import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CidadeModel } from 'src/app/Models/Cidade.Model';
import { DiametroFuroModel } from 'src/app/Models/DiametroFuro.Model';
import { EstadoModel } from 'src/app/Models/Estado.Model';
import { EventoModel } from 'src/app/Models/Evento.Model';
import { HorarioModel } from 'src/app/Models/Horario.Model';
import { MaquinaModel } from 'src/app/Models/Maquina.Model';
import { UsuarioTbModel } from 'src/app/Models/UsuarioTb.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
  providers: [MessageService]
})
export class EventoComponent implements OnInit {
  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;
  mensagemTela: string = 'Aguarde...';

  dataAtual: Date = new Date();
  listaMaquina: MaquinaModel[] = [];
  listaEvento: EventoModel[] = [];
  listaHorario: HorarioModel[] = [];
  lstDiametroFuro: DiametroFuroModel[] = [];
  listaEstado: EstadoModel[] = [];
  listaCidade: CidadeModel[] = [];
  listaUsuario: UsuarioTbModel[] = [];
  objEvento: EventoModel = {
    eventCod: 0,
    eventDesc: '',
    eventLogr: '',
    eventBairr: '',
    eventDtIn: new Date(),
    evenDtFi: new Date(),
    eventObse: '',
    eventStatus: true,
    horaCod: 0,
    cidaCod: 0,
    diamCod: 0,
    usuCod: 0,
    maqCod: 0,
    horaDesc: '',
    cidaDesc: '',
    estSigl: '',
    diamDesc: '',
    usuNome: '',
    maqMarca: '',
    maqModelo: ''
  };
  estadoSelecionado: any;

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
      this.ListaMaquina(0);
    }

    ListaMaquina(maqCod: number) {
      this.boolLoading = true;
      this.http.ListaMaquina(maqCod).subscribe((response: MaquinaModel[]) => {
        if (response) {
          this.listaMaquina = response;
          this.ListaHorario(0);
        }
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaHorario(horaCod: number) {
      this.http.ListaHorario(horaCod).subscribe((response: HorarioModel[]) => {
        if (response) {
          this.listaHorario = response;
          this.ListaDiametroFuro(0);
        }
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaDiametroFuro(diamCod: number) {
      this.http.ListaDiametroFuro(diamCod).subscribe((response: DiametroFuroModel[]) => {
        if (response) {
          this.lstDiametroFuro = response;
          this.ListaEstado(0);
        }
      }, error => {
        this.msgs = [];
        console.log(error);
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaEstado(estCod: number) {
      this.http.ListaEstado(estCod).subscribe((response: EstadoModel[]) => {
        if (response) {
          this.listaEstado = response;
          this.estadoSelecionado = 25;
          this.ListaCidade(0, 0);
        }
      }, error => {
        this.msgs = [];
        console.log(error);
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaCidade(cidaCod: number, estCod: number) {
      this.http.ListaCidade(cidaCod, estCod).subscribe((response: CidadeModel[]) => {
        if (response) {
          this.listaCidade = response;
          this.ListaUsuario(0);
        }
      }, error => {
        this.msgs = [];
        console.log(error);
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaUsuario(usuCod: number) {
      this.http.ListaUsuario(usuCod).subscribe((response: UsuarioTbModel[]) => {
        if (response) {
          this.listaUsuario = response;
          this.ListaEventoAtivo(0);
        }
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    //------------------------------------------

    ListaEventoAtivo(eventCod: number) {
      this.http.ListaEventoAtivo(eventCod).subscribe((response: EventoModel[]) => {
        if (response) {
          this.listaEvento = response;

          if(this.listaEvento.length === 0) {
            this.mensagemTela = 'Sem informações.';
          } else {
            this.mensagemTela = 'Aguarde...';
          }
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    NovoRegistro() {
      this.objEvento = {
        eventCod: 0,
        eventDesc: '',
        eventLogr: '',
        eventBairr: '',
        eventDtIn: new Date(),
        evenDtFi: new Date(),
        eventObse: '',
        eventStatus: true,
        horaCod: 0,
        // cidaCod: 0,
        cidaCod: 565,
        diamCod: 0,
        usuCod: 0,
        maqCod: 0,
        horaDesc: '',
        cidaDesc: '',
        estSigl: '',
        diamDesc: '',
        usuNome: '',
        maqMarca: '',
        maqModelo: ''
      };
      this.modoEdicao = true;
    }

    IniciaEdicao(objEven: EventoModel) {
      this.objEvento.eventCod = objEven.eventCod;
      this.objEvento.eventDesc = objEven.eventDesc;
      this.objEvento.eventLogr = objEven.eventLogr;
      this.objEvento.eventBairr = objEven.eventBairr;
      this.objEvento.eventDtIn = new Date(objEven.eventDtIn);
      this.objEvento.evenDtFi = new Date(objEven.evenDtFi);
      this.objEvento.eventObse = objEven.eventObse;
      this.objEvento.eventStatus = objEven.eventStatus;
      this.objEvento.horaCod = objEven.horaCod;
      this.objEvento.cidaCod = objEven.cidaCod;
      this.objEvento.diamCod = objEven.diamCod;
      this.objEvento.usuCod = objEven.usuCod;
      this.objEvento.maqCod = objEven.maqCod;
      this.objEvento.horaDesc = objEven.horaDesc;
      this.objEvento.cidaDesc = objEven.cidaDesc;
      this.objEvento.estSigl = objEven.estSigl;
      this.objEvento.diamDesc = objEven.diamDesc;
      this.objEvento.usuNome = objEven.usuNome;
      this.objEvento.maqMarca = objEven.maqMarca;
      this.objEvento.maqModelo = objEven.maqModelo;

      // console.log(this.objEvento);

      this.modoEdicao = true;
    }

    ListaCidadeEstado(estCod: number) {
      if(estCod)
      {
        this.boolLoading = true;
        this.ListaCidade(0, estCod);
      }
    }

    Cancelar() {
      this.objEvento = {
        eventCod: 0,
        eventDesc: '',
        eventLogr: '',
        eventBairr: '',
        eventDtIn: new Date(),
        evenDtFi: new Date(),
        eventObse: '',
        eventStatus: true,
        horaCod: 0,
        // cidaCod: 0,
        cidaCod: 565,
        diamCod: 0,
        usuCod: 0,
        maqCod: 0,
        horaDesc: '',
        cidaDesc: '',
        estSigl: '',
        diamDesc: '',
        usuNome: '',
        maqMarca: '',
        maqModelo: ''
      };
      this.modoEdicao = false;
    }

    Salvar(){
      console.log(this.objEvento);

      // this.boolLoading = true;
      // if (this.ValidaInformacoes(this.objMaquina))
      // {
      //   this.http.ManterMaquina(this.objMaquina).subscribe((response: string) => {
      //     if (response) {
      //       this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Máquina '+ (this.objMaquina.maqCod > 0 ? 'alterada' : 'inserida') + ' com sucesso!'});
      //       setTimeout(() => {
      //         this.listaMaquina = [];
      //         this.ListaDiametroFuro(0);
      //       }, 2000);
      //     }
      //     this.boolLoading = false;
      //   }, error => {
      //     this.msgs = [];
      //     this.boolLoading = false;
      //     this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      //   });
      // }
    }

  }
