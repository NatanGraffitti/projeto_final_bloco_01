import { PecasFilial } from "../model/PecasFilial";
import { PecasMatriz } from "../model/PecasMatriz";
import { colors } from '../util/Colors';
import { PecaRepository } from "../repository/PecasRepository";
import { Pecas } from "../model/Pecas";

export class PecaController implements PecaRepository {

    private listaPecasFilial: PecasFilial[] = [];
    private listaPecasMatriz: PecasMatriz[] = [];
    constructor() {
        this.listaPecasMatriz.push(new PecasMatriz("Turbo", 101, 1, 10));
        this.listaPecasMatriz.push(new PecasMatriz("Injetor", 102, 1, 5));
        this.listaPecasMatriz.push(new PecasMatriz("Sensor", 201, 2, 8));
    }

    public cadastrarPeca(
        nome: string,
        referencia: number,
        tipo: number,
        filial: number,
        qtd: number
    ): void {
        let novaPeca = new PecasFilial(nome, referencia, tipo, filial, qtd);
        this.listaPecasFilial.push(novaPeca);
        console.log(colors.fg.whitestrong, "\nPeça cadastrada com sucesso!", colors.reset);
    }

    public listarPecasFilial(): void {
        if (this.listaPecasFilial.length === 0) {
            console.log(colors.fg.redstrong, "\nO estoque da filial está vazio!", colors.reset);
            return;
        }
        console.log(colors.fg.whitestrong, "\n--- Peças na Filial ---", colors.reset);
        for (let peca of this.listaPecasFilial) {
            console.log(colors.fg.whitestrong, "--------------------", colors.reset);
            peca.exibirDetalhes();
        }
    }
    public buscarPorReferencia(nome: string): Pecas | undefined;
    public buscarPorReferencia(referencia: number): Pecas | undefined;
    public buscarPorReferencia(parametro: number | string): Pecas | undefined {
        if (typeof parametro === 'number') {
            for (let peca of this.listaPecasFilial) {
                if (peca.referenciaPeca === parametro) {
                    return peca;
                }
            }
            for (let peca of this.listaPecasMatriz) {
                if (peca.referenciaPeca === parametro) {
                    return peca;
                }
            }
        } else if (typeof parametro === 'string') {
            for (let peca of this.listaPecasFilial) {
                if (peca.nomePeca === parametro) {
                    return peca;
                }
            }
            for (let peca of this.listaPecasMatriz) {
                if (peca.nomePeca === parametro) {
                    return peca;
                }
            }
        }
        return undefined;
    }

    public atualizarDadosPeca(
        referencia: number,
        novoNome: string,
        novaQtd: number
    ): void {
        let pecaParaAtualizar = this.buscarPorReferencia(referencia);
        if (pecaParaAtualizar && pecaParaAtualizar instanceof PecasFilial) {
            pecaParaAtualizar.nomePeca = novoNome;
            pecaParaAtualizar.estoqueFilial = novaQtd;
            console.log(colors.fg.whitestrong, "\nPeça atualizada com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.redstrong, "\nPeça não encontrada no estoque da Filial!", colors.reset);
        }
    }

    public apagarPeca(referencia: number): void {

        let indice = -1;
        for (let i = 0; i < this.listaPecasFilial.length; i++) {
            if (this.listaPecasFilial[i].referenciaPeca === referencia) {
                indice = i;
                break;
            }
        }
        if (indice !== -1) {
            this.listaPecasFilial.splice(indice, 1);
            console.log(colors.fg.whitestrong, "\nPeça apagada com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.redstrong, "\nPeça não encontrada!", colors.reset);
        }
    }

    public receberDaMatriz(referencia: number, quantidade: number, filial: number): void {

        let pecaMatriz = this.buscarNaMatriz(referencia);
        let pecaFilial = this.buscarPorReferencia(referencia);
        if (!pecaMatriz) {
            console.log(colors.fg.redstrong, "\nPeça não encontrada na Matriz!", colors.reset);
            return;
        }
        if (pecaMatriz.estoqueMatriz < quantidade) {
            console.log(colors.fg.redstrong, "\nEstoque da Matriz é insuficiente!", colors.reset);
            return;
        }

        pecaMatriz.estoqueMatriz = pecaMatriz.estoqueMatriz - quantidade;
        if (pecaFilial && pecaFilial instanceof PecasFilial) {
            pecaFilial.estoqueFilial = pecaFilial.estoqueFilial + quantidade;
        } else {
            let novaPecaFilial = new PecasFilial(
                pecaMatriz.nomePeca,
                pecaMatriz.referenciaPeca,
                pecaMatriz.tipoPeca,
                filial,
                quantidade
            );
            this.listaPecasFilial.push(novaPecaFilial);
        }
        console.log(colors.fg.whitestrong, "\nPeças recebidas com sucesso!", colors.reset);
    }

    public transferirEntreFiliais(
        referencia: number,
        quantidade: number,
        filialDestino: number
    ): void {
        let pecaFilial = this.buscarPorReferencia(referencia);
        if (!pecaFilial || !(pecaFilial instanceof PecasFilial)) {
            console.log(colors.fg.redstrong, "\nPeça não encontrada no estoque desta Filial!", colors.reset);
            return;
        }
        if (pecaFilial.estoqueFilial < quantidade) {
            console.log(colors.fg.redstrong, "\nEstoque desta Filial é insuficiente para a transferência!", colors.reset);
            return;
        }
        pecaFilial.estoqueFilial = pecaFilial.estoqueFilial - quantidade;
        console.log(colors.fg.whitestrong, `\n${quantidade} peça(s) (Ref: ${referencia}) transferida(s) para a Filial ${filialDestino}.`, colors.reset);
    }

    public buscarNaMatriz(referencia: number): PecasMatriz | undefined {
        for (let peca of this.listaPecasMatriz) {
            if (peca.referenciaPeca === referencia) {
                return peca;
            }
        }
        return undefined;
    }
}