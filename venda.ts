import { Loja } from "./loja";
import { ItemVenda } from "./Itemvenda";
import { Produto } from './Produto';

export class Venda {

    constructor(
        public loja: Loja,
        public datahora: Date,
        public ccf: string,
        public coo: string,
        public _itens: Array<ItemVenda> = new Array<ItemVenda>()) {		
            
        //this._itens = item;

        }

        
    //private _itens: Array<ItemVenda>;
    //public get itens(): Array<ItemVenda> {
        //return this._itens;
    //}

    public verificaDuplicacao(codigo: number){
        for(let item of this._itens) {
            if (item.produto.codigo == codigo){
                return true
            }
        }
        return false
    }

    public validar_item_adicionado(produto : Produto, quantidade : number) : void {

        if (produto.valorUnitario <= 0)
            throw new Error(`Produto com valor unitário zero ou negativo`)

        if (quantidade <= 0)
            throw new Error(`Item com quantidade zero ou negativa`)
        
        if (this.verificaDuplicacao(produto.codigo))
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
            this.validar_item_adicionado(itemVenda.produto, quantidade)
            let novoItemVenda = new ItemVenda(itemVenda.item, itemVenda.produto, quantidade)
            this._itens.push(novoItemVenda)

        })
       
    }
        
    public dados_venda(): string {

        function pegarDH(){

            var data = new Date();

            var dia = data.getDate();           
            var mes = data.getMonth();          
            var ano = data.getFullYear();       
            var hora = data.getHours();         
            var min = data.getMinutes();        
            var seg = data.getSeconds();       

            var str_data = `${dia}/${mes}/${ano}`;
            var str_hora = hora + ':' + min + ':' + seg + "V";

            return str_data + str_hora;
        }

        this.verificaCampoObrigatorio();

        let datahora = pegarDH();
    
        let _ccf = " CCF:" + this.ccf;
        let _coo = " COO: " + this.coo;

        return (
`${this.loja.dados_loja()}
${datahora}${_ccf}${_coo}
`)
                
    }

    public dadosItens(): Array<string>{
        let dados = new Array<string>("ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)")
        for (let item of this._itens){
            dados.push(item.dados_item())
        }
        return dados

    }
    public valorTotal(): number {
		const itemsTotal = this._itens.map((item) => {
			return item.valorTotal();
		});
		let total = 0;
		itemsTotal.forEach((value) => {
			total += value;
		});

		return total;
    }
  

    public imprimir_cupom(): string {

		let texto_loja = this.loja.dados_loja();
		let texto_venda = this.dados_venda();
		let texto_itens = this.dadosItens();
        let total = this.valorTotal();

        let cupom: string;
        cupom = `${texto_loja}------------------------------\n${texto_venda}\n   CUPOM FISCAL\n${texto_itens}\n------------------------------\nTOTAL R$ ${total.toFixed(2)}`;
		return cupom;
	}

}