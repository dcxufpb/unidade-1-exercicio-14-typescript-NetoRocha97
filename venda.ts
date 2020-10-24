import { Loja } from "./loja"
import { ItemVenda } from "./itemVenda"
import { Produto } from './produto'

export class Venda {

    constructor(
        public loja: Loja,
        public datahora: string,
        public ccf: string,
        public coo: string,
        public tipoPagamento: string,
        public valorPagamento: number,
        public _itens: Array<ItemVenda> = new Array<ItemVenda>()) {}

    public verificaItemDuplicado(codigo: number){
        for(let item of this._itens) {
            if (item.produto.codigo == codigo)
                return true
        }
        return false
    }

    public validarItemAdicionado(produto : Produto, quantidade : number) : void {

        if (produto.valorUnitario <= 0)
            throw new Error(`Produto com valor unitário zero ou negativo`)

        if (quantidade <= 0)
            throw new Error(`Item com quantidade zero ou negativa`)
        
        if (this.verificaItemDuplicado(produto.codigo))
            throw new Error(`Produto duplicado`) 
    }

    public verificaCampoObrigatorio(): void {
  
        if (!this.datahora)
            throw new Error(`O campo datahora da venda é obrigatório`)
        
        if(this.ccf == "")
            throw new Error("O campo CCF da venda é obrigatório")
      
        if(this.coo == "")
            throw new Error("O campo COO da venda é obrigatório")
    }

    public adicionarItem(venda: Venda, produto: Produto, quantidade: number) {

        venda._itens.forEach(itemVenda => {
            this.validarItemAdicionado(itemVenda.produto, quantidade)
            let novoItemVenda = new ItemVenda(itemVenda.item, itemVenda.produto, quantidade)
            this._itens.push(novoItemVenda)
        })
    }
        
    public dadosDaVenda(): String {

      this.verificaCampoObrigatorio();

      return `${this.datahora}V CCF:${this.ccf} COO: ${this.coo}`;          
    }

    public dados_Itens(): string {

        let _dados = `ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)\n`
        this._itens.forEach(i => {
          _dados = _dados + i.dadosDoItem() + `\n`
        });
        return _dados;
    }

    public valorTotal(): number{
        let total = 0;
        this._itens.forEach(i => {
          total += i.valorDoItem();
        })
        return total;
    }
    
    public validaPagamento(): void {

        if(!(this.tipoPagamento == "dinheiro" || this.tipoPagamento == "cartão de crédito" || this.tipoPagamento == "cartão de débito"))
            throw new Error("Tipo de pagamento inválido")

        if(this.valorPagamento < this.valorTotal())
            throw new Error("Operação inválida") 
    }

    public calcularRetorno(): number {

        let valorTroco: number;

        if(!(this.tipoPagamento == "dinheiro"))
            valorTroco = 0;

        else
            valorTroco = this.valorPagamento - this.valorTotal();

        return valorTroco;
    }

    public finalVenda(): string{

        this.validaPagamento();

        let troco: number = this.calcularRetorno();

        return troco.toString();
    }

    public imprimirCupom(): string{
        this.verificaCampoObrigatorio();
        let dadosLoja = this.loja.dadosDaLoja();
        let dadosDaVenda = this.dadosDaVenda();
        let total = this.valorTotal();
        let cupom = `${dadosLoja}------------------------------\n${dadosDaVenda}\nCUPOM FISCAL\n${this.dados_Itens()}------------------------------\nTOTAL R$ ${total.toFixed(2)}\nDinheiro ${this.valorPagamento.toFixed(2)}\nTroco R$ ${this.calcularRetorno().toFixed(2)}`;

    return cupom;

    }
    
}