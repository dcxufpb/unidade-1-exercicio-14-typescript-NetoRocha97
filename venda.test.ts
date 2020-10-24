import { Endereco } from './endereco';
import { Loja } from './loja';
import { Venda } from './venda';
import { ItemVenda } from './itemVenda';
import { Produto } from './produto';

function verificaCampoObrigatorio(mensagemEsperada: string, venda: Venda) {
  try {
    venda.dadosDaVenda();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
    }
}

function verificaCampoObrigatorioProduto(mensagemEsperada: string, produto: Produto) {
  try {
    produto.verificaCampoObrigatorio();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
    }
}

function validaItem(mensagemEsperada: string, item: Venda, produto: Produto, quantidade: number) {
  try {
    venda.adicionarItem(item, produto, quantidade);
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}  

function validaImpressao(mensagemEsperada: string, venda: Venda) {
  try {
    venda.imprimirCupom();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}  

function imprimeCupom(mensagemEsperada: string, venda: Venda) {
  try {
    expect(venda.imprimirCupom()).toBe(mensagemEsperada);
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}  
function validaPagamento(mensagemEsperada: string, venda: Venda) {
  try {
    venda.validaPagamento();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}  

function finalizaVenda(mensagemEsperada: string, venda: Venda) {
  try {
    venda.finalVenda();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}  

const NOME_LOJA = "Loja 1"
const LOGRADOURO = "Log 1"
const NUMERO = 10
const COMPLEMENTO = "C1"
const BAIRRO = "Bai 1"
const MUNICIPIO = "Mun 1"
const ESTADO = "E1"
const CEP = "11111-111"
const TELEFONE = "(11) 1111-1111"
const OBSERVACAO = "Obs 1"
const CNPJ = "11.111.111/1111-11"
const INSCRICAO_ESTADUAL = "123456789"
const CCF_VENDA = "021784"
const COO_VENDA = "035804"

const QUANTIDADE_1 = 10
const QUANTIDADE_2 = 5
const UNIDADE= "cx"
const SUBS_TRIBU = "ST" 
const CODIGO_1 = 100
const DESCRICAO_1 = "Maçã"
const VALOR_UNITARIO_1 = 7.45
const VALOR_UNITARIO_3 = -2
const CODIGO_2 = 101
const DESCRICAO_2 = "Banana"
const VALOR_UNITARIO_2 = 3.32
const CODIGO_3 = 3
const CODIGO_4 = 4

const TIPO_PAGAMENTO_1 = "cartão de crédito"
const TIPO_PAGAMENTO_2 = "cartão de débito"
const TIPO_PAGAMENTO_3 = "dinheiro"

const VALOR_PAGAMENTO = 100

const DATAHORA = "25/11/2020 10:30:40"

let ENDERECO : Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO,
  BAIRRO, MUNICIPIO, ESTADO, CEP);

let LOJA: Loja = new Loja(NOME_LOJA, ENDERECO, TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);

let venda = new Venda(LOJA, DATAHORA, CCF_VENDA, COO_VENDA, TIPO_PAGAMENTO_1, VALOR_PAGAMENTO);

//Mensagens 
const TEXTO_ESPERADO_CUPOM_COMPLETO = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
25/11/2020 10:30:40V CCF:021784 COO: 035804
CUPOM FISCAL
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 100 Maçã 10 cx 7.45 ST 74.50
------------------------------
TOTAL R$ 74.50
Dinheiro 100.00
Troco R$ 25.50`


let venda_sem_itens: Venda = new Venda(LOJA, DATAHORA, CCF_VENDA, COO_VENDA, TIPO_PAGAMENTO_1, VALOR_PAGAMENTO);

let produto01: Produto = new Produto(
  CODIGO_1, 
  DESCRICAO_1, 
  UNIDADE, 
  VALOR_UNITARIO_1, 
  SUBS_TRIBU
);

let produto02: Produto = new Produto(
  CODIGO_2, 
  DESCRICAO_2, 
  UNIDADE, 
  VALOR_UNITARIO_2, 
  SUBS_TRIBU
);
  

let produto03: Produto = new Produto(
  CODIGO_3, 
  DESCRICAO_1, 
  UNIDADE, 
  VALOR_UNITARIO_3, 
  SUBS_TRIBU
);

let produto04: Produto = new Produto(
  CODIGO_4, 
  DESCRICAO_2, 
  UNIDADE, 
  VALOR_UNITARIO_2, 
  SUBS_TRIBU
);

let produto_gratis: Produto = new Produto(
  CODIGO_1, 
  DESCRICAO_1, 
  UNIDADE, 
  0, 
  SUBS_TRIBU
);

let item01: ItemVenda = new ItemVenda(1, produto01, QUANTIDADE_1)

let item02: ItemVenda = new ItemVenda(2, produto01, QUANTIDADE_2)

let vendaComDoisItens: Venda = new Venda(
  LOJA, 
  DATAHORA,
  CCF_VENDA, COO_VENDA, 
  TIPO_PAGAMENTO_1,
  VALOR_PAGAMENTO,   
  new Array<ItemVenda>(item01, item02)

)
let item03: ItemVenda = new ItemVenda(3, produto03, QUANTIDADE_1)

let item04: ItemVenda = new ItemVenda(4, produto04, QUANTIDADE_2)

let vendaComDoisItensNegativo: Venda = new Venda(
  LOJA, 
  DATAHORA,
  CCF_VENDA,
  COO_VENDA, 
  TIPO_PAGAMENTO_1,
  VALOR_PAGAMENTO, 
  new Array<ItemVenda>(item03, item04)
)

let vendaComUmItem: Venda = new Venda(
  LOJA, 
  DATAHORA,
  CCF_VENDA, COO_VENDA, 
  TIPO_PAGAMENTO_3,
  VALOR_PAGAMENTO,   
  new Array<ItemVenda>(item01)

)

test('ccf vazio', () => {
  let ccf_vazio: Venda = new Venda(LOJA, DATAHORA, "", COO_VENDA,  TIPO_PAGAMENTO_1, VALOR_PAGAMENTO);
    verificaCampoObrigatorio(`O campo CCF da venda é obrigatório`, ccf_vazio);
});

test('coo vazio', () => {
  let coo_vazio: Venda = new Venda(LOJA, DATAHORA, CCF_VENDA, "",  TIPO_PAGAMENTO_1, VALOR_PAGAMENTO);
    verificaCampoObrigatorio(`O campo COO da venda é obrigatório`, coo_vazio);
});

test('código vazio', () => {
  let codigo_vazio: Produto = new Produto(0, DESCRICAO_1, UNIDADE, VALOR_UNITARIO_1, SUBS_TRIBU);
    verificaCampoObrigatorioProduto("O campo código do produto é obrigatório", codigo_vazio)
 })


 test('descrição vazia', () => {
  let descricao_vazia: Produto = new Produto(CODIGO_1, "", UNIDADE, VALOR_UNITARIO_1, SUBS_TRIBU);
    verificaCampoObrigatorioProduto("O campo descrição do produto é obrigatório", descricao_vazia)
 }) 


 test('unidade vazia', () => {
  let unidade_vazia: Produto = new Produto(CODIGO_1, DESCRICAO_1, "", VALOR_UNITARIO_1, SUBS_TRIBU);
    verificaCampoObrigatorioProduto("O campo unidade do produto é obrigatório", unidade_vazia)
 })

 test('valor unitário vazio', () => {
  let valor_unit_vazio: Produto = new Produto(CODIGO_1, DESCRICAO_1, UNIDADE, 0, SUBS_TRIBU);
    verificaCampoObrigatorioProduto("O campo valor unitário do produto é obrigatório", valor_unit_vazio)
 })

test('substituição tributária vazio', () => {
  let substrib_vazio: Produto = new Produto(CODIGO_1, DESCRICAO_1, UNIDADE, VALOR_UNITARIO_1, "");
    verificaCampoObrigatorioProduto("O campo substituição tributária do produto é obrigatório", substrib_vazio)
 })

test('Sem itens', () =>{
  validaImpressao("Venda sem itens", venda_sem_itens)
});

test('Item duplicado', () =>{
  validaItem("Produto duplicado", vendaComDoisItens, produto01, 5)
});

test('Quantidade do item', () =>{
  validaItem("Item com quantidade zero ou negativa", venda_sem_itens, produto01, 0)
});

test('Valor produto', () =>{
  validaItem("Produto com valor unitário zero ou negativo", vendaComDoisItensNegativo, produto_gratis, 3)
});

test('Valida Pagamento', () => {
  let valida_pagamento: Venda = new Venda(LOJA, DATAHORA, CCF_VENDA, COO_VENDA, "", VALOR_PAGAMENTO);
    validaPagamento("Tipo de pagamento inválido", valida_pagamento);
});

test('Valida tipo do Pagamento', () => {
  let valida_tipo_pagamento: Venda = new Venda(LOJA, DATAHORA, CCF_VENDA, COO_VENDA, TIPO_PAGAMENTO_3, VALOR_PAGAMENTO, new Array<ItemVenda>(item01));
    validaPagamento("Operação inválida", valida_tipo_pagamento);
});

test('Valida troco', () => {
  let valida_troco: Venda = new Venda(LOJA, DATAHORA, CCF_VENDA, COO_VENDA, TIPO_PAGAMENTO_3, 100, new Array<ItemVenda>(item01));
    finalizaVenda("89", valida_troco);
});

test('Imprimir cupom', () => {
    imprimeCupom(TEXTO_ESPERADO_CUPOM_COMPLETO, vendaComUmItem);
});