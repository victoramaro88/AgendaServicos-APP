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
      console.log(this.listaMaquina);
      this.boolLoading = false;
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
        this.ListaVeiculo(0);
      }
      console.log(this.listaDiametroFuro);
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
        this.listaVeiculo = response;
        this.ListaMaquina(0);
      }
      console.log(this.listaVeiculo);
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

  SelecionaVeiculo(veicCod: number) {
    let veiculo = this.listaVeiculo.find(v => v.veicCod === veicCod); //-> PAREI AQUI!!!!
    return veiculo ? veiculo.veicMarca + ' - ' + veiculo.veicModelo + ' / ' + veiculo.veicPlaca.substring(0,3) + '-' + veiculo.veicPlaca.substring(3) : '';
  }

  IniciaEdicao(objMaquina: MaquinaModel) {
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

  AlteraStatus(ojbMaquina: MaquinaModel) {
    this.boolLoading = true;
    this.http.AlteraStatusVeiculo(ojbMaquina.maqCod, ojbMaquina.maqStatus).subscribe((response: string) => {
      if (response) {
        this.messageService.add({severity:'success', summary:'Sucesso! ', detail: 'Máquina '+ (ojbMaquina.maqStatus ? 'ativado' : 'inativado') + ' com sucesso!'});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      this.boolLoading = false;
      this.messageService.add({severity:'error', summary:'Erro: ', detail: this.errosHttp.RetornaMensagemErro(error)});
    });
  }

}
