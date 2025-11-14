import { Pecas } from "./Pecas";

export class PecasMatriz extends Pecas {

    constructor(nomePeca: string, referenciaPeca: number, tipoPeca: number, private _estoqueMatriz: number
    ) {
        super(nomePeca, referenciaPeca, tipoPeca);
    }

    public get estoqueMatriz() {
        return this._estoqueMatriz;
    }
    public set estoqueMatriz(estoqueMatriz: number) {
        this._estoqueMatriz = estoqueMatriz;
    }
    public exibirDetalhes(): void {
        console.log(`Nome: ${this.nomePeca}`);
        console.log(`Referência: ${this.referenciaPeca}`);
        console.log(`Estoque na Matriz: ${this._estoqueMatriz}`);
    }
}