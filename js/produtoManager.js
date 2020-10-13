export default class ProdutoManager{
    constructor(){
        this.produtos = [];        
    }

    cadastrar(produto){         
        if (produto.id == "") {
            let ultimoId=0; 
            //Primeiro produto do array
            if (this.produtos.length==0) {
                produto.id = 1;     
            }else{
              this.produtos.forEach( prod => {
                      if (prod.id >= ultimoId) {
                          ultimoId=prod.id;
                      }
                  }
              );                
                produto.id = ultimoId + 1;
            }  
                       
            this.produtos.push(produto);            
        }else{
            let index = this.produtos.findIndex(prod=>prod.id == produto.id)
            //let index = this.produtos.indexOf(produto.id);
            this.produtos[index].descricao = produto.descricao;
            this.produtos[index].preco = produto.preco;
        }  
        
        
    }
    excluir(idProduto){
        let index = this.produtos.findIndex(prod=>prod.id==idProduto);
        this.produtos.splice(index,1);  
        
    }

    produtoPorId(id){
        return this.produtos.find(produto=>produto.id==id)
    }

    somaTotal(){
        let soma=0;
        this.produtos.forEach(produto => {
            soma = soma + produto.preco;
        });
        return soma;
    }

    converterParaReal(valor){
        let val = valor.replace(",",".");
        let val1 = valor.toLocaleString('pt-br',{style:'currency',currency:'BRL'});
        return val1;
    }

    listarProdutosTabela(){
        let strTabela="";
        let strLinhas = "";
       
        if (this.produtos.length>0) {

            //Linhas da tabela
            this.produtos.forEach(produto => {
                strLinhas += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.preco.toLocaleString('pt-br',{minimumFractionDigits:2})}</td>
                    <td>
                        <button onclick="prodController.alterar(${produto.id})"><i class="fas fa-edit fa-1x"></i></button>
                        <button onclick="prodController.excluir(${produto.id})"><i class="fas fa-trash fa-1x"></i></button>
                    </td>
                </tr> 
                `
            });
        }

            strTabela = `            
            <div class="container text-center">
                <hr>
                <h4>Lista de Produtos</h4>              
                
                <div class="container mb-1">
                    <buttom class="btn btn-success btn-md col-12" onclick="prodController.exibirProdutos(false)">Novo Cadastro</buttom>
                </div>
                <hr>
                <table class="table table-striped table-bordered bt-0,5">
                
                    <tr>
                        <th>Id</th>
                        <th>Descrição</th>
                        <th>Preço (R$)</th>
                        <th>#</th>
                    </tr>
                
                    <tb>
                        ${strLinhas}  
                        <tr>
                            <td colspan=2>Total</td>
                            <td>${this.somaTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td></td>
                        </tr>  
                    </tb>

                </table>
            </div>
                `
            
            return strTabela;
        
    }
    
}