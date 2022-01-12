import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MsgErroHttp {

  constructor(
    private router: Router
  ) { }

  public RetornaMensagemErro(error: any) {
    console.log(error);
    if (error.status === 400) {
      return 'Falha ao comunicar com o servidor!  (Erro 400)';
    } else if(error.status === 401) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return 'Sessão expirada, faça o login novamente!';
    } else if(error.status === 404) {
      return 'Requisição não encontrada! (Erro 404)';
    } else if(error.error === 'Parâmetros inválidos.') {
      return 'Parâmetros inválidos!';
    } else {
      return error.message;
    }
  }
}
