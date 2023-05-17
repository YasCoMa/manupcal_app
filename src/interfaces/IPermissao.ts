export default interface IPermissao {
    id: number;
    identificador: string;
    sistema_id: number;
    cliente_id: number;
    status: boolean;
    sistema: any;
    cliente: any;
    modulos: any;
}