
let produtos = [];


function obterDadosDaAPI() {
  return fetch('http://localhost:8090/produto/listar')
    .then(response => response.json())
    .then(data => {
      produtos = data;
      return data;
    })
    .catch(error => {
      console.log('Erro ao obter os dados da API:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  obterDadosDaAPI()
    .then(produtos => carregarProdutos(produtos))
    .catch(error => {
      console.log('Erro:', error);
    });
});

// Função para carregar os produtos da API e preencher o elemento <select>
function carregarProdutos(produtos) {
  var comboBox = document.getElementById('produtoSelecionar');
  produtos.forEach(produto => {
    const option = document.createElement('option');
    option.text = produto.nome;
    option.value = produto.id;
    comboBox.appendChild(option);
  });
}

// Função para preencher o campo de valor de venda com base na opção selecionada
function carregarProduto() {
  const productId = document.getElementById('produtoSelecionar').value

  fetch('http://localhost:8090/produto/buscar/' + productId)
    .then(response => response.json())
    .then(produto => {
      document.getElementById('valorProd').value = produto.valorVenda;
    })
    .catch(error => {
      console.error('Erro ao buscar dados do produto:', error);
    });
}

// Função para calcular o valor total da venda
function calcularVlTotal() {
  const vlVenda = document.getElementById('valorProd').value;
  const qtd = document.getElementById('quantidadeVenda').value;

  document.getElementById('valorTotal').value = vlVenda * qtd;
}

// Função para adicionar o produto à tabela
function adicionarProduto() {
  const produtoSelecionado = document.getElementById('produtoSelecionar');
  const quantidadeVenda = document.getElementById('quantidadeVenda');
  const valorProd = document.getElementById('valorProd');
  const valorTotal = document.getElementById('valorTotal');

  // Verificar se os campos estão preenchidos
  if (produtoSelecionado.value === '' || quantidadeVenda.value === '' || valorProd.value === '' || valorTotal.value === '') {
    alert('Preencha todos os campos antes de adicionar o produto.');
    return;
  }

  // Criar a nova linha da tabela
  const corpoTabela = document.getElementById('corpoTabelaProdutos');
  const novaLinha = document.createElement('tr');

  const colunaProduto = document.createElement('td');
  colunaProduto.textContent = produtoSelecionado.options[produtoSelecionado.selectedIndex].text;

  const colunaQuantidade = document.createElement('td');
  colunaQuantidade.textContent = quantidadeVenda.value;

  const colunaValorVenda = document.createElement('td');
  colunaValorVenda.textContent = valorProd.value;

  const colunaValorTotal = document.createElement('td');
  colunaValorTotal.textContent = valorTotal.value;

  novaLinha.appendChild(colunaProduto);
  novaLinha.appendChild(colunaQuantidade);
  novaLinha.appendChild(colunaValorVenda);
  novaLinha.appendChild(colunaValorTotal);

  corpoTabela.appendChild(novaLinha);

  // Limpar os campos após adicionar o produto
  produtoSelecionado.value = '';
  quantidadeVenda.value = '';
  valorProd.value = '';
  valorTotal.value = '';
  calcularTotalVendas()
}

function calcularTotalVendas() {
  const tabelaProdutos = document.getElementById('corpoTabelaProdutos');
  const linhas = tabelaProdutos.getElementsByTagName('tr');

  let totalVendas = 0;
  const produtos = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const colunaProduto = linha.getElementsByTagName('td')[0];
    const colunaQuantidade = linha.getElementsByTagName('td')[1];
    const colunaValorVenda = linha.getElementsByTagName('td')[2];
    const colunaValorTotal = linha.getElementsByTagName('td')[3];

    const produto = {
      id: i + 1,
      nome: colunaProduto.textContent,
      quantidade: parseInt(colunaQuantidade.textContent),
      valorVenda: parseFloat(colunaValorVenda.textContent),
      valorTotal: parseFloat(colunaValorTotal.textContent)
    };

    produtos.push(produto);

    totalVendas += produto.valorTotal;
  }
  const vlTotal = document.getElementById('vlTotal');
  vlTotal.textContent = totalVendas;
  vlTotal.style.display = 'block'
  return totalVendas;
}

function pegarProdutos() {
  const tabelaProdutos = document.getElementById('corpoTabelaProdutos');
  const linhas = tabelaProdutos.getElementsByTagName('tr');

  const produtos = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const colunaProduto = linha.getElementsByTagName('td')[0];
    const colunaQuantidade = linha.getElementsByTagName('td')[1];
    const colunaValorVenda = linha.getElementsByTagName('td')[2];
    const colunaValorTotal = linha.getElementsByTagName('td')[3];

    const produto = {
      id: i + 1,
      nome: colunaProduto.textContent,
      quantidade: parseInt(colunaQuantidade.textContent),
      valorVenda: parseFloat(colunaValorVenda.textContent),
      valorTotal: parseFloat(colunaValorTotal.textContent)
    };
    produtos.push(produto)
  }
  return produtos
}

function enviarVendaAPI(venda) {
  fetch('http://localhost:8090/operacao/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(venda)
  })
    .then(response => {
      if (response.ok) {
        console.log('Venda cadastrada com sucesso na API.');
      } else if(response.status == 400) {
        console.log(response)
        
      } else {
        throw new Error('Erro ao cadastrar venda na API.');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar venda para a API:', error);
    });
}

function efetuarVenda() {
  var vlT = calcularTotalVendas();
  var prods = pegarProdutos();

  prodJson = []

  prods.forEach(prodsTemp => {
    var prodTemp = produtos.find(produtos => produtos.nome == prodsTemp.nome)
    prodJson.push(prodTemp) 
  })
  const dataAtualFormatada = new Date().toISOString();
  const operacaoDto = {
    produtos: prodJson,
    dataVenda: dataAtualFormatada,
    valorTotal: vlT,
    usuario: {
      id : 1,
      cadastro_nacional : "12605716961",
      email : "marco@dev.com",
      nome : "Marco Antônio",
      numero_celular : "48984654589",
      numero_telefone : "48984654589",
      tipo : 2
    }
  };
  enviarVendaAPI(operacaoDto)
}

  
