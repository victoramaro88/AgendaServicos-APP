import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DiametroFuroModel } from 'src/app/Models/DiametroFuro.Model';
import { HttpService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-diametro',
  templateUrl: './diametro.component.html',
  styleUrls: ['./diametro.component.css'],
  providers: [MessageService]
})
export class DiametroComponent implements OnInit {

  versaoData: string[] = [];
  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];
  modoEdicao: boolean = false;

  lstDiametroFuro: DiametroFuroModel[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService
  ) {
    this.opcoesStatus = [
      { label: "Inativo", value: false },
      { label: "Ativo", value: true }
    ];
  }

  ngOnInit(): void {
    this.boolLoading = true;
    this.ListaDiametroFuro(0);
  }

  ListaDiametroFuro(diamCod: number) {
    this.boolLoading = true;
    this.http.ListaDiametroFuro(diamCod).subscribe((response: DiametroFuroModel[]) => {
      if (response) {
        this.lstDiametroFuro = response;
      }
      console.log(this.lstDiametroFuro);
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if(error.status === 401) {
        this.messageService.add({ severity: 'error', summary: 'Atenção: ', detail: 'Sessão expirada, faça o login novamente!' });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else if(error.error ==='Parâmetros inválidos.') {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Parâmetros inválidos!'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }

}
