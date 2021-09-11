const math = require("mathjs")

module.exports.metodoPadrao = (funcao, precisao, xAntigo) => {
    funcao = fazerCheck(funcao)
    if(typeof precisao === "string"){
        precisao = fazerCheck(precisao)
        precisao = Number(precisao);
    }
    if(typeof xAntigo === "string"){
        xAntigo = fazerCheck(xAntigo)
        xAntigo = Number(xAntigo);
    }
    let derivada =  math.derivative(funcao, 'x');
    derivada = derivada.compile()
    let functionOBJ = []
    let xAtual = 0
    let valor = 0
    let erro = 1
    let testeDeCondicao = false

    functionOBJ.push({
        valor: xAntigo,
        erro: erro
    })

    while(testeDeCondicao == false) {
        try {
            valor = math.evaluate(`(${funcao})/(${derivada.evaluate({x:xAntigo})})`, {x:xAntigo})
            xAtual = xAntigo - valor
            functionOBJ.push({
                valor: xAtual,
                erro: erro
            })
            erro = math.abs(xAtual - xAntigo)
            xAntigo = xAtual
            if(erro <= precisao){
                valor = math.evaluate(`(${funcao})/(${derivada.evaluate({x:xAntigo})})`, {x:xAntigo})
                xAtual = xAntigo - valor
                functionOBJ.push({
                    valor: xAtual,
                    erro: erro
                })
                testeDeCondicao = true
            }
        } catch (error) {
            console.log(error)
        }
    }
    return functionOBJ;
}

module.exports.metodoSecantes = (funcao, xini1, xini2, precisao) => {
    //funcao = funcao.replace("X", "x")
    funcao = fazerCheck(funcao) 
    if(typeof xini1 === "string"){
        xini1 = fazerCheck(xini1)
        xini1 = Number(xini1);
    }
    if(typeof xini2 === "string"){
        xini2 = fazerCheck(xini2)
        xini2 = Number(xini2);
    }
    if(typeof precisao === "string"){
        precisao = fazerCheck(precisao)
        precisao = Number(precisao);
    }
    let erroS = 1
    let xAtualS = 0
    let functionOBJS = []
    functionOBJS.push({
        valor: xini1,
        erro: erroS
    })
    functionOBJS.push({
        valor: xini2,
        erro: erroS
    })
    let testeDeCondicao = false
    while (testeDeCondicao == false){
        try {
            xAtualS = math.evaluate(`${xini2}-((${xini2}-${xini1})/((${math.evaluate(funcao,{x:xini2})})-(${math.evaluate(funcao,{x:xini1})})))*${math.evaluate(funcao,{x:xini2})}`)
            functionOBJS.push({
                valor: xAtualS,
                erro: erroS
            })
            xini1 = xini2
            xini2 = xAtualS
            erroS = math.abs(xini2 - xini1)
            if(erroS <= precisao){
                xAtualS = math.evaluate(`${xini2}-((${xini2}-${xini1})/((${math.evaluate(funcao,{x:xini2})})-(${math.evaluate(funcao,{x:xini1})})))*${math.evaluate(funcao,{x:xini2})}`)
                functionOBJS.push({
                    valor: xAtualS,
                    erro: erroS
                })
                testeDeCondicao = true
            }
        } catch (error) {
            console.log(error)
        }
    }
    return functionOBJS
}

function fazerCheck(text){
    text = text.replace("X", "x")
    text = text.replace(" ", "")
    text = text.replace(",", ".")
    return text
}