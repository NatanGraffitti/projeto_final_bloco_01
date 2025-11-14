import { Pecas } from "../model/Pecas"; 
import { PecasMatriz } from "../model/PecasMatriz";

export interface PecaRepository {
    cadastrarPeca(nome: string, referencia: number, tipo: number, filial: number, qtd: number): void;
    listarPecasFilial(): void;
    buscarPorReferencia(nome: string): Pecas | undefined;
    buscarPorReferencia(referencia: number): Pecas | undefined;
    atualizarDadosPeca(referencia: number, novoNome: string, novaQtd: number): void;
    apagarPeca(referencia: number): void;
    receberDaMatriz(referencia: number, quantidade: number, filial: number): void;
    transferirEntreFiliais(referencia: number, quantidade: number, filialDestino: number): void;
    buscarNaMatriz(referencia: number): PecasMatriz | undefined;

}