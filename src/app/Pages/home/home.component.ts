import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventoModel } from 'src/app/Models/Evento.Model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;
  mensagemTela: string = 'Aguarde...';

  listaEvento: EventoModel[] = [];

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private errosHttp: MsgErroHttp
    ) {}

  ngOnInit(): void {
    this.ListaEventoAtivo(0);
  }

  ListaEventoAtivo(eventCod: number) {
    this.boolLoading = true;
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

}
