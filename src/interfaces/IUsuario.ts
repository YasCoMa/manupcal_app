export default interface IUsuario {
    id: number;
    nome: string;
    sobrenome: string;
    permissao_id: number;
    cliente_id: number;
    email: string;
    login: string;
    senha: string;
    confirmaSenha: string;
    status: boolean;
    cliente: any;
    permissao: any;
}
