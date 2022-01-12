import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AparelhoNavegacaoModel } from 'src/app/Models/AparelhoNavegacao.Model';
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
        this.listaApNav = response;
        // this.ListaMaquina(0);
      }

      this.boolLoading = false;
      console.log(this.listaApNav);

    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

}
