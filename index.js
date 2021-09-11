const term = require('terminal-kit').terminal;
metodos = require('./metodos')
const prompt = require("prompt-sync")();
console.clear();
term.cyan('Seja bem-vindo(a) ao propragrama para solucionar \n');
term.cyan('O metodo de Método de Newton ou Método das Secantes\n');
term.green('Selecione seu método:\n');
const itens1 = [`a. Método de Newton`,`b. Método das Secantes`]
term.singleColumnMenu(itens1 , function( error , response ) {
    
	if(response.selectedIndex === 0){
        console.clear();
        let funcao = prompt("Qual a função? ");
        let precisao = prompt("Qual a precisão desejada? ")
        let xIni = prompt("Qual o X inicial? ")
        let obj = metodos.metodoPadrao(funcao, precisao, xIni)
        let count = 0
        obj.forEach(element => {
            term(`Valor de ^CX${count}: ^G${element.valor}\n`)
            term(`Valor da margem de ^Yerro: ^R${element.erro}\n\n`)
            count++
        });
        term(`Processo finalizado apos ^R${count--}^: interações`)
        process.exit()
        process.exit()
    } else {
        console.clear();
        let funcaoS = prompt("Qual a função? ");
        let precisaoS = prompt("Qual a precisão desejada? ")
        let xIni1 = prompt("Qual o X inicial 1? ")
        let xIni2 = prompt("Qual o X inicial 2? ")
        let objS = metodos.metodoSecantes(funcaoS, xIni1, xIni2, precisaoS)
        let count = 0
        objS.forEach(element => {
            term(`Valor de ^CX${count}: ^G${element.valor}\n`)
            term(`Valor da margem de ^Yerro: ^R${element.erro}\n\n`)
            count++
        });
        term(`Processo finalizado apos ^R${count--}^: interações`)
        process.exit()
    }
});