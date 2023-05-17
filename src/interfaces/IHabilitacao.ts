export default interface IHabilitacao {
    id: number;
    usuario_id: number;
    permissao_id: number;
    sistema_id: number;
    usuario: any;
    permissao: any;
    sistema: any;
    status: boolean;
}