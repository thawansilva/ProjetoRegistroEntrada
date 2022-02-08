"use strict"
// Variáveis e constantes
const entrada = 10;
var txt_total = document.getElementById('caixa_final');
var txt_dinheiro_inicial = document.getElementById('cx_ini');
let entrada_cx_ini = document.querySelector('#box-money');
let quant_adult = document.querySelector('#adulto');
let res_tabela = document.getElementById('res');
let forma_pagamento = {
    dinheiro: 0,
    pix: 0,
    credito: 0,
    debito: 0
};
let array_adultos = [];

// Botão enter
quant_adult.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        adicionar()
    }
});
// Função teste
function teste_valores() {
    let teste = Number(quant_adult.value) > 0 && quant_adult.value != '' ? true : false
    return teste
};
// Função utilitária
function atualizar() {
    let pagamento_select = document.getElementById('pagamento')
    var value = pagamento_select.options[pagamento_select.selectedIndex].value
    return Number(value)
};

function conv_monetario(val) {
    return val.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
};
//Função botões onclick
function adicionar() {
    if (teste_valores() == false) {
        alert('Insira um número válido');
    } else if (entrada_cx_ini.value == '') {
        alert('Insira o valor do caixa inicial');
    } else if (atualizar() === -1) {
        alert('Selecione a forma de pagamento');
    } else {
        var adulto = Number(quant_adult.value);
        var valor = entrada * adulto;
        var txt_dinheiro = document.getElementById('dinheiro');
        var txt_pix = document.getElementById('pix');
        var txt_credito = document.getElementById('credito');
        var txt_debito = document.getElementById('debito');
        array_adultos.push(adulto);
        switch (atualizar()) {
            case 0: {
                forma_pagamento.dinheiro += valor
                break
            }
            case 1: {
                forma_pagamento.pix += valor
                break
            }
            case 2: {
                forma_pagamento.credito += valor
                break
            }
            case 3: {
                forma_pagamento.debito += valor
                break
            }
            default: {
                alert('Tente selecionar a opção novamente')
            }
        }
        txt_dinheiro.innerHTML = conv_monetario(forma_pagamento.dinheiro);
        txt_pix.innerHTML = conv_monetario(forma_pagamento.pix);
        txt_credito.innerHTML = conv_monetario(forma_pagamento.credito);
        txt_debito.innerHTML = conv_monetario(forma_pagamento.debito);
        console.log(array_adultos);
        console.log(forma_pagamento);
    }
    quant_adult.value = '';
    quant_adult.focus();
}

function resultado() {
    if (array_adultos == 0) {
        alert('Adicione as informações necessárias');
    } else {
        txt_dinheiro_inicial.innerHTML = conv_monetario(Number(entrada_cx_ini.value));
        let { //destructuring 
            dinheiro,
            pix,
            credito,
            debito
        } = forma_pagamento;
        let total = dinheiro + pix + credito + debito + Number(entrada_cx_ini.value);
        var total_adultos = 0;
        for (var pos in array_adultos) {
            total_adultos += array_adultos[pos];
        }
        txt_total.innerHTML = conv_monetario(total);
        var txt_resultado_adultos = document.getElementById('txt_res');
        txt_resultado_adultos.innerHTML = `Quantidade total de pessoas: ${total_adultos}`;
    }
}