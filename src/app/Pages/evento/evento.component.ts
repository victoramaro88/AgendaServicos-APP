import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventoModel } from 'src/app/Models/Evento.Model';
import { MaquinaModel } from 'src/app/Models/Maquina.Model';
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

  listaMaquina: MaquinaModel[] = [];
  listaEvento: EventoModel[] = [];

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
    this.ListaEvento(0);
  }

  ListaMaquina(maqCod: number) {
    this.boolLoading = true;
    this.http.ListaMaquina(maqCod).subscribe((response: MaquinaModel[]) => {
      if (response) {
        this.listaMaquina = response;
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaEvento(eventCod: number) {
    this.boolLoading = true;
    this.http.ListaEvento(eventCod).subscribe((response: EventoModel[]) => {
      if (response) {
        this.listaEvento = response;
      }
      this.boolLoading = false;
      console.log(this.listaEvento);
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

}
