import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CheckListItensModel } from 'src/app/Models/CheckListItens.Model';
import { CheckListRespostasModel } from 'src/app/Models/CheckListRespostas.Model';
import { CidadeModel } from 'src/app/Models/Cidade.Model';
import { DiametroFuroModel } from 'src/app/Models/DiametroFuro.Model';
import { EstadoModel } from 'src/app/Models/Estado.Model';
import { EventoModel } from 'src/app/Models/Evento.Model';
import { EventoManterModel } from 'src/app/Models/EventoManter.Model';
import { HorarioModel } from 'src/app/Models/Horario.Model';
import { MaquinaModel } from 'src/app/Models/Maquina.Model';
import { PesqMaqDispModel } from 'src/app/Models/PesqMaqDisp.Model';
import { RespostasCheckListModel } from 'src/app/Models/RespostasCheckList.model';
import { StatusModel } from 'src/app/Models/Status.Model';
import { TipoChecklistModel } from 'src/app/Models/TipoChecklist.Model';
import { UsuarioTbModel } from 'src/app/Models/UsuarioTb.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
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
  listaTpChLi: TipoChecklistModel[] = [];
  listaChecList: CheckListItensModel[] = [];
  listaRespostaChLs: RespostasCheckListModel[] = [];
  listaStatus: StatusModel[] = [];
  objEvento: EventoModel = {
    eventCod: 0,
    eventDesc: '',
    eventLogr: '',
    eventBairr: '',
    eventDtIn: new Date(),
    evenDtFi: new Date(),
    eventObse: '',
    eventStatus: 0,
    horaCod: 0,
    cidaCod: 0,
    diamCod: 0,
    usuCod: 0,
    maqCod: 0,
    tipChLiCod: 0,
    horaDesc: '',
    cidaDesc: '',
    estSigl: '',
    diamDesc: '',
    usuNome: '',
    maqMarca: '',
    maqModelo: '',
    tipChLiDesc: ''
  };
  estadoSelecionado: any;
  boolChecklistPreenchido: boolean = false;
  displayDialog: boolean = false;
  boolDatasValidas: boolean = true;

  //-> Booleano dos campos
  boolMaquinaBloq: boolean = true; //-> Começa bloqueada, pois os parâmetros ainda não foram definidos.
  boolTipoFuroBloq: boolean = false;
  boolDiametroBloq: boolean = false;
  boolDataInBloq: boolean = false;
  boolDataFiBloq: boolean = false;

  boolHorario: boolean = false;
  boolDescricao: boolean = false;
  boolEndereco: boolean = false;
  boolBairro: boolean = false;
  boolEstado: boolean = false;
  boolCidade: boolean = false;
  boolResponsavel: boolean = false;
  boolStatus: boolean = false;

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService,
    private errosHttp: MsgErroHttp,
    private confirmationService: ConfirmationService
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
          // this.listaMaquina = response;
          for (const itemMaq of response) {
            let objMaq: MaquinaModel = {
              maqCod: itemMaq.maqCod,
              maqMarca: itemMaq.maqMarca + ' / ' + itemMaq.maqModelo,
              maqModelo: itemMaq.maqModelo,
              maqObse: itemMaq.maqObse,
              maqStatus: itemMaq.maqStatus,
              diamCod: itemMaq.diamCod,
              veicCod: itemMaq.veicCod
            };
            this.listaMaquina.push(objMaq);
          }
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
          this.listaUsuario = [];
          for (const itmUsr of response) {
            if(itmUsr.usuStatus) {
              let objUsr: UsuarioTbModel = {
                usuCod: itmUsr.usuCod,
                usuNome: itmUsr.usuNome,
                usuLogin: itmUsr.usuLogin,
                usuSenha: itmUsr.usuSenha,
                usuStatus: itmUsr.usuStatus,
                perfCod: itmUsr.perfCod
              };
              this.listaUsuario.push(objUsr);
            }
          }
          this.ListaTipoCheckList(0);
        }
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaTipoCheckList(tipChLiCod: number) {
      this.http.ListaTipoCheckList(tipChLiCod).subscribe((response: TipoChecklistModel[]) => {
        if (response) {
          this.listaTpChLi = response;
        }
        this.ListaStatus(1);
      }, error => {
        this.msgs = [];
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaStatus(sttTpCod: number) {
      this.http.ListaStatus(sttTpCod).subscribe((response: StatusModel[]) => {
        if (response) {
          this.listaStatus = response;
        }
        this.ListaEventoAtivo(0);
      }, error => {
        this.msgs = [];
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    //------------------------------------------

    ListaEventoAtivo(eventCod: number) {
      this.http.ListaEventoAtivo(eventCod).subscribe((response: EventoModel[]) => {
        if (response) {
          this.listaEvento = [];
          for (const itmEv of response) {

            //-> Atualizando na tela o status de cada evento (Expirado, Operando, Aguardando...).
            if (new Date(itmEv.evenDtFi) < new Date(new Date().toDateString())) {
              itmEv.eventStatus = 3;
            } else if (
              new Date(itmEv.eventDtIn) <= new Date(new Date().toDateString())
              && new Date(itmEv.evenDtFi) >= new Date(new Date().toDateString())
              ) {
                itmEv.eventStatus = 2;
              }

              let objEv: EventoModel = {
                eventCod: itmEv.eventCod,
                eventDesc: itmEv.eventDesc,
                eventLogr: itmEv.eventLogr,
                eventBairr: itmEv.eventBairr,
                eventDtIn: itmEv.eventDtIn,
                evenDtFi: itmEv.evenDtFi,
                eventObse: itmEv.eventObse,
                eventStatus: itmEv.eventStatus,
                horaCod: itmEv.horaCod,
                cidaCod: itmEv.cidaCod,
                diamCod: itmEv.diamCod,
                usuCod: itmEv.usuCod,
                maqCod: itmEv.maqCod,
                tipChLiCod: itmEv.tipChLiCod,
                horaDesc: itmEv.horaDesc,
                cidaDesc: itmEv.cidaDesc,
                estSigl: itmEv.estSigl,
                diamDesc: itmEv.diamDesc,
                usuNome: itmEv.usuNome,
                maqMarca: itmEv.maqMarca + ' / ' + itmEv.maqModelo,
                maqModelo: itmEv.maqModelo,
                tipChLiDesc: itmEv.tipChLiDesc
              };
              this.listaEvento.push(objEv);
            }

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

      ExibeCheckList() {
        this.boolLoading = true;
        this.boolChecklistPreenchido = false;
        this.listaChecList = [];
        this.listaRespostaChLs = [];
        if (this.objEvento.tipChLiCod > 0) {
          this.http.ListaChLsByCheckList(this.objEvento.tipChLiCod).subscribe((response: CheckListItensModel[]) => {
            if (response) {
              for (const itmCkLs of response) {
                let objChLs: CheckListItensModel = {
                  chkLstItmChkLst: itmCkLs.chkLstItmChkLst,
                  chLsCod: itmCkLs.chLsCod,
                  itmChLsCod: itmCkLs.itmChLsCod,
                  itmChLsDesc: itmCkLs.itmChLsDesc,
                  itmChLsObrig: itmCkLs.itmChLsObrig,
                  itmChLsStatus: itmCkLs.itmChLsStatus,
                  chkLstResp: false
                };
                this.listaChecList.push(objChLs);
              }
            }
            this.showDialog();
            this.boolLoading = false;
          }, error => {
            this.msgs = [];
            this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
          });

          // this.boolChecklistPreenchido = true; //-> ALTERAR SOMENTE PARA QUANDO O CHECKLIST ESTIVER OK, E NÃO NESTE MOMENTO
        } else {
          // this.boolChecklistPreenchido = false;
        }
      }

      showDialog() {
        this.displayDialog = true;
      }

      OkDialog() {
        let checkListValido: boolean = true;
        for (const itemCL of this.listaChecList) {
          if (itemCL.itmChLsObrig === true) {
            let valorResp: string = itemCL.chkLstResp.toString();
            if (valorResp !== 'true') {
              checkListValido = false;
            }
          }
        }

        if(checkListValido) {
          // this.messageService.add({ severity: 'success', summary: 'Sucesso! ', detail: 'CheckList validado!' });
          this.boolChecklistPreenchido = true;
          this.boolDataInBloq = true;
          this.boolDataFiBloq = true;
          if (this.objEvento.eventCod > 0) {
            this.boolDataInBloq = false;
          }
          this.boolTipoFuroBloq = true;
          this.displayDialog = false;
        } else {
          this.messageService.add({severity:'warn', summary:'Atenção! ', detail: 'Selecione todos os itens obrigatórios para continuar.'});
        }
      }

      NovoRegistro() {
        this.boolChecklistPreenchido = false;
        this.objEvento = {
          eventCod: 0,
          eventDesc: '',
          eventLogr: '',
          eventBairr: '',
          eventDtIn: new Date(),
          evenDtFi: new Date(),
          eventObse: '',
          eventStatus: 1,
          horaCod: 0,
          // cidaCod: 0,
          cidaCod: 565,
          diamCod: 0,
          usuCod: 0,
          maqCod: 0,
          tipChLiCod: 0,
          horaDesc: '',
          cidaDesc: '',
          estSigl: '',
          diamDesc: '',
          usuNome: '',
          maqMarca: '',
          maqModelo: '',
          tipChLiDesc: ''
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
        this.objEvento.tipChLiCod = objEven.tipChLiCod;

        this.ExibeCheckList();

        this.boolChecklistPreenchido = true;

        // this.boolDataFiBloq = true;
        this.boolDataInBloq = false;

        // console.log(this.objEvento);

        this.modoEdicao = true;
      }

      Reagendamento(objEven: EventoModel) {
        this.objEvento.eventCod = objEven.eventCod;
        this.objEvento.eventDesc = objEven.eventDesc;
        this.objEvento.eventLogr = objEven.eventLogr;
        this.objEvento.eventBairr = objEven.eventBairr;
        this.objEvento.eventDtIn = new Date(objEven.eventDtIn);
        this.objEvento.evenDtFi = new Date(objEven.evenDtFi);
        this.objEvento.eventObse = objEven.eventObse;
        this.objEvento.eventStatus = 4; //-> Alterado para Reagendado
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
        this.objEvento.tipChLiCod = objEven.tipChLiCod;

        this.ExibeCheckList();

        this.boolChecklistPreenchido = true;

        this.boolDataInBloq = false;

        this.boolHorario = true;
        this.boolDescricao = true;
        this.boolEndereco = true;
        this.boolBairro = true;
        this.boolEstado = true;
        this.boolCidade = true;
        this.boolResponsavel = true;
        this.boolStatus = true;

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
        this.listaEvento = [];
        this.ListaMaquina(0);
        this.objEvento = {
          eventCod: 0,
          eventDesc: '',
          eventLogr: '',
          eventBairr: '',
          eventDtIn: new Date(),
          evenDtFi: new Date(),
          eventObse: '',
          eventStatus: 1,
          horaCod: 0,
          // cidaCod: 0,
          cidaCod: 565,
          diamCod: 0,
          usuCod: 0,
          maqCod: 0,
          tipChLiCod: 0,
          horaDesc: '',
          cidaDesc: '',
          estSigl: '',
          diamDesc: '',
          usuNome: '',
          maqMarca: '',
          maqModelo: '',
          tipChLiDesc: ''
        };
        this.boolDatasValidas = true;

        this.boolTipoFuroBloq = false;
        this.boolDiametroBloq = false;
        this.boolDataInBloq = false;
        this.boolDataFiBloq = false;
        this.boolMaquinaBloq = true;

        this.boolHorario = false;
        this.boolDescricao = false;
        this.boolEndereco = false;
        this.boolBairro = false;
        this.boolEstado = false;
        this.boolCidade = false;
        this.boolResponsavel = false;
        this.boolStatus = false;

        this.displayDialog = false;

        this.modoEdicao = false;
      }

      ValidaDatas(dataIn: boolean, dataFi: boolean) {
        //-> Bloqueando os inputs de data para evitar alterações.
        if(dataIn && !dataFi) {
          this.boolDataInBloq = true;
          this.boolDataFiBloq = false;
        } else {
          this.boolDataFiBloq = true;
        }

        if (this.objEvento.eventDtIn > this.objEvento.evenDtFi) {
          this.boolDatasValidas = false;
          this.boolDataFiBloq = false;
        } else {
          this.boolDatasValidas = true;

          if(this.boolDataInBloq && this.boolDataFiBloq) {

            //-> Chamando função para carregar as máquinas disponíveis.
            this.boolLoading = true;
            let objPesquisa: PesqMaqDispModel = {
              diamCod: this.objEvento.diamCod,
              eventDtIn: this.objEvento.eventDtIn,
              evenDtFi: this.objEvento.evenDtFi
            };
            this.listaMaquina = [];
            this.http.ListaMaquinasDisponiveis(objPesquisa).subscribe((response: MaquinaModel[]) => {
              if (response) {
                for (const itemMaq of response) {
                  let objMaq: MaquinaModel = {
                    maqCod: itemMaq.maqCod,
                    maqMarca: itemMaq.maqMarca + ' / ' + itemMaq.maqModelo,
                    maqModelo: itemMaq.maqModelo,
                    maqObse: itemMaq.maqObse,
                    maqStatus: itemMaq.maqStatus,
                    diamCod: itemMaq.diamCod,
                    veicCod: itemMaq.veicCod
                  };
                  this.listaMaquina.push(objMaq);
                }
                this.boolMaquinaBloq = false;
                this.boolLoading = false;
              }
            }, error => {
              this.msgs = [];
              this.boolLoading = false;
              this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
            });
          }
        }
      }

      Salvar() {
        if (this.ValidaInformacoes()) {
          this.boolLoading = true;
          let listaRespostas: CheckListRespostasModel[] = [];
          for (const itemResp of this.listaChecList) {
            let valorResp: string = itemResp.chkLstResp.toString();
            if (valorResp === 'true') {
              itemResp.chkLstResp = true;
            } else {
              itemResp.chkLstResp = false;
            }

            let objRespostas: CheckListRespostasModel = {
              chkLsRespCod: 0,
              eventCod: this.objEvento.eventCod,
              chkLstItmChkLst: itemResp.chkLstItmChkLst,
              chkLstResp: itemResp.chkLstResp
            };
            listaRespostas.push(objRespostas);
          }

          let objEnvioServico: EventoManterModel = {
            objEvento: this.objEvento,
            listaRespostas: listaRespostas
          };

          // console.log(objEnvioServico);
          this.http.ManterEvento(objEnvioServico).subscribe((response: string) => {
            if (response) {
              this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Evento '+ (this.objEvento.eventCod > 0 ? 'alterado' : 'inserido') + ' com sucesso!'});
              setTimeout(() => {
                this.listaEvento = [];
                this.modoEdicao = false;
                this.boolTipoFuroBloq = false;
                this.ListaMaquina(0);
              }, 2000);
            }
            this.boolLoading = false;
          }, error => {
            this.msgs = [];
            this.boolLoading = false;
            this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
          });
        }
      }

      ValidaInformacoes() {
        if(this.objEvento.tipChLiCod > 0) {
          if(this.objEvento.diamCod > 0) {
            if (this.boolDatasValidas && this.objEvento.eventDtIn >= new Date()) {
              if (this.objEvento.maqCod > 0) {
                if (this.objEvento.eventDesc.length > 0) {
                  if (this.objEvento.eventLogr.length > 0) {
                    if (this.objEvento.eventBairr.length > 0) {
                      if (this.objEvento.cidaCod > 0) {
                        if (this.objEvento.usuCod > 0) {
                          return true;
                        } else {
                          this.boolLoading = false;
                          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione uma Responsável da obra!' });
                          return false;
                        }
                      } else {
                        this.boolLoading = false;
                        this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione uma cidade!' });
                        return false;
                      }
                    } else {
                      this.boolLoading = false;
                      this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um bairro válido!' });
                      return false;
                    }
                  } else {
                    this.boolLoading = false;
                    this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um endereço válido!' });
                    return false;
                  }
                } else {
                  this.boolLoading = false;
                  this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira uma descrição para o evento!' });
                  return false;
                }
              } else {
                this.boolLoading = false;
                this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione uma máquina!' });
                return false;
              }
            } else {
              this.boolLoading = false;
              this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um período de datas válido!' });
              return false;
            }
          } else {
            this.boolLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um diâmetro de furo!' });
            return false;
          }
        } else {
          this.boolLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um tipo de furo!' });
          return false;
        }
      }

      CancelarEvento(eventCod: number) {
        this.boolLoading = true;
        this.http.AlteraStatusEvento(eventCod, 10).subscribe((response: string) => {
          if (response && response.toString() === 'OK') {
            let indexEvento = this.listaEvento.findIndex(e => e.eventCod === eventCod);
            if(indexEvento !== -1) {
              this.listaEvento.splice(indexEvento, 1);
              this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Evento cancelado com sucesso!'});
            }
          }
          this.boolLoading = false;
        }, error => {
          this.msgs = [];
          this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
        });
      }

      ConcluirEvento(eventCod: number) {
        this.boolLoading = true;
        this.http.AlteraStatusEvento(eventCod, 9).subscribe((response: string) => {
          if (response && response.toString() === 'OK') {
            let indexEvento = this.listaEvento.findIndex(e => e.eventCod === eventCod);
            if(indexEvento !== -1) {
              this.listaEvento.splice(indexEvento, 1);
              this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Evento finalizado com sucesso!'});
            }
          }
          this.boolLoading = false;
        }, error => {
          this.msgs = [];
          this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
        });
      }

      confirm(eventCod: number, tipo: string) {
        if(tipo === 'CANCELAR') {
          this.confirmationService.confirm({
            message: 'Deseja realmente cancelar este agendamento?',
            accept: () => {
              this.CancelarEvento(eventCod);
            }
          });
        } else if(tipo === 'CONCLUIR') {
          this.confirmationService.confirm({
            message: 'Deseja realmente concluir este agendamento?',
            accept: () => {
              this.ConcluirEvento(eventCod);
            }
          });
        }
      }

    }
