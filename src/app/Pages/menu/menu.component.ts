import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Usuário',
            routerLink: '/usuario'
          },
          {
            label: 'CheckList',
            routerLink: '/checkList'
          },
          {
            label: 'Máquinas',
            routerLink: '/maquina'
          },
          {
            label: 'Veículos',
            routerLink: '/veiculo'
          }
        ]
      }
    ];
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
