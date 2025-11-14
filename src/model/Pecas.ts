export abstract class Pecas {
    private _nomePeca: string;
    private _referenciaPeca: number;
    private _tipoPeca: number;

    constructor (nomePeca: string, referenciaPeca: number, tipoPeca: number) {
        this._nomePeca = nomePeca;
        this._referenciaPeca = referenciaPeca;
        this._tipoPeca = tipoPeca;
    }

    public get nomePeca() {
        return this._nomePeca;
    }
    public set nomePeca(nomePeca: string) {
        this._nomePeca = nomePeca;
    }
    public get referenciaPeca() {
        return this._referenciaPeca;
    }
    public set referenciaPeca(referenciaPeca: number) {
        this._referenciaPeca = referenciaPeca;
    }
    public get tipoPeca() {
        return this._tipoPeca;
    }
    public set tipoPeca(tipoPeca: number) {
        this._tipoPeca = tipoPeca;
    }

public abstract exibirDetalhes(): void;
}