const prompt = require("prompt-sync")();
const evaluatex = require("evaluatex")
const math = require("mathjs")
const Parser = require('expr-eval').Parser;
const parser = new Parser();
let funcao = prompt("Qual a função? ");
let derivada =  math.derivative(funcao, 'x');
derivada = derivada.compile()
let precisao = prompt("Qual a precisão desejada? ")
precisao = Number(precisao);
let xIni = prompt("Qual o X inicial? ")
xIni = Number(xIni);
let xAtual = 0
let xAntigo = 0
let valor = 0
let step = 0
let erro = 1
if(!xAntigo) xAntigo = xIni

while(erro >= precisao) {
    try {
        valor = math.evaluate(`(${funcao})/(${derivada.evaluate({x:xAntigo})})`, {x:xAntigo})
        xAtual = xAntigo - valor
        console.log(`Passo: ${step}\nValor de X${step+1} = ${xAtual}`)
        erro = Math.abs(xAntigo - xAtual)
        console.log(erro)
        xAntigo = xAtual
        step++
    } catch (error) {
        console.log(error)
    }

}
