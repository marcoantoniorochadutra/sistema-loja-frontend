function editarProduto(id) {
  window.location.href = '/Inicio/Produto/editar/editarProd.html?id=' + id;
}

function excluirProduto(id) {
  fetch('http://localhost:8090/produto/deletar/' + id, {
    method: 'DELETE'
  })
    .then(function(response) {
      if (response.ok) {
        console.log('Produto excluído com sucesso!');
        // Recarregar a tabela de produtos após a exclusão
        document.getElementById('listarBtn').click();
      } else {
        console.error('Erro ao excluir produto:', response.status);
      }
    })
    .catch(function(error) {
      console.error('Erro ao excluir produto:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    document.getElementById('listarBtn').addEventListener('click', function() {
      fetch('http://localhost:8090/produto/listar')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var table = document.getElementById('productTable');

          // Limpar tabela antes de preencher com novos dados
          while (table.rows.length > 1) {
            table.deleteRow(1);
          }

          // Preencher tabela com os dados obtidos da API
          data.forEach(function(product) {
            var row = table.insertRow();
            var nameCell = row.insertCell();
            var qtdCell = row.insertCell();
            var costCell = row.insertCell();
            var priceCell = row.insertCell();
            var actionsCell = row.insertCell();

            nameCell.textContent = product.nome;
            costCell.textContent = product.valorCusto;
            priceCell.textContent = product.valorVenda;
            qtdCell.textContent = product.quantidade;
            
            var editarButton = document.createElement('button');
            editarButton.className = 'editBtn';
            editarButton.textContent = 'Editar';
            editarButton.addEventListener('click', function() {
              editarProduto(product.id);
            });
            actionsCell.appendChild(editarButton);

            var excluirButton = document.createElement('button');
            excluirButton.textContent = 'Excluir';
            excluirButton.style.backgroundColor = 'gray';
            excluirButton.style.color = 'white';
            excluirButton.style.borderRadius = '7px';
            excluirButton.style.cursor = 'pointer'; 
            excluirButton.addEventListener('click', function() {
              excluirProduto(product.id);
            });
            actionsCell.appendChild(excluirButton);
          });
        })
        .catch(function(error) {
          console.log('Erro ao obter dados da API:', error);
        });
    });
  } catch (error) {
    console.error('Erro ao adicionar evento de clique:', error);
  }
});
