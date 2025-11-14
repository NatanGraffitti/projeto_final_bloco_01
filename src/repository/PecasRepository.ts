import { Pecas } from "../model/Pecas";

export interface IPecasRepository {
    cadastrar(peca: Pecas): void;
    listar(): Pecas[];
    buscarPorReferencia(referencia: number): Pecas | undefined;
    atualizar(referencia: number, peca: Pecas): boolean;
    apagar(referencia: number): boolean;
}