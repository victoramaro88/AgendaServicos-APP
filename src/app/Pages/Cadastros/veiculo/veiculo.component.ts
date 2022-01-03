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
  opcoesStatus: any[] = [];

  listaVeiculo: VeiculoModel[] = [];
  objVeiculo: VeiculoModel = {
    veicCod: 0,
    veicMarca: '',
    veicModelo: '',
    veicAno: 0,
    veicPlaca: '',
    veicObse: '',
    veicStatus: true,
    tipVeicCod: 0,
  };
  listaTipoVeiculo: TipoVeiculoModel[] = [];
  modoEdicao: boolean = false;

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
    this.ListaTipoVeiculo(0);
  }

  ListaTipoVeiculo(tipVeicCod: number) {
    this.boolLoading = true;
    this.modoEdicao = false;
    this.http.ListaTipoVeiculo(tipVeicCod).subscribe((response: TipoVeiculoModel[]) => {
      if (response) {
        this.listaTipoVeiculo = response;
        this.ListaVeiculo(0);
      }
      // this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if(error.error === 'Erro: Usuário ou senha inválidos.') {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Usuário ou senha inválidos!'});
      } else if(error.status === 401) {
        this.messageService.add({ severity: 'error', summary: 'Atenção: ', detail: 'Sessão expirada, faça o login novamente!' });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else if(error.error === 'Parâmetros inválidos.') {
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
      } else if(error.status === 401) {
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

  SelecionaTipoVeiculo(tipVeicCod: number) {
    let tipoVeiculo = this.listaTipoVeiculo.find(v => v.tipVeicCod === tipVeicCod);
    return tipoVeiculo?.tipVeicDesc;
  }

  AlteraStatusVeiculo(ojbVeiculo: VeiculoModel) {
    this.boolLoading = true;
    this.http.AlteraStatusVeiculo(ojbVeiculo.veicCod, ojbVeiculo.veicStatus).subscribe((response: string) => {
      if (response) {
        this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Veículo '+ (ojbVeiculo.veicStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if (error.status === 400) {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Falha ao comunicar com o servidor.'});
      } else if(error.status === 401) {
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

  IniciaEdicaoVeiculo(objVeiculo: VeiculoModel) {
    this.objVeiculo = objVeiculo;
    this.modoEdicao = true;
  }

  NovoRegistro() {
    this.objVeiculo = {
      veicCod: 0,
      veicMarca: '',
      veicModelo: '',
      veicAno: 0,
      veicPlaca: '',
      veicObse: '',
      veicStatus: true,
      tipVeicCod: 0,
    };
    this.modoEdicao = true;
  }

  Cancelar() {
    this.objVeiculo = {
      veicCod: 0,
      veicMarca: '',
      veicModelo: '',
      veicAno: 0,
      veicPlaca: '',
      veicObse: '',
      veicStatus: true,
      tipVeicCod: 0,
    };
    this.modoEdicao = false;
  }

  Salvar() {
    this.boolLoading = true;
    if (this.ValidaInformacoes(this.objVeiculo))
    {
      this.http.ManterVeiculo(this.objVeiculo).subscribe((response: string) => {
        if (response) {
          this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Veículo '+ (this.objVeiculo.veicCod > 0 ? 'alterado' : 'inserido') + ' com sucesso!'});
          setTimeout(() => {
            this.ListaTipoVeiculo(0);
          }, 2000);
        }
        this.boolLoading = false;
      }, error => {
        this.msgs = [];
        console.log(error);
        this.boolLoading = false;
        if (error.status === 400) {
          this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Falha ao comunicar com o servidor.'});
        } else if(error.status === 401) {
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

  ValidaInformacoes(objVeiculo: VeiculoModel) {
    if (objVeiculo.veicMarca.length > 0) {
      if (objVeiculo.veicModelo.length > 0) {
        if (objVeiculo.veicAno >= 1900) {
          if (objVeiculo.tipVeicCod > 0) {
            return true;
          } else {
            this.boolLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione o tipo do veículo!' });
            return false;
          }
        } else {
          this.boolLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um ano!' });
          return false;
        }
      } else {
        this.boolLoading = false;
        this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira um modelo!' });
        return false;
      }
    } else {
      this.boolLoading = false;
      this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Insira uma marca!' });
      return false;
    }
  }
}
