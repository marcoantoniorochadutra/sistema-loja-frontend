function editarProduto(cadastroNacional) {
  window.location.href = '/Inicio/Fornecedor/Editar/editarForn.html?cadastroNacional=' + cadastroNacional;
}

function excluirProduto(id) {
  
  fetch('http://localhost:8090/fornecedor/deletar/' + id, {
    method: 'DELETE'
  })
    .then(function(response) {
      if (response.ok) {
        console.log('Fornecedor excluído com sucesso!');
        // Recarregar a tabela de fornecedores após a exclusão
        document.getElementById('listarBtn').click();
      } else {
        console.error('Erro ao excluir fornecedor:', response.status);
      }
    })
    .catch(function(error) {
      console.error('Erro ao excluir fornecedor:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    document.getElementById('listarBtn').addEventListener('click', function() {
      fetch('http://localhost:8090/fornecedor/listar')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var table = document.getElementById('fornecedorTable');

          // Limpar tabela antes de preencher com novos dados
          while (table.rows.length > 1) {
            table.deleteRow(1);
          }

          // Preencher tabela com os dados obtidos da API
          
          data.forEach(function(fornecedor) {
            console.log(fornecedor)
            var row = table.insertRow();
            var nomeCell = row.insertCell();
            var apelidoCell = row.insertCell();
            var emailCell = row.insertCell();
            var cadastroNacionalCell = row.insertCell();
            var numeroTel = row.insertCell();
            var numeroCel = row.insertCell();
            var actionsCell = row.insertCell();

            nomeCell.textContent = fornecedor.nome;
            apelidoCell.textContent = fornecedor.apelido;
            emailCell.textContent = fornecedor.email;
            cadastroNacionalCell.textContent = fornecedor.cadastroNacional;
            numeroTel.textContent = fornecedor.numeroTelefone;
            numeroCel.textContent = fornecedor.numeroCelular;

            var editarButton = document.createElement('button');
            editarButton.className = 'editBtn';
            editarButton.textContent = 'Editar';
            editarButton.addEventListener('click', function() {
              editarProduto(fornecedor.cadastroNacional);
            });
            actionsCell.appendChild(editarButton);
            

            var excluirButton = document.createElement('button');
            excluirButton.textContent = 'Excluir';
            excluirButton.style.backgroundColor = 'gray';
            excluirButton.style.color = 'white';
            excluirButton.style.borderRadius = '7px';
            excluirButton.style.cursor = 'pointer';
            excluirButton.addEventListener('click', function() {
              excluirProduto(fornecedor.id);
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
