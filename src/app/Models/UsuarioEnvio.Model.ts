import { EquipeModel } from "./Equipe.Model";
import { UsuarioTbModel } from "./UsuarioTb.Model";

export interface UsuarioEnvioModel{
  objEnvioEquipe: EquipeModel;
  objEnvioListaUsuario: UsuarioTbModel[];
}
