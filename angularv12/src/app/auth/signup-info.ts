// user register model
export class SignUpInfo {
  name: string;
  email: string;
  password: string;
  nidentificacao: string;
  type_document: string;
  access_code: string;

  constructor(name: string, email: string, password: string, nidentificacao: string, type_document: string,
              access_code: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.nidentificacao = nidentificacao;
    this.type_document = type_document;
    this.access_code = access_code;
  }
}
