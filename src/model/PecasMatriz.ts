import { Pecas } from "./Pecas";

export class PecasMatriz extends Pecas {

    constructor(nomePeca: string, referenciaPeca: number, tipoPeca: number, quantDePecas: number, private _estoqueMatriz: number) {
        super(nomePeca, referenciaPeca, tipoPeca, quantDePecas);
    }

    public get estoqueMatriz() {
        return this._estoqueMatriz;
    }
    public set estoqueFilial(estoqueMatriz: number) {
        this._estoqueMatriz = estoqueMatriz;
    }


    /*public listarPecasMatriz(){

    }*/
}