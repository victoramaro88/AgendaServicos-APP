import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

      this.primengConfig.setTranslation({
        "startsWith": "Inicia com",
        "contains": "Contém",
        "notContains": "Não contém",
        "endsWith": "Termina com",
        "equals": "Igual",
        "notEquals": "Não é igual",
        "noFilter": "Sem Filtros",
        "lt": "Menor que",
        "lte": "Menos que ou igual a",
        "gt": "Maior que",
        "gte": "Maior que ou igual a",
        "is": "é",
        "isNot": "Não é",
        "before": "Antes",
        "after": "Depois",
        "clear": "Limpar",
        "apply": "Aplicar",
        "matchAll": "Combinar tudo",
        "matchAny": "Corresponder a qualquer",
        "addRule": "Add Regra",
        "removeRule": "Remover Regra",
        "accept": "Sim",
        "reject": "Não",
        "choose": "Escolha",
        "upload": "Upload",
        "cancel": "Cancelar",
        "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        "dayNamesMin": ["D","S","T","Q","Q","S","S"],
        "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        "today": "Hoje",
        "weekHeader": "Sem",
        "weak": 'Fraca',
        "medium": 'Média',
        "strong": 'Forte',
        "passwordPrompt": 'Insira uma senha',
        "emptyMessage": 'Nenhum resultado encontrado',
        "emptyFilterMessage": 'Nenhum resultado encontrado',
      });
  }

}
