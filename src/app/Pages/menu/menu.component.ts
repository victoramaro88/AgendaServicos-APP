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
            label: 'CheckList',
            items: [
              {
                label: 'Checklist',
                routerLink: '/checklist'
              },
              {
                label: 'Item Checklist',
                routerLink: '/itemCheckList'
              }
            ]
          },
          // {
          //   label: 'Diâmetro',
          //   routerLink: '/diametro'
          // },
          {
            label: 'Equipes',
            routerLink: '/equipe'
          },
          {
            label: 'Máquinas',
            routerLink: '/maquina'
          },
          {
            label: 'Usuários',
            routerLink: '/usuario'
          },
          {
            label: 'Veículos',
            routerLink: '/veiculo'
          }
        ]
      },
      {
        label: 'Eventos',
        // routerLink: '/evento',
        items: [
          {
            label: 'Cadastro',
            routerLink: '/evento'
          },
          {
            label: 'Eventos Cancelados',
            routerLink: '/eventosCancelados'
          }
        ]
      },
    ];
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
