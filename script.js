const tabela = document.getElementById('corpo-tabela');
const input = document.getElementById('nome');

function carregarTabela() {
  const dados = JSON.parse(localStorage.getItem('amigos')) || [
    'Marco', 'Luiz', 'Samuel', 'Sthevan'
  ];
  tabela.innerHTML = '';
  dados.forEach(nome => {
    const linha = document.createElement('tr');
    const celula = document.createElement('td');
    celula.textContent = nome;
    linha.appendChild(celula);
    tabela.appendChild(linha);
  });
}

function salvarTabela() {
  const nomes = [...tabela.querySelectorAll('td')].map(td => td.textContent);
  localStorage.setItem('amigos', JSON.stringify(nomes));
}

function inserir() {
  if (input.value.trim() === '') return alert('Digite um nome!');
  const linha = document.createElement('tr');
  const celula = document.createElement('td');
  celula.textContent = input.value.trim();
  linha.appendChild(celula);
  tabela.appendChild(linha);
  salvarTabela();
  alert(`INSERT INTO amigos VALUES ('${celula.textContent}');`);
  input.value = '';
}

function selecionar() {
  const nomes = [...tabela.querySelectorAll('td')].map(td => td.textContent);
  alert('SELECT * FROM amigos:\n' + nomes.join(', '));
}

function alterar() {
  const antigo = prompt('Digite o nome que deseja alterar:');
  if (!antigo) return;
  const novo = prompt('Digite o novo nome:');
  if (!novo) return;
  const celula = [...tabela.querySelectorAll('td')].find(td => td.textContent === antigo);
  if (celula) {
    celula.textContent = novo;
    salvarTabela();
    alert(`ALTER TABLE amigos SET nome='${novo}' WHERE nome='${antigo}';`);
  } else {
    alert('Nome não encontrado!');
  }
}

function deletar() {
  const nome = prompt('Digite o nome que deseja deletar:');
  if (!nome) return;
  const linha = [...tabela.querySelectorAll('tr')].find(tr => tr.textContent === nome);
  if (linha) {
    tabela.removeChild(linha);
    salvarTabela();
    alert(`DELETE FROM amigos WHERE nome='${nome}';`);
  } else {
    alert('Nome não encontrado!');
  }
}

function dropar() {
  tabela.innerHTML = '';
  localStorage.removeItem('amigos');
  alert('DROP TABLE amigos;');
}

window.onload = carregarTabela;
