const prompt = require("prompt-sync")();
const math = require("mathjs")
const Parser = require('expr-eval').Parser;
const parser = new Parser();
let funcao = prompt("Qual a função? ");
try {
    let derivada =  math.derivative(funcao, 'x');
} catch (error) {
    console.log("A sua função é inválida!")
    return
}
let derivada =  math.derivative(funcao, 'x');
derivada = derivada.compile()
let precisao = prompt("Qual a precisão desejada? ")
try {
    precisao = Number(precisao);
    precisao = Math.abs(precisao)
} catch (error) {
    console.log("Precisão inválida!")
    return
}
let xIni = prompt("Qual o X inicial? ")
try {
    xIni = Number(xIni);
} catch (error) {
    console.log("X inicial inválido!")
}
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
        xAntigo = xAtual
        step++
    } catch (error) {
        console.log(error)
    }

}
