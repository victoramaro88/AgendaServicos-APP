import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ChecklistModel } from 'src/app/Models/Checklist.Model';
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
        console.log(this.listaTpChLi);
        this.ListaCheckList(0);
      }, error => {
        this.msgs = [];
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
        console.log(this.listaChLi);
      }, error => {
        this.msgs = [];
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
      });
    }

    SelecionaTipoChLi(tipChLiCod: number) {
      let tipChLi = this.listaTpChLi.find(v => v.tipChLiCod === tipChLiCod);
      return tipChLi ? tipChLi.tipChLiCod : '';
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

  }
