import ProdutoManager from "../js/produtoManager.js"
import Produto from "../model/produto.js"

export default class ProdutoController{
    constructor(){
        this.produtoManager = new ProdutoManager();
        document.getElementById("tabela").hidden = true;
        
    }

    lerDados(){
        let id = document.getElementById("idProduto").value;
        let descProduto = document.getElementById("descProduto").value;
        let precoProduto = parseFloat((document.getElementById("precoProduto").value).replace(",","."));
        let precoFormatado =parseFloat(precoProduto.toFixed(2));

        let produto = new Produto(id,descProduto,precoFormatado);
        return produto;
    }
    cadastrar(){              
       let produto = this.lerDados();
       if (produto.descricao=="" || isNaN(produto.preco)) {
          
           this.exibirAlert(msgDanger);
           
       }else{
            this.produtoManager.cadastrar(produto);
            this.listarProdutosTabela();
            this.limparCampos();
            document.getElementById("btnListaProdutos").removeAttribute("disabled");
            this.exibirAlert(msgSuccess);
            document.getElementById("descProduto").focus();
       }
    }

    alterar(id){
        let produto = this.produtoManager.produtoPorId(id);
        document.getElementById("idProduto").value = produto.id;
        document.getElementById("descProduto").value = produto.descricao;
        document.getElementById("precoProduto").value = produto.preco; 
        this.exibirProdutos(false);
    }    

    excluir(idProduto){        
        this.produtoManager.excluir(idProduto);
        this.listarProdutosTabela();
    }
    listarProdutosTabela(){
        let strTabela = this.produtoManager.listarProdutosTabela();
        document.getElementById("tabela").innerHTML = strTabela;        
    }
    exibirProdutos(valor){        
        document.getElementById("divCadastro").hidden = valor;
        document.getElementById("tabela").hidden = !valor;
        document.getElementById("descProduto").focus();
    }
    limparCampos(){
        document.getElementById("idProduto").value = "";
        document.getElementById("descProduto").value = "";
        document.getElementById("precoProduto").value = "";        
    }
    exibirAlert(idAlert){
        $('.alert').hide();
        $(idAlert).show();
        if (idAlert==msgDanger) {
            setTimeout(function () {            
                $(idAlert).hide(); 
            }, 5000);    
        }else{
            setTimeout(function () {            
                $(idAlert).hide(); 
            }, 3000);
        }        
        
    }
     
}