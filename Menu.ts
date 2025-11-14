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
        console.log(` BEM-VINDO(A) A SIMAS TURBO AUTOPECAS (FILIAL ${numeroNossaFilial})     `);
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("           1 - Cadastrar peças                       ");
        console.log("           2 - Listar as peças da filial             ");
        console.log("           3 - Buscar peça por referência            ");
        console.log("           4 - Atualizar dados da peça               ");
        console.log("           5 - Apagar peça do sistema                ");
        console.log("           6 - Receber peças da matriz               ");
        console.log("           7 - Transferir peças entre filiais        ");
        console.log("           8 - Sair                                  ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("Entre com a opção desejada:                          ");
        console.log("                                                     ");
        opcao = readlinesync.questionInt("");

        if (opcao == 8) {
            console.log(colors.fg.redstrong,"\nAuto peças Simas turbo - Aqui você sai satisfeito!", colors.reset);
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,"\n\nCadastrar peças\n\n", colors.reset);

                console.log("Digite o nome da peça:");
                let nome = readlinesync.question("");
                
                console.log("Digite a referência da peça (número):");
                let ref = readlinesync.questionInt("");
                
                console.log("Digite o tipo da peça (1-Mecanica, 2-Eletrica):");
                let tipo = readlinesync.questionInt("");
                
                console.log("Digite a quantidade em estoque:");
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
                console.log(colors.fg.whitestrong,"\n\nBuscar peça por referência\n\n", colors.reset);

                console.log("Digite a referência da peça:");
                let refBusca = readlinesync.questionInt("");
                let peca = controlador.buscarPorReferencia(refBusca);
                if (peca) {
                    console.log(colors.fg.whitestrong, "\n--- Peça Encontrada ---", colors.reset);
                    peca.exibirDetalhes(); 
                } else {
                    console.log(colors.fg.redstrong, "\nPeça não encontrada!", colors.reset);
                }

                keyPress();
                break;          
            case 4:
                console.log(colors.fg.whitestrong,"\n\nAtualizar dados da peça\n\n", colors.reset);

                console.log("Digite a referência da peça para atualizar:");
                let refAtualizar = readlinesync.questionInt("");

                console.log("Digite o NOVO nome da peça:");
                let novoNome = readlinesync.question("");

                console.log("Digite a NOVA quantidade em estoque:");
                let novaQtd = readlinesync.questionInt("");
                
                controlador.atualizarDadosPeca(refAtualizar, novoNome, novaQtd);

                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong,"\n\nApagar peça do sistema\n\n", colors.reset);

                console.log("Digite a referência da peça para apagar:");
                let refApagar = readlinesync.questionInt("");

                controlador.apagarPeca(refApagar);

                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong,"\n\nReceber peças da matriz\n\n", colors.reset);
                
                console.log("Digite a referência da peça (Ex: 101, 102, 201):");
                let refReceber = readlinesync.questionInt("");
                console.log("Digite a quantidade que deseja receber:");
                let qtdReceber = readlinesync.questionInt("");

                controlador.receberDaMatriz(refReceber, qtdReceber, numeroNossaFilial);

                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong,"\n\nTransferir peças entre filiais\n\n", colors.reset);
                
                console.log("Digite a referência da peça que vai transferir:");
                let refTransferir = readlinesync.questionInt("");
                console.log("Digite a quantidade que deseja transferir:");
                let qtdTransferir = readlinesync.questionInt("");
                console.log("Digite o número da Filial de DESTINO:");
                let filialDestino = readlinesync.questionInt("");

                controlador.transferirEntreFiliais(refTransferir, qtdTransferir, filialDestino);

                keyPress();
                break;
            default:
                console.log(colors.fg.whitestrong,"\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
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