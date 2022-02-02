export interface EventoModel {
  eventCod: number;
  eventDesc: string;
  eventLogr: string;
  eventBairr: string;
  eventDtIn: Date;
  evenDtFi: Date;
  eventObse: string;
  eventStatus: boolean;
  horaCod: number;
  cidaCod: number;
  diamCod: number;
  usuCod: number;
  maqCod: number;
  tipChLiCod: number;

  horaDesc: string;
  cidaDesc: string;
  estSigl: string;
  diamDesc: string;
  usuNome: string;
  maqMarca: string;
  maqModelo: string;
  tipChLiDesc: string;
}
