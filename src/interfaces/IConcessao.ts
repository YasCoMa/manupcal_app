export default interface IConcessao {
    id: number;
    licenca: string;
    data_vencimento: Date;
    vencimento: string;
    cliente_id: number;
    sistema_id: number;
    funcoes: any;
    funcoes_publicas: any;
    funcoes_com_categorizacao: any;
    cliente: any;
    sistema: any;
    status: boolean;
}
