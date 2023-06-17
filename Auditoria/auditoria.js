function buscarAuditoria() {
    const selectAuditoria = document.getElementById('auditoriaDrop');
    const auditoriaSelecionada = selectAuditoria.value;

    let url;
    if (auditoriaSelecionada === 'fornecedor') {
      url = 'http://localhost:8090/auditoria/buscar/fornecedor/';
    } else if (auditoriaSelecionada === 'operacao') {
      url = 'http://localhost:8090/auditoria/buscar/operacao/';
    } else if (auditoriaSelecionada === 'produto') {
      url = 'http://localhost:8090/auditoria/buscar/produto/';
    } else {
      console.log('Tipo de auditoria inválido.');
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Aqui você pode manipular os dados recebidos da API conforme necessário
        console.log('Dados da auditoria:', data);
        // Exemplo: Preencher a tabela com os dados da auditoria
        preencherTabelaAuditoria(data);
      })
      .catch(error => {
        console.error('Erro ao buscar auditoria:', error);
      });
  }

  function preencherTabelaAuditoria(data) {
    const auditTable = document.getElementById('auditTable');
    const tbody = document.createElement('tbody');

    // Limpar conteúdo anterior da tabela
    auditTable.innerHTML = '';

    // Cabeçalho da tabela
    const headerRow = document.createElement('tr');
    const headers = ['Data de Alteração', 'ID Entidade', 'Nome Entidade', 'Tipo da Entidade', 'Tipo de Auditoria'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    tbody.appendChild(headerRow);

    // Linhas de dados
    data.forEach(auditoria => {
      const dataAlteracaoFormatada = moment(auditoria.dataAlteracao).format('DD/MM/YYYY');
      let tipoOperacaoFormatado;
      if (auditoria.tipoOperacao === 'CRIACAO') {
        tipoOperacaoFormatado = 'Criação';
      } else if (auditoria.tipoOperacao === 'EDICAO') {
        tipoOperacaoFormatado = 'Atualização';
      } else if (auditoria.tipoOperacao === 'EXCLUSAO') {
        tipoOperacaoFormatado = 'Exclusão';
      } else {
        tipoOperacaoFormatado = auditoria.tipoOperacao;
      }
      const rowData = [dataAlteracaoFormatada, auditoria.idEntidade, auditoria.nomeEntidade, auditoria.tipoEntidade, tipoOperacaoFormatado];
      const row = document.createElement('tr');
      rowData.forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    auditTable.appendChild(tbody);
  }