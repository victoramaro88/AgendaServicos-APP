import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChecklistModel } from 'src/app/Models/Checklist.Model';
import { ChecklistEnvioModel } from 'src/app/Models/ChecklistEnvio.Model';
import { ChlistItmChlistModel } from 'src/app/Models/ChlistItmChlist.Model';
import { ItemCheckListModel } from 'src/app/Models/ItemCheckList.Model';
import { TipoChecklistModel } from 'src/app/Models/TipoChecklist.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [MessageService]
})
export class ChecklistComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;

  listaTpChLi: TipoChecklistModel[] = [];
  objCheckList: ChecklistModel = {
    chLsCod: 0,
    chLsDesc: '',
    chLsStatus: true,
    tipChLiCod: 0
  };
  listaChLi: ChecklistModel[] = [];
  listaItemChecklist: ItemCheckListModel[] = [];
  listaItemChecklistSelecionados: ItemCheckListModel[] = [];
  listaItmChLstEdit: ChlistItmChlistModel[] = [];

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
      this.ListaTipoCheckList(0);
    }

    ListaTipoCheckList(tipChLiCod: number) {
      this.boolLoading = true;
      this.modoEdicao = false;
      this.http.ListaTipoCheckList(tipChLiCod).subscribe((response: TipoChecklistModel[]) => {
        if (response) {
          this.listaTpChLi = response;
        }
        this.ListaItemChecklist(0);
      }, error => {
        this.msgs = [];
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaItemChecklist(maqCod: number) {
      this.boolLoading = true;
      this.listaItemChecklist = [];
      this.modoEdicao = false;
      this.http.ListaItemChecklist(maqCod).subscribe((response: ItemCheckListModel[]) => {
        if (response) {
          for (const itmChLst of response) {
            if(itmChLst.itmChLsStatus === true) {
              let objItChLs: ItemCheckListModel = {
                itmChLsCod: itmChLst.itmChLsCod,
                itmChLsDesc: itmChLst.itmChLsObrig ? itmChLst.itmChLsDesc + '*' : itmChLst.itmChLsDesc,
                itmChLsObrig: itmChLst.itmChLsObrig,
                itmChLsStatus: itmChLst.itmChLsStatus
              };
              this.listaItemChecklist.push(objItChLs);
            }
          }
        }
        this.ListaCheckList(0);
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaCheckList(chLsCod: number) {
      this.boolLoading = true;
      this.http.ListaCheckList(chLsCod).subscribe((response: ChecklistModel[]) => {
        if (response) {
          this.listaChLi = response;
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    ListaCheckListItemCheckList(chLsCod: number) {

    }

    SelecionaTipoChLi(tipChLiCod: number) {
      let tipChLi = this.listaTpChLi.find(v => v.tipChLiCod === tipChLiCod);
      return tipChLi ? tipChLi.tipChLiDesc : '';
    }

    NovoRegistro() {
      this.objCheckList = {
        chLsCod: 0,
        chLsDesc: '',
        chLsStatus: true,
        tipChLiCod: 0
      };
      this.modoEdicao = true;
    }

    IniciaEdicao(objChLst: ChecklistModel) {
      this.listaItemChecklistSelecionados = [];
      this.boolLoading = true;
      this.http.ListaCheckListItemCheckList(objChLst.chLsCod).subscribe((response: ChlistItmChlistModel[]) => {
        if (response) {
          this.listaItmChLstEdit = response;
          for (const itemChLs of response) {
            if(objChLst.chLsCod === itemChLs.chLsCod) {
              let item = this.listaItemChecklist.find(i => i.itmChLsCod === itemChLs.itmChLsCod) as ItemCheckListModel;
              let indexItem = this.listaItemChecklist.findIndex(i => i.itmChLsCod === itemChLs.itmChLsCod);
              this.listaItemChecklistSelecionados.push(item);
              this.listaItemChecklist.splice(indexItem, 1);
            }
          }

          this.objCheckList.chLsCod = objChLst.chLsCod;
          this.objCheckList.chLsDesc = objChLst.chLsDesc;
          this.objCheckList.chLsStatus = objChLst.chLsStatus;
          this.objCheckList.tipChLiCod = objChLst.tipChLiCod;

          this.modoEdicao = true;
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    AlteraStatus(objChLst: ChecklistModel) {
      this.boolLoading = true;
      this.http.AlteraStatusCheckList(objChLst.chLsCod, objChLst.chLsStatus).subscribe((response: string) => {
        if (response) {
          this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Checklist '+ (objChLst.chLsStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error) });
        this.listaChLi = [];
        this.ListaTipoCheckList(0);
      });
    }

    Cancelar() {
      this.ListaTipoCheckList(0);
      this.objCheckList = {
        chLsCod: 0,
        chLsDesc: '',
        chLsStatus: true,
        tipChLiCod: 0
      };
      this.listaItemChecklistSelecionados = [];
      this.modoEdicao = false;
    }

    Salvar() {
      this.boolLoading = true;
      if(this.ValidaInformacoes(this.objCheckList)) {
        let objChecklistEnvio: ChecklistEnvioModel = {
          objChecklist: this.objCheckList,
          listaItemChecklist: this.listaItemChecklistSelecionados
        };
        this.http.ManterCheckList(objChecklistEnvio).subscribe((response: string) => {
          if (response) {
            this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Checklist '+ (objChecklistEnvio.objChecklist.chLsCod > 0 ? 'alterado' : 'inserido') + ' com sucesso!'});
            setTimeout(() => {
              this.listaChLi = [];
              this.ListaTipoCheckList(0);
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

    ValidaInformacoes(objChLst: ChecklistModel) {
      if (objChLst.chLsDesc.length > 0) {
        if (objChLst.tipChLiCod > 0) {
          if (this.listaItemChecklistSelecionados.length > 0) {
            return true;
          } else {
            this.boolLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione ao menos um item para o checklist!' });
            return false;
          }
        } else {
          this.boolLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um tipo de checklist!' });
          return false;
        }
      } else {
        this.boolLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira uma descrição!' });
        return false;
      }
    }

  }
