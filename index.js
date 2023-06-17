document.addEventListener('DOMContentLoaded', () => {
  obterDadosDaAPI()
          
});


function obterDadosDaAPI(){
  const dataAtualFormatada = new Date().toISOString();
  
  const ultimos7 = new Date(dataAtualFormatada);
  ultimos7 .setDate(ultimos7 .getDate() - 7);
  const ultimosFormat = ultimos7 .toISOString();

  var url = 'http://localhost:8090/dashboard/popular?startDate=$sdate$&endDate=$edate$'
  url = url.replace('$sdate$',ultimosFormat)
  url = url.replace('$edate$',dataAtualFormatada)
  console.log(url)
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.valorFiltro)
      document.getElementById('vlTotalEstoque').textContent = "R$ " + data.valorTotal
      document.getElementById('lucroTotalEstoque').textContent = "R$ " +data.valorLucroTotal
      document.getElementById('lucroSeteDias').textContent = "R$ " +data.valorFiltro
      var produtos = data.maisVendidos

      var table = document.getElementById('productTable');

      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      for(let i =0; i <produtos.length; i++) {
        
        console.log(produtos[i].nome)
        var row = table.insertRow();
        var nameCell = row.insertCell();
        var qtdCell = row.insertCell();
        nameCell.textContent = produtos[i].nome
        qtdCell.textContent = produtos[i].quantidade
      }
     
      
    })
    .catch(error => {
      console.log('Erro ao obter os dados da API:', error);
    });

}


