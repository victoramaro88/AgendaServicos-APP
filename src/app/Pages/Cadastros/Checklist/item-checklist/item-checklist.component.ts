import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ItemCheckListModel } from 'src/app/Models/ItemCheckList.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-item-checklist',
  templateUrl: './item-checklist.component.html',
  styleUrls: ['./item-checklist.component.css'],
  providers: [MessageService]
})
export class ItemChecklistComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  opcoesObrigatorios: any[] = [];
  modoEdicao: boolean = false;

  listaItmChkLst: ItemCheckListModel[] = [];
  objItmChkLst: ItemCheckListModel = {
    itmChLsCod: 0,
    itmChLsDesc: '',
    itmChLsObrig: true,
    itmChLsStatus: true
  };

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
      this.opcoesObrigatorios = [
        { label: "Não", value: false },
        { label: "Sim", value: true }
      ];
    }

    ngOnInit(): void {
      this.ListaItemChecklist(0);
    }

    ListaItemChecklist(maqCod: number) {
      this.boolLoading = true;
      this.modoEdicao = false;
      this.http.ListaItemChecklist(maqCod).subscribe((response: ItemCheckListModel[]) => {
        if (response) {
          this.listaItmChkLst = response;
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    NovoRegistro() {
      this.objItmChkLst = {
        itmChLsCod: 0,
        itmChLsDesc: '',
        itmChLsObrig: true,
        itmChLsStatus: true
      };
      this.modoEdicao = true;
    }

    IniciaEdicao(objIC: ItemCheckListModel) {
      this.objItmChkLst.itmChLsCod = objIC.itmChLsCod;
      this.objItmChkLst.itmChLsDesc = objIC.itmChLsDesc;
      this.objItmChkLst.itmChLsObrig = objIC.itmChLsObrig;
      this.objItmChkLst.itmChLsStatus = objIC.itmChLsStatus;

      this.modoEdicao = true;
    }

    AlteraStatus(objItmChkLst: ItemCheckListModel) {
      this.boolLoading = true;
      this.http.AlteraStatusItemCheckList(objItmChkLst.itmChLsCod, objItmChkLst.itmChLsStatus).subscribe((response: string) => {
        if (response) {
          this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Item '+ (objItmChkLst.itmChLsStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
          this.ListaItemChecklist(0);
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error) });
        this.listaItmChkLst = [];
        this.ListaItemChecklist(0);
      });
    }

    Cancelar() {
      this.objItmChkLst = {
        itmChLsCod: 0,
        itmChLsDesc: '',
        itmChLsObrig: true,
        itmChLsStatus: true
      };
      this.modoEdicao = false;
    }

    Salvar() {
      if (this.ValidaInformacoes(this.objItmChkLst)) {
        this.boolLoading = true;
        if (this.ValidaInformacoes(this.objItmChkLst))
        {
          this.http.ManterItemChecklist(this.objItmChkLst).subscribe((response: string) => {
            if (response) {
              this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Item '+ (this.objItmChkLst.itmChLsCod > 0 ? 'alterado' : 'inserido') + ' com sucesso!'});
              setTimeout(() => {
                this.listaItmChkLst = [];
                this.ListaItemChecklist(0);
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
    }

    ValidaInformacoes(objItmChkLst: ItemCheckListModel) {
      if (objItmChkLst.itmChLsDesc.length > 0) {
        return true;
      } else {
        this.boolLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira uma descrição!' });
        return false;
      }
    }

  }
