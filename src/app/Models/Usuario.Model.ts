export interface UsuarioModel {
  usuCod: number;
  usuNome: string;
  usuLogin: string;
  usuSenha: string;
  usuStatus: boolean;
  perfCod: number;

  tokenAcesso: string;
  MensagemErro: string;
}
