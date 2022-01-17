import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { LoginModel } from "../Models/Login.Model";
import { UsuarioModel } from "../Models/Usuario.Model";
import { VeiculoModel } from "../Models/Veiculo.model";
import { TipoVeiculoModel } from "../Models/TipoVeiculo.model";
import { DiametroFuroModel } from "../Models/DiametroFuro.Model";
import { MaquinaModel } from "../Models/Maquina.Model";
import { AparelhoNavegacaoModel } from "../Models/AparelhoNavegacao.Model";
import { EquipeModel } from "../Models/Equipe.Model";
import { UsuarioTbModel } from "../Models/UsuarioTb.Model";
import { EquipeUsuarioModel } from "../Models/EquipeUsuario.Model";
import { UsuarioEnvioModel } from "../Models/UsuarioEnvio.Model";
import { PerfilModel } from "../Models/Perfil.Model";

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  logado: boolean = false;
  public link = new Subject<string>();

  constructor(private http: HttpClient) { }

  CarregaHeader() {
    let headerAcesso = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('tkn')
      })
    };
    return headerAcesso;
  }

  //-> Renovando o token
  idIntervaloTempo = 0;
  public RefreshToken() {
    // console.log(sessionStorage.getItem('tkn'));
    this.idIntervaloTempo = window.setInterval(() => {
      this.RenovaToken().subscribe((token: any) => {
        // console.log(token);
        sessionStorage.setItem('tkn', token.token);
        // console.log('Token Renovado!');
        // console.log('Hora: ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
        // console.log('Token Renovado: ' + sessionStorage.getItem('tkn'));
      }, error => {
        console.log(error);
        if(error.status === 0) {
          console.log('Tentando nova renovação do token...');
          this.RefreshToken();
        }
      });
    }, 300000 ); // ->RENOVA O TOKEN A CADA 5 MINUTOS.
    // }, 5000 ); // ->RENOVA O TOKEN A CADA 5 SEGUNDO.
  }

  public ClearInterval() { // ->PARA A RENOVAÇÃO DO TOKEN.
    window.clearInterval(this.idIntervaloTempo);
  }

  public RenovaToken() {
    return this.http.get<any>(`${environment.urlAPI}/Agenda/RenovaToken`, this.CarregaHeader());
  }

  public Login(objLogin: LoginModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${environment.urlAPI}/Agenda/Login`, objLogin);
  }

  public ListaVeiculo(veicCod: number): Observable<VeiculoModel[]> {
    return this.http.get<VeiculoModel[]>(`${environment.urlAPI}/Agenda/ListaVeiculo/${veicCod}`, this.CarregaHeader());
  }

  public ListaTipoVeiculo(tipVeicCod: number): Observable<TipoVeiculoModel[]> {
    return this.http.get<TipoVeiculoModel[]>(`${environment.urlAPI}/Agenda/ListaTipoVeiculo/${tipVeicCod}`, this.CarregaHeader());
  }

  public AlteraStatusVeiculo(veicCod: number, veicStatus: boolean): Observable<string> {
    return this.http.get<string>(`${environment.urlAPI}/Agenda/AlteraStatusVeiculo/${veicCod}/${veicStatus}`, this.CarregaHeader());
  }

  public AlteraStatusMaquina(maqCod: number, maqStatus: boolean): Observable<string> {
    return this.http.get<string>(`${environment.urlAPI}/Agenda/AlteraStatusMaquina/${maqCod}/${maqStatus}`, this.CarregaHeader());
  }

  public AlteraStatusEquipe(equipCod: number, equipStatus: boolean): Observable<string> {
    return this.http.get<string>(`${environment.urlAPI}/Agenda/AlteraStatusEquipe/${equipCod}/${equipStatus}`, this.CarregaHeader());
  }

  public ManterVeiculo(objVeiculo: VeiculoModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/Agenda/ManterVeiculo`, objVeiculo, this.CarregaHeader());
  }

  public ManterEquipe(objEquipeEnvio: UsuarioEnvioModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/Agenda/ManterEquipe`, objEquipeEnvio, this.CarregaHeader());
  }

  public ManterMaquina(objMaquina: MaquinaModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/Agenda/ManterMaquina`, objMaquina, this.CarregaHeader());
  }

  public ListaDiametroFuro(diamCod: number): Observable<DiametroFuroModel[]> {
    return this.http.get<DiametroFuroModel[]>(`${environment.urlAPI}/Agenda/ListaDiametroFuro/${diamCod}`, this.CarregaHeader());
  }

  public ListaMaquina(maqCod: number): Observable<MaquinaModel[]> {
    return this.http.get<MaquinaModel[]>(`${environment.urlAPI}/Agenda/ListaMaquina/${maqCod}`, this.CarregaHeader());
  }

  public ListaAparelhoNavegacao(apNavCod: number): Observable<AparelhoNavegacaoModel[]> {
    return this.http.get<AparelhoNavegacaoModel[]>(`${environment.urlAPI}/Agenda/ListaAparelhoNavegacao/${apNavCod}`, this.CarregaHeader());
  }

  public ListaEquipe(equipCod: number): Observable<EquipeModel[]> {
    return this.http.get<EquipeModel[]>(`${environment.urlAPI}/Agenda/ListaEquipe/${equipCod}`, this.CarregaHeader());
  }

  public ListaUsuario(usuCod: number): Observable<UsuarioTbModel[]> {
    return this.http.get<UsuarioTbModel[]>(`${environment.urlAPI}/Agenda/ListaUsuario/${usuCod}`, this.CarregaHeader());
  }

  public ListaPerfil(perfCod: number): Observable<PerfilModel[]> {
    return this.http.get<PerfilModel[]>(`${environment.urlAPI}/Agenda/ListaPerfil/${perfCod}`, this.CarregaHeader());
  }

  public ListaEquipeUsuario(equipCod: number): Observable<EquipeUsuarioModel[]> {
    return this.http.get<EquipeUsuarioModel[]>(`${environment.urlAPI}/Agenda/ListaEquipeUsuario/${equipCod}`, this.CarregaHeader());
  }

  public ListaUsuariosDisponiveis(): Observable<UsuarioTbModel[]> {
    return this.http.get<UsuarioTbModel[]>(`${environment.urlAPI}/Agenda/ListaUsuariosDisponiveis`, this.CarregaHeader());
  }
}
