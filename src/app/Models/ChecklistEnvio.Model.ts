import { ChecklistModel } from "./Checklist.Model";
import { ItemCheckListModel } from "./ItemCheckList.Model";

export interface ChecklistEnvioModel {
  objChecklist: ChecklistModel;
  listaItemChecklist: ItemCheckListModel[];
}
