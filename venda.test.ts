import { Endereco } from './endereco';
import { Loja } from './loja';
import { Venda } from './venda';
import { ItemVenda } from './itemVenda';
import { Produto } from './produto';

function verificaCampoObrigatorio(mensagemEsperada: string, venda: Venda) {
  try {
    venda.dados_venda();
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
    venda.imprimir_cupom();
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

const QUANTIDADE01 = 2
const QUANTIDADE02 = 3
const UNIDADE= "R$"
const SUBSTITUICAO_TRIBUTARIA = "ST" 
const CODIGO1 = 1
const DESCRICAO1 = "Maçã"
const VALOR_UNITARIO1 = 1.11
const VALOR_UNITARIO3 = -2
const CODIGO2 = 2
const DESCRICAO2 = "Banana"
const VALOR_UNITARIO2 = 2
const CODIGO3 = 3
const CODIGO4 = 4

const DATAHORA = new Date();

let paramEndereco : Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO,
  BAIRRO, MUNICIPIO, ESTADO, CEP);

let paramLoja: Loja = new Loja(NOME_LOJA, paramEndereco, TELEFONE, OBSERVACAO, CNPJ, INSCRICAO_ESTADUAL);

let venda = new Venda(paramLoja, DATAHORA, CCF_VENDA, COO_VENDA);

const MENSAGEM_VENDA_SEM_ITENS = `Produto duplicado`;
const MENSAGEM_QUANTIDADE = "Item com quantidade zero ou negativa";
const MENSAGEM_VALOR_PRODUTO = "Produto com valor unitário zero ou negativo";


let venda_sem_itens: Venda = new Venda(paramLoja, DATAHORA, CCF_VENDA, COO_VENDA);

let produto01: Produto = new Produto(
  CODIGO1, 
  DESCRICAO1, 
  UNIDADE, 
  VALOR_UNITARIO1, 
  SUBSTITUICAO_TRIBUTARIA
);

let produto02: Produto = new Produto(
  CODIGO2, 
  DESCRICAO2, 
  UNIDADE, 
  VALOR_UNITARIO2, 
  SUBSTITUICAO_TRIBUTARIA
);

  
let produto03: Produto = new Produto(
  CODIGO3, 
  DESCRICAO1, 
  UNIDADE, 
  VALOR_UNITARIO3, 
  SUBSTITUICAO_TRIBUTARIA
);

let produto04: Produto = new Produto(
  CODIGO4, 
  DESCRICAO2, 
  UNIDADE, 
  VALOR_UNITARIO2, 
  SUBSTITUICAO_TRIBUTARIA
);

let produto_gratis: Produto = new Produto(
  CODIGO1, 
  DESCRICAO1, 
  UNIDADE, 
  0, 
  SUBSTITUICAO_TRIBUTARIA
);

let item01: ItemVenda = new ItemVenda(1, produto01, QUANTIDADE01)

let item02: ItemVenda = new ItemVenda(2, produto01, QUANTIDADE02)

let vendaComDoisItens: Venda = new Venda(
  paramLoja, 
  DATAHORA,
  CCF_VENDA, COO_VENDA, 
  new Array<ItemVenda>(item01, item02)
)
let item03: ItemVenda = new ItemVenda(3, produto03, QUANTIDADE01)

let item04: ItemVenda = new ItemVenda(4, produto04, QUANTIDADE02)

let vendaComDoisItensNegativo: Venda = new Venda(
  paramLoja, 
  DATAHORA,
  CCF_VENDA,COO_VENDA, 
  new Array<ItemVenda>(item03, item04)
    )

test('ccf vazio', () => {
  let ccf_vazio: Venda = new Venda(paramLoja, DATAHORA, "", COO_VENDA);
    verificaCampoObrigatorio(`O campo CCF da venda é obrigatório`, ccf_vazio);
});

test('coo vazio', () => {
  let coo_vazio: Venda = new Venda(paramLoja, DATAHORA, CCF_VENDA, "");
    verificaCampoObrigatorio(`O campo COO da venda é obrigatório`, coo_vazio);
});

test('Sem itens', () =>{
  validaImpressao(MENSAGEM_VENDA_SEM_ITENS, venda_sem_itens)
});

test('Item duplicado', () =>{
  validaItem(MENSAGEM_VENDA_SEM_ITENS, vendaComDoisItens, produto01, 5)
});

test('Quantidade do item', () =>{
  validaItem(MENSAGEM_QUANTIDADE, venda_sem_itens, produto01, 0)
});

test('Valor produto', () =>{
  validaItem(MENSAGEM_VALOR_PRODUTO, vendaComDoisItensNegativo, produto_gratis, 3)
});