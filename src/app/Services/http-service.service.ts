import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginModel } from "../Models/Login.Model";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) { }

  CarregaHeader() {
    let headerAcesso = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept':  'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('tknAcs')
      })
    };
    return headerAcesso;
  }

  // ->TOKEN DE ACESSO DO WSO DivTIC:
  idIntervaloTempo = 0;
  public RefreshToken() {
    this.idIntervaloTempo = window.setInterval(() => {
        this.RenovaToken('"' + sessionStorage.getItem('tknAcs') + '"').subscribe((token: any) => {
        sessionStorage.setItem('tknAcs', token.token);
        // console.log('Token Renovado!');
        // console.log('Hora: ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
        // console.log('Token WSO DivTIC: ' + this.tokenAcesso);
      }, error => {
        // console.log(error);
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

  public RenovaToken(parametros: string) {
    return this.http.post<any>(environment.urlAPI, parametros, this.CarregaHeader());
  }

  public Login(objLogin: LoginModel): Observable<any> {
    return this.http.post(`${environment.urlAPI}/Agenda/Login`, objLogin);
  }
}
