import { Pecas } from "../model/Pecas";
import { PecasFilial } from "../model/PecasFilial";
import { PecasMatriz } from "../model/PecasMatriz";
import { colors } from '../util/Colors';
import { PecaRepository } from "../repository/PecasRepository";

export class PecaController implements PecaRepository {

    private listaPecasFilial: PecasFilial[] = [];
    private listaPecasMatriz: PecasMatriz[] = [];

    constructor() {
        this.listaPecasMatriz.push(new PecasMatriz("Turbo", 101, 1, 10));
        this.listaPecasMatriz.push(new PecasMatriz("Injetor", 102, 1, 5));
        this.listaPecasMatriz.push(new PecasMatriz("Sensor", 201, 2, 8));
    }

    private buscarNaFilial(referencia: number): PecasFilial | undefined {
        for (let peca of this.listaPecasFilial) {
            if (peca.referenciaPeca === referencia) {
                return peca;
            }
        }
        return undefined;
    }

    private buscarIndiceNaFilial(referencia: number): number {
        for (let i = 0; i < this.listaPecasFilial.length; i++) {
            if (this.listaPecasFilial[i].referenciaPeca === referencia) {
                return i;
            }
        }
        return -1;
    }

    public buscarNaMatriz(referencia: number): PecasMatriz | undefined {
        for (let peca of this.listaPecasMatriz) {
            if (peca.referenciaPeca === referencia) {
                return peca;
            }
        }
        return undefined;
    }

    public cadastrarPeca(nome: string, referencia: number, tipo: number, filial: number, qtd: number): void {
        
        let pecaFilial = this.buscarNaFilial(referencia); 
        let pecaMatriz = this.buscarNaMatriz(referencia); 

        if (pecaFilial || pecaMatriz) {
            throw new Error("\nEsta Referência já está em uso!");
        }

        let novaPeca = new PecasFilial(nome, referencia, tipo, filial, qtd);
        this.listaPecasFilial.push(novaPeca); 

        console.log(colors.fg.whitestrong, "\nPeça cadastrada com sucesso!", colors.reset);
    }

    public listarPecasFilial(): void {
        if (this.listaPecasFilial.length === 0) { 
            console.log(colors.fg.redstrong, "\nO estoque da filial está vazio!", colors.reset);
            return;
        }
        console.log(colors.fg.whitestrong, "\n- Peças na Filial -", colors.reset);
        for (let peca of this.listaPecasFilial) { 
            console.log(colors.fg.whitestrong, "--------------------", colors.reset);
            peca.exibirDetalhes();
        }
    }

    public listarPecasMatriz(): void {
        if (this.listaPecasMatriz.length === 0) { 
            console.log(colors.fg.redstrong, "\nO estoque da Matriz está vazio!", colors.reset);
            return;
        }
        console.log(colors.fg.whitestrong, "\n- Peças na Matriz -", colors.reset);
        for (let peca of this.listaPecasMatriz) { 
            console.log(colors.fg.whitestrong, "--------------------", colors.reset);
            peca.exibirDetalhes();
        }
    }

    public buscarPorReferencia(referencia: number): Pecas {
        
        let peca = this.buscarNaFilial(referencia); 
        if (peca) {
            return peca;
        }

        let pecaMatriz = this.buscarNaMatriz(referencia); 
        if (pecaMatriz) {
            return pecaMatriz;
        }
        
        throw new Error("\nPeça não encontrada!");
    }

    public atualizarDadosPeca(referencia: number, novoNome: string, novaQtd: number): void {
        
        let pecaParaAtualizar = this.buscarNaFilial(referencia); 

        if (pecaParaAtualizar) {
            pecaParaAtualizar.nomePeca = novoNome;
            pecaParaAtualizar.estoqueFilial = novaQtd;
            console.log(colors.fg.whitestrong, "\nPeça atualizada com sucesso!", colors.reset);
        } else {
            throw new Error("\nPeça não encontrada no estoque da Filial!");
        }
    }

    public apagarPeca(referencia: number): void {

        let indice = this.buscarIndiceNaFilial(referencia); 

        if (indice !== -1) {
            this.listaPecasFilial.splice(indice, 1);
            console.log(colors.fg.whitestrong, "\nPeça apagada com sucesso!", colors.reset);
        } else {
            throw new Error("\nPeça não encontrada!");
        }
    }

    public receberDaMatriz(referencia: number, quantidade: number, filial: number): void {
        
        let pecaMatriz = this.buscarNaMatriz(referencia); 
        let pecaFilial = this.buscarNaFilial(referencia); 

        if (!pecaMatriz) {
            throw new Error("\nPeça não encontrada na Matriz!");
        }
        if (pecaMatriz.estoqueMatriz < quantidade) {
            throw new Error("\nEstoque da Matriz é insuficiente!");
        }

        pecaMatriz.estoqueMatriz = pecaMatriz.estoqueMatriz - quantidade;

        if (pecaFilial) {
            pecaFilial.estoqueFilial = pecaFilial.estoqueFilial + quantidade;
        } else {
            let novaPecaFilial = new PecasFilial(pecaMatriz.nomePeca, pecaMatriz.referenciaPeca, pecaMatriz.tipoPeca, filial, quantidade);
            this.listaPecasFilial.push(novaPecaFilial);
        }
        console.log(colors.fg.whitestrong, "\nPeças recebidas com sucesso!", colors.reset);
    }

    public transferirEntreFiliais(referencia: number, quantidade: number, filialDestino: number): void {
        
        let pecaFilial = this.buscarNaFilial(referencia); 

        if (!pecaFilial) {
            throw new Error("\nPeça não encontrada no estoque desta Filial!");
        }
        if (pecaFilial.estoqueFilial < quantidade) {
            throw new Error("\nEstoque desta Filial é insuficiente para a transferência!");
        }

        pecaFilial.estoqueFilial = pecaFilial.estoqueFilial - quantidade;
        console.log(colors.fg.whitestrong, `\n${quantidade} peça(s) (Ref: ${referencia}) transferida(s) para a Filial ${filialDestino}.`, colors.reset);
    }
}