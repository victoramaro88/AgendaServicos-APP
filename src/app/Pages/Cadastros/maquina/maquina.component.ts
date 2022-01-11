import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DiametroFuroModel } from 'src/app/Models/DiametroFuro.Model';
import { MaquinaModel } from 'src/app/Models/Maquina.Model';
import { VeiculoModel } from 'src/app/Models/Veiculo.model';
import { HttpService } from 'src/app/Services/http-service.service';
import { MsgErroHttp } from 'src/app/Services/msgErroHttp.Service';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.css'],
  providers: [MessageService]
})
export class MaquinaComponent implements OnInit {

  boolLoading = false;
  msgs: any[] = [];
  opcoesStatus: any[] = [];

  listaMaquina: MaquinaModel[] = [];
  objMaquina: MaquinaModel = {
    maqCod: 0,
    maqMarca: '',
    maqModelo: '',
    maqObse: '',
    maqStatus: true,
    diamCod: 0,
    veicCod: 0
  };
  listaVeiculo: VeiculoModel[] = [];
  listaVeiculoDisponiveis: VeiculoModel[] = [];
  objVeiculo: VeiculoModel = {
    veicCod: 0,
    veicMarca: '',
    veicModelo: '',
    veicAno: 0,
    veicPlaca: '',
    veicObse: '',
    veicStatus: true,
    tipVeicCod: 0
  };
  listaDiametroFuro: DiametroFuroModel[] = [];
  modoEdicao: boolean = false;

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
    this.ListaDiametroFuro(0);
  }

  ListaMaquina(maqCod: number) {
    this.boolLoading = true;
    this.http.ListaMaquina(maqCod).subscribe((response: MaquinaModel[]) => {
      if (response) {
        this.listaMaquina = response;
      }
      this.boolLoading = false;
      this.ListaVeiculo(0);
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaDiametroFuro(diamCod: number) {
    this.boolLoading = true;
    this.modoEdicao = false;
    this.http.ListaDiametroFuro(diamCod).subscribe((response: DiametroFuroModel[]) => {
      if (response) {
        this.listaDiametroFuro = response;
        this.ListaMaquina(0);
      }
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  ListaVeiculo(veicCod: number) {
    this.boolLoading = true;
    this.http.ListaVeiculo(veicCod).subscribe((response: VeiculoModel[]) => {
      if (response) {
        for (const itemVeiculo of response) {
          if (itemVeiculo.veicStatus) {
            let objVeiculo = {
              veicCod: itemVeiculo.veicCod,
              veicMarca: itemVeiculo.veicMarca + '-' + itemVeiculo.veicModelo + ' (' + itemVeiculo.veicPlaca + ')',
              veicModelo: itemVeiculo.veicModelo,
              veicAno: itemVeiculo.veicAno,
              veicPlaca: itemVeiculo.veicPlaca,
              veicObse: itemVeiculo.veicObse,
              veicStatus: itemVeiculo.veicStatus,
              tipVeicCod: itemVeiculo.tipVeicCod
            }
            this.listaVeiculo.push(objVeiculo);
          }
        }
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  SelecionaVeiculo(veicCod: number) {
    let veiculo = this.listaVeiculo.find(v => v.veicCod === veicCod); //-> PAREI AQUI!!!!
    return veiculo ? veiculo.veicMarca : '';
  }

  IniciaEdicao(objMaquina: MaquinaModel) {
    this.listaVeiculoDisponiveis = [];
    for (const itemVeic of this.listaVeiculo) {
      this.listaVeiculoDisponiveis.push(itemVeic);
    }
    for (const itmMaq of this.listaMaquina) {
      for (const itmVeic of this.listaVeiculoDisponiveis) {
        if (itmMaq.veicCod === itmVeic.veicCod && itmMaq.maqCod !== objMaquina.maqCod) {
          let itmExc = this.listaVeiculoDisponiveis.findIndex(v => v.veicCod === itmMaq.veicCod);
          this.listaVeiculoDisponiveis.splice(itmExc,1);
        }
      }
    }

    this.objMaquina = objMaquina;
    this.modoEdicao = true;
  }

  NovoRegistro() {
    this.objMaquina = {
      maqCod: 0,
      maqMarca: '',
      maqModelo: '',
      maqObse: '',
      maqStatus: true,
      diamCod: 0,
      veicCod: 0
    };
    this.modoEdicao = true;
  }

  Cancelar() {
    this.objMaquina = {
      maqCod: 0,
      maqMarca: '',
      maqModelo: '',
      maqObse: '',
      maqStatus: true,
      diamCod: 0,
      veicCod: 0
    };
    this.modoEdicao = false;
  }

  AlteraStatus(objMaquina: MaquinaModel) {
    console.log(objMaquina);
    this.boolLoading = true;
    this.http.AlteraStatusVeiculo(objMaquina.maqCod, objMaquina.maqStatus).subscribe((response: string) => {
      if (response) {
        this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Máquina '+ (objMaquina.maqStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  Salvar(){
    // this.boolLoading = true;
    if (this.ValidaInformacoes(this.objMaquina))
    {
      console.log(this.objMaquina);
    }
  }

  ValidaInformacoes(objMaquina: MaquinaModel) {
    if (objMaquina.maqMarca.length > 0) {
      if (objMaquina.maqModelo.length > 0) {
        if (objMaquina.diamCod > 0) {
          if (objMaquina.veicCod > 0) {
            return true;
          } else {
            this.boolLoading = false;
            this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um veículo!' });
            return false;
          }
        } else {
          this.boolLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'Atenção: ', detail: 'Selecione um diâmetro!' });
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
