import { TipoVeiculoModel } from './../../../Models/TipoVeiculo.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VeiculoModel } from 'src/app/Models/Veiculo.model';
import { HttpService } from 'src/app/Services/http-service.service';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css'],
  providers: [MessageService]
})
export class VeiculoComponent implements OnInit {

  versaoData: string[] = [];
  boolLoading = false;
  msgs: any[] = [];

  listaVeiculo: VeiculoModel[] = [];
  listaTipoVeiculo: TipoVeiculoModel[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.ListaTipoVeiculo(0);
  }

  ListaTipoVeiculo(tipVeicCod: number) {
    this.boolLoading = true;
    this.http.ListaTipoVeiculo(tipVeicCod).subscribe((response: TipoVeiculoModel[]) => {
      if (response) {
        this.listaTipoVeiculo = response;
        this.ListaVeiculo(0);
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if(error.error ==='Erro: Usuário ou senha inválidos.') {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Usuário ou senha inválidos!'});
      } else if(error.error ==='Parâmetros inválidos.') {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Parâmetros inválidos!'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }

  ListaVeiculo(veicCod: number) {
    this.boolLoading = true;
    this.http.ListaVeiculo(veicCod).subscribe((response: VeiculoModel[]) => {
      if (response) {
        this.listaVeiculo = response;
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if(error.error ==='Erro: Usuário ou senha inválidos.') {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Usuário ou senha inválidos!'});
      } else if(error.error ==='Parâmetros inválidos.') {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Parâmetros inválidos!'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }

  SelecionaTipoVeiculo(tipVeicCod: number) {
    let tipoVeiculo = this.listaTipoVeiculo.find(v => v.tipVeicCod === tipVeicCod);
    return tipoVeiculo?.tipVeicDesc;
  }

  AlteraStatusVeiculo(ojbVeiculo: VeiculoModel) {
    this.boolLoading = true;
    this.http.AlteraStatusVeiculo(ojbVeiculo.veicCod, ojbVeiculo.veicStatus).subscribe((response: string) => {
      if (response) {
        this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Veículo '+ (ojbVeiculo.veicStatus ? 'inativado' : 'ativado') + ' com sucesso!'});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if (error.status === 400) {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Falha ao comunicar com o servidor.'});
      } else if(error.error ==='Parâmetros inválidos.') {
        this.messageService.add({severity:'warn', summary:'Atenção: ', detail: 'Parâmetros inválidos!'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }
}
