 // Função para buscar os fornecedores da API e preencher o menu suspenso
 function carregarFornecedores() {
    fetch('http://localhost:8090/fornecedor/listar')
      .then(response => response.json())
      .then(fornecedores => {
        var selectFornecedor = document.getElementsByName('fornecedor_cadastro_nacional')[0];
      
        fornecedores.forEach(fornecedor => {
          var option = document.createElement('option');
          option.value = fornecedor.cadastroNacional;
          option.text = fornecedor.nome;
          selectFornecedor.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar fornecedores:', error);
      });
  }

  // Chamar a função de carregar fornecedores ao carregar a página
  window.onload = function() {
    carregarFornecedores();
  };

function cadastrarProduto() {
    var nome = document.getElementsByName('nome')[0].value;
    var valorCusto = document.getElementsByName('valor_custo')[0].value;
    var valorVenda = document.getElementsByName('valor_venda')[0].value;
    var quantidade = document.getElementsByName('quantidade')[0].value;
    var fornecedorCadastroNacional = document.getElementById('fornecedorDrop').value


    var data = {
      nome: nome,
      valorCusto: valorCusto,
      valorVenda: valorVenda,
      quantidade: quantidade,
      fornecedorCadastroNacional: fornecedorCadastroNacional,
      
    };

    fetch('http://localhost:8090/produto/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Produto cadastrado com sucesso:', result);
      // Realizar qualquer outra ação necessária após o cadastro
    })
    .catch(error => {
      console.error('Erro ao cadastrar produto:', error);
      // Realizar qualquer tratamento de erro necessário
    });

    // Limpar os campos após o cadastro
    document.getElementsByName('nome')[0].value = '';
    document.getElementsByName('valor_custo')[0].value = '';
    document.getElementsByName('valor_venda')[0].value = '';
    document.getElementsByName('quantidade')[0].value = '';
    document.getElementsByName('fornecedor_cadastro_nacional')[0].value = '';
  }
  

     
