import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';
import { PecaController } from "./src/controller/PecasController";

export function main() {

    let opcao: number;
    let controlador = new PecaController();
    let numeroNossaFilial = 1;

    while (true) {
        console.log(colors.bg.black, colors.fg.red)
        console.log("*****************************************************");
        console.log(` BEM-VINDO(A) A SIMAS TURBO AUTOPECAS (FILIAL ${numeroNossaFilial}     )`);
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("               1 - Cadastrar peças                   ");
        console.log("               2 - Listar as peças da filial         ");
        console.log("               3 - Listar peças da Matriz            ");
        console.log("               4 - Atualizar dados da peça           ");
        console.log("               5 - Apagar peça do sistema            ");
        console.log("               6 - Receber peças da matriz           ");
        console.log("               7 - Transferir peças entre filiais    ");
        console.log("               8 - Buscar peça por referência        ");
        console.log("               9 - Sair                              ");
        console.log("                                                     ");
        console.log("*****************************************************", colors.reset);
        console.log("                                                     ");
        console.log("Entre com a opção desejada:                          ");
        console.log("                                                     ");
        opcao = readlinesync.questionInt("");
        
            if (opcao == 9) {
            console.log(colors.fg.redstrong,"\nAuto peças Simas turbo - Aqui você sai satisfeito!", colors.reset);
            sobre();
            process.exit(0);
        }

        try {
            switch (opcao) {
                case 1:
                    console.log(colors.fg.whitestrong,"\n\nCadastrar peças\n\n", colors.reset);

                    console.log("\nDigite o nome da peça:");
                    let nome = readlinesync.question("");
                    console.log("\nDigite a referência da peça (número):");
                    let ref = readlinesync.questionInt("");
                    console.log("\nDigite o tipo da peça (1-Mec, 2-Elet):");
                    let tipo = readlinesync.questionInt("");
                    console.log("\nDigite a quantidade em estoque:");
                    let qtd = readlinesync.questionInt("");

                    controlador.cadastrarPeca(nome, ref, tipo, numeroNossaFilial, qtd);

                    keyPress();
                    break;
                case 2:
                    console.log(colors.fg.whitestrong,"\n\nListar as peças da filial\n\n", colors.reset);

                    controlador.listarPecasFilial();

                    keyPress();
                    break;
                case 3:
                    console.log(colors.fg.whitestrong,"\n\nListar peças da Matriz\n\n", colors.reset);
                    controlador.listarPecasMatriz();
                    keyPress();
                    break;
                case 4:
                    console.log(colors.fg.whitestrong,"\n\nAtualizar dados da peça\n\n", colors.reset);

                    console.log("\nDigite a referência da peça para atualizar:");
                    let refAtualizar = readlinesync.questionInt("");
                    console.log("\nDigite o NOVO nome da peça:");
                    let novoNome = readlinesync.question("");
                    console.log("\nDigite a NOVA quantidade em estoque:");
                    let novaQtd = readlinesync.questionInt("");
                    
                    controlador.atualizarDadosPeca(refAtualizar, novoNome, novaQtd);

                    keyPress();
                    break;
                case 5:
                    console.log(colors.fg.whitestrong,"\n\nApagar peça do sistema\n\n", colors.reset);

                    console.log("\nDigite a referência da peça para apagar:");
                    let refApagar = readlinesync.questionInt("");

                    controlador.apagarPeca(refApagar);

                    keyPress();
                    break;
                case 6:
                    console.log(colors.fg.whitestrong,"\n\nReceber peças da matriz\n\n", colors.reset);
                    
                    console.log("\nDigite a referência da peça (Ex: 101, 102, 201):");
                    let refReceber = readlinesync.questionInt("");
                    console.log("\nDigite a quantidade que deseja receber:");
                    let qtdReceber = readlinesync.questionInt("");

                    controlador.receberDaMatriz(refReceber, qtdReceber, numeroNossaFilial);

                    keyPress();
                    break;
                case 7:
                    console.log(colors.fg.whitestrong,"\n\nTransferir peças entre filiais\n\n", colors.reset);
                    
                    console.log("\nDigite a referência da peça que vai transferir:");
                    let refTransferir = readlinesync.questionInt("");
                    console.log("\nDigite a quantidade que deseja transferir:");
                    let qtdTransferir = readlinesync.questionInt("");
                    console.log("\nDigite o número da Filial de DESTINO:");
                    let filialDestino = readlinesync.questionInt("");

                    controlador.transferirEntreFiliais(refTransferir, qtdTransferir, filialDestino);

                    keyPress();
                    break;
                case 8: 
                    console.log(colors.fg.whitestrong,"\n\nBuscar peça por referência\n\n", colors.reset);
                    console.log("\nDigite a referência da peça:");
                    let refBusca = readlinesync.questionInt("");
                    
                    let peca = controlador.buscarPorReferencia(refBusca);

                    console.log(colors.fg.whitestrong, "\nPeça Encontrada", colors.reset);
                    peca.exibirDetalhes(); 
                    
                    keyPress();
                    break;
            }
        } catch (erro: any) {
            console.log(colors.fg.redstrong, erro.message, colors.reset);
            keyPress();
        }
    } 
}

    export function sobre(): void {
        console.log(colors.fg.whitestrong,"\n*****************************************************");
        console.log("\nProjeto Desenvolvido por: ");
        console.log("Natan Graffitti - Avaliativo 14/11/2025");
        console.log("\n*****************************************************", colors.reset);
    }

    function keyPress(): void {
        console.log("");
        console.log(colors.fg.whitestrong,"\nPressione enter para continuar...", colors.reset);
        readlinesync.prompt();
    }

main();