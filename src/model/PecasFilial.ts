import { Pecas } from "./Pecas";

export class PecasFilial extends Pecas {

    constructor(nomePeca: string, referenciaPeca: number, tipoPeca: number, quantDePecas: number, private _numeroFilial: number, private _estoqueFilial: number) {
        super(nomePeca, referenciaPeca, tipoPeca, quantDePecas);
    }

    public get numeroFilial() {
        return this._numeroFilial;
    } 

    public get estoqueFilial() {
        return this._estoqueFilial;
    }
    public set estoqueFilial(estoqueFilial: number) {
        this._estoqueFilial = estoqueFilial;
    }

    /*public listarPecasFilial(){

    }*/
}