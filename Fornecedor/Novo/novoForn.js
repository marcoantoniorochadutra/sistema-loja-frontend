  function cadastrarFornecedor() {
      var nome = document.getElementsByName('nome')[0].value;
      var apelido = document.getElementsByName('apelido')[0].value;
      var email = document.getElementsByName('email')[0].value;
      var tipo = document.getElementsByName('tipo')[0].value;
      var cadastroNacional = "";

      if (tipo === "0") {
        cadastroNacional = document.getElementsByName('cpf')[0].value;
      } else if (tipo === "1") {
        cadastroNacional = document.getElementsByName('cnpj')[0].value;
      }

      var numeroTelefone = document.getElementsByName('numeroTelefone')[0].value;
      var numeroCelular = document.getElementsByName('numeroCelular')[0].value;
      

      var data = {
        nome: nome,
        apelido: apelido,
        email: email,
        tipo: tipo,
        cadastroNacional: cadastroNacional,
        numeroTelefone: numeroTelefone,
        numeroCelular: numeroCelular,
        
      };

      fetch('http://localhost:8090/fornecedor/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),      
      
      })

      .then(response => response.json())
      
      .then(result => {
        console.log('Fornecedor cadastrado com sucesso:', result);
        // Realizar qualquer outra ação necessária após o cadastro
      })
      .catch(error => {
        console.error('Erro ao cadastrar Fornecedor:', error);
        // Realizar qualquer tratamento de erro necessário
      });

      // Limpar os campos após o cadastro 
      document.getElementsByName('nome')[0].value = '';
      document.getElementsByName('apelido')[0].value = '';
      document.getElementsByName('email')[0].value = '';
      document.getElementsByName('tipo')[0].value = '';
      document.getElementsByName('cpf')[0].value = '';
      document.getElementsByName('cnpj')[0].value = '';
      document.getElementsByName('numeroTelefone')[0].value = '';
      document.getElementsByName('numeroCelular')[0].value = '';
  }

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
  