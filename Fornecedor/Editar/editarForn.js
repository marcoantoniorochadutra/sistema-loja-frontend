document.addEventListener("DOMContentLoaded", function() {
    // Função para buscar os dados do fornecedor selecionado da API e preencher o formulário de edição

    function carregarFornecedor() {
      var urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.getAll)
      var cadastroNacional = urlParams.get('cadastroNacional');
      
      if (!cadastroNacional) {
        console.error('Cadastro Nacional do fornecedor não encontrado na URL');
        return;
      }
  
      fetch('http://localhost:8090/fornecedor/buscar/' + cadastroNacional)
  
        .then(response => response.json())
        .then(fornecedor => {
          localStorage.setItem("id", fornecedor.id);
          document.getElementById('nome').value = fornecedor.nome;
          document.getElementById('apelido').value = fornecedor.apelido;
          document.getElementById('email').value = fornecedor.email;
          var tipo = document.getElementsByName('tipo')[0].value;

          var cadastroNacional = fornecedor.cadastroNacional

          
          if (tipo === "0") {
            
            document.getElementsByName('cpf')[0].value=cadastroNacional;

          } else if (tipo === "1") {
            document.getElementsByName('cnpj')[0].value=cadastroNacional
          }
          
          
          document.getElementById('telefone').value = fornecedor.numeroTelefone;
          document.getElementById('celular').value = fornecedor.numeroCelular;
        })
        .catch(error => {
          console.error('Erro ao buscar dados do fornecedor:', error);
        });
    }
  
    function atualizarFornecedor(event) {
      event.preventDefault();
  
      var urlParams = new URLSearchParams(window.location.search);
      var cadastroNacional = urlParams.get('cadastroNacional');
  
      if (!cadastroNacional) {
        console.error('Cadastro Nacional do fornecedor não encontrado na URL');
        return;
      }
  
      var nome = document.getElementById('nome').value;
      var apelido = document.getElementById('apelido').value;
      var email = document.getElementById('email').value;
      var tipo = document.getElementsByName('tipo')[0].value;
          var cadastroNacional = "";
    
          if (tipo === "0") {
            cadastroNacional = document.getElementsByName('cpf')[0].value;
          } else if (tipo === "1") {
            cadastroNacional = document.getElementsByName('cnpj')[0].value;
          }
      var telefone = document.getElementById('telefone').value;
      var celular = document.getElementById('celular').value;
  
      var fornecedorAtualizado = {
        
        nome: nome,
        apelido: apelido,
        email: email,
        tipo: tipo,
        cadastroNacional: cadastroNacional,
        numeroTelefone: telefone,
        numeroCelular: celular
      }
      fetch('http://localhost:8090/fornecedor/atualizar/'+localStorage.getItem('id'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fornecedorAtualizado)
      })
        .then(response => {
          if (response.ok) {
            console.log('Fornecedor atualizado com sucesso!');
  
            document.getElementById('mensagemSucesso').textContent = 'Fornecedor atualizado com sucesso!';
            document.getElementById('mensagemContainer').style.display = 'block';
  
            setTimeout(function() {
              window.location.href = '/Inicio/Fornecedor/forn.html';
            }, 2000);
          } else {
            console.error('Erro ao atualizar fornecedor:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao atualizar fornecedor:', error);
        });
    }
  
    // Chamar a função de carregar fornecedor ao carregar a página
    carregarFornecedor();
  
    // Adicionar o evento de envio do formulário
    document.getElementById('editFornecedorForm').addEventListener('submit', atualizarFornecedor);
  });
  function mostrarDocumento(tipo) {
    var cpfRow = document.getElementById('cpfRow');
    var cpfInputRow = document.getElementById('cpfInputRow');
    var cnpjRow = document.getElementById('cnpjRow');
    var cnpjInputRow = document.getElementById('cnpjInputRow');
  
    if (tipo === "0") {
      cpfRow.style.display = 'table-row';
      cpfInputRow.style.display = 'table-row';
      cnpjRow.style.display = 'none';
      cnpjInputRow.style.display = 'none';
    } else if (tipo === "1") {
      cpfRow.style.display = 'none';
      cpfInputRow.style.display = 'none';
      cnpjRow.style.display = 'table-row';
      cnpjInputRow.style.display = 'table-row';
    } else {
      cpfRow.style.display = 'none';
      cpfInputRow.style.display = 'none';
      cnpjRow.style.display = 'none';
      cnpjInputRow.style.display = 'none';
    }
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    var tipo = document.getElementsByName('tipo')[0].value;
    mostrarDocumento(tipo);
  });