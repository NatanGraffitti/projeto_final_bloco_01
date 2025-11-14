import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';

export function main() {

    let opcao: number;

    while (true) {
        console.log(colors.bg.black, colors.fg.red)
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("        BEM-VINDO(A) A SIMAS TURBO AUTOPECAS         ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Cadastrar peças                      ");
        console.log("            2 - Listar as peças da filial            ");
        console.log("            3 - Buscar peça por referência           ");
        console.log("            4 - Atualizar dados da peça              ");
        console.log("            5 - Apagar peça do sistema               ");
        console.log("            6 - Receber peças da matriz              ");
        console.log("            7 - Transferir peças entre filiais       ");
        console.log("            8 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 8) {
            console.log(colors.fg.redstrong,"\nAuto peças Simas turbo - Aqui você sai satisfeito!", colors.reset);
            sobre();
            process.exit(0);
        }
        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong,"\n\nCadastrar peças\n\n", colors.reset);



                keyPress();
                break;
            case 2:
                console.log(colors.fg.whitestrong,"\n\nListar as peças da filial\n\n", colors.reset);



                keyPress();
                break;
            case 3:
                console.log(colors.fg.whitestrong,"\n\nBuscar peça por referência\n\n", colors.reset);



                keyPress();
                break;
            case 4:
                console.log(colors.fg.whitestrong,"\n\nAtualizar dados da peça\n\n", colors.reset);


                
                keyPress();
                break;
            case 5:
                console.log(colors.fg.whitestrong,"\n\nApagar peça do sistema\n\n", colors.reset);



                keyPress();
                break;
            case 6:
                console.log(colors.fg.whitestrong,"\n\nReceber peças da matriz\n\n", colors.reset);


                keyPress();
                break;
            case 7:
                console.log(colors.fg.whitestrong,"\n\nTransferir peças entre filiais\n\n", colors.reset);




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
        console.log(colors.reset, "");
        console.log("\nPressione enter para continuar...");
        readlinesync.prompt();
    }

main();