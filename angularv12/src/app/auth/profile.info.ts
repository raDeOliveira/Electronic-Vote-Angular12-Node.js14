// user profile model
export class ProfileInfo {
  name: string;
  email: string;
  password: string;
  nidentificacao: string;
  type_document: string;

  constructor(name: string, email: string, password: string, nidentificacao: string, type_document: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.nidentificacao = nidentificacao;
    this.type_document = type_document;
  }


}
