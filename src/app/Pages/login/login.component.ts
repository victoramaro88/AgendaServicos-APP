import { LoginModel } from './../../Models/Login.Model';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http-service.service';
import { UsuarioModel } from 'src/app/Models/Usuario.Model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  versaoData: string[] = [];
  boolLoading = false;
  msgs: any[] = [];

  objLogin: LoginModel = {usuLogin:'', usuSenha: ''};

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService
    ) {
    this.versaoData = environment.versaoData.split('|');
  }

  ngOnInit(): void {

  }

  Login() {
    this.boolLoading = true;
    this.http.Login(this.objLogin).subscribe((response: UsuarioModel) => {
      if (response) {
        // console.log(response);
        sessionStorage.setItem('usr', JSON.stringify(response));
        this.router.navigate(['/home']);
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      this.boolLoading = false;
      if(error.error ==='Erro: Usuário ou senha inválidos.') {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: 'Usuário ou senha inválidos!'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro: ', detail: error.message});
      }
    });
  }

}
