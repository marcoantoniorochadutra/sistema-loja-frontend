document.addEventListener("DOMContentLoaded", function() {
    // Função para buscar os fornecedores da API e preencher o menu suspenso
    function carregarFornecedores() {
      fetch('http://localhost:8090/fornecedor/listar')
        .then(response => response.json())
        .then(fornecedores => {
          var selectFornecedor = document.getElementById('prodDrop');
  
          fornecedores.forEach(fornecedor => {
            var option = document.createElement('option');
            option.value = fornecedor.cadastroNacional;
            option.text = fornecedor.nome;
            selectFornecedor.appendChild(option);
         
            });
        
          carregarProduto(); // Chamar a função após preencher o menu suspenso
        })
        .catch(error => {
          console.error('Erro ao carregar fornecedores:', error);
        });
    }
  
    // Função para buscar os dados do produto selecionado da API e preencher o formulário de edição
    function carregarProduto() {
      var urlParams = new URLSearchParams(window.location.search);
      var productId = urlParams.get('id');
  
      if (!productId) {
        console.error('ID do produto não encontrado na URL');
        return;
      }
  
      fetch('http://localhost:8090/produto/buscar/' + productId)
        .then(response => response.json())
        .then(produto => {
         
          document.getElementById('nome').value = produto.nome;
          document.getElementById('valor_custo').value = produto.valorCusto;
          document.getElementById('valor_venda').value = produto.valorVenda;
          document.getElementById('quantidade').value = produto.quantidade;
          document.getElementById('prodDrop').value = produto.fornecedor.cadastroNacional;
        })
        .catch(error => {
          console.error('Erro ao buscar dados do produto:', error);
        });
    }
  
    
    function atualizarProduto(event) {
      event.preventDefault(); 
  
      var urlParams = new URLSearchParams(window.location.search);
      var productId = urlParams.get('id');
  
      if (!productId) {
        console.error('ID do produto não encontrado na URL');
        return;
      }
  

      var nome = document.getElementById('nome').value;
      var valorCusto = document.getElementById('valor_custo').value;
      var valorVenda = document.getElementById('valor_venda').value;
      var quantidade = document.getElementById('quantidade').value;
      var fornecedorCadastroNacional = document.getElementById('prodDrop').value;
 
      var produtoAtualizado = {
        nome: nome,
        valorCusto: valorCusto,
        valorVenda: valorVenda,
        quantidade: quantidade,
        fornecedorCadastroNacional: fornecedorCadastroNacional
      };
  
    
      fetch('http://localhost:8090/produto/atualizar/' + productId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
      })
        .then(response => {
          if (response.ok) {
            console.log('Produto atualizado com sucesso!');
          
            document.getElementById('mensagemSucesso').textContent = 'Produto atualizado com sucesso!';
            document.getElementById('mensagemContainer').style.display = 'block';
            
            
            setTimeout(function() {
              window.location.href = '/Inicio/Produto/cadProd.html';
            }, 2000);
            
          } else {
            console.error('Erro ao atualizar produto:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao atualizar produto:', error);
        });
    }
  
    // Chamar a função de carregar fornecedores ao carregar a página
    carregarFornecedores();
  
    // Adicionar o evento de envio do formulário
    document.getElementById('editProductForm').addEventListener('submit', atualizarProduto);
  });
  