import { CheckListRespostasModel } from './CheckListRespostas.Model';
import { EventoModel } from './Evento.Model';

export interface EventoManterModel {
  objEvento: EventoModel;
  listaRespostas: CheckListRespostasModel[];
}
