// 949197
const checkin = document.querySelector('.inputCheckin');
const checkout = document.querySelector('.inputCheckout');
const bedroom = document.querySelectorAll('.bedroom');
const select = document.querySelector('.nPessoas');
const textArea = document.querySelector('.obs');
const btnSubmit = document.querySelector('#submit-btn');
const btnClear = document.querySelector('#clear-btn');
const ol = document.querySelector('ol');

function getQuarto() {
  for (let i = 0; i < bedroom.length; i++) {
    if (bedroom[i].checked) {
      return bedroom[i].value;
    }
  }
}

function getPessoas() {
  return select.options[select.selectedIndex].value;
}

function getData(value) {
  const valueDate = value + 'T03:00:00.000Z';
  data = new Date(valueDate);
  dataFormatada = data.toLocaleDateString('pt-BR');
  return dataFormatada;
}

function criarReserva() {
  const checkin = getData(document.querySelector('.inputCheckin').value);
  const checkout = getData(document.querySelector('.inputCheckout').value);
  const quarto = getQuarto();
  const pessoas = getPessoas();
  const obs = document.querySelector('.obs').value;

  const periodo = (`Reserva para o dia ${checkin} até o dia ${checkout}`);
  const acomodacao = `Quarto ${quarto}`;
  const qtdPessoas = (`Para ${pessoas} pessoa(s)`);
  const observacao = (`Obs: ${obs}`);

  return [periodo, acomodacao, qtdPessoas, observacao]
}

// const salvaListaStorage = () => {
//   const listaReservas = document.querySelector('.list-section ol');
//   localStorage.setItem('listaReservas', JSON.stringify(listaReservas.innerHTML));
// }

function salvarListaStorage() {
  const listaReservas = document.querySelector('ol');
  localStorage.setItem('listaReservas', listaReservas.innerHTML);
}

const salvaLista = () => {
  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault()
    const arrayReserva = criarReserva();
    const liReserva = document.createElement('li');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const listaReserva = document.querySelector('.list-section ol');

    liReserva.innerText = arrayReserva[0]
    p1.innerText = arrayReserva[1];
    p2.innerText = arrayReserva[3];

    liReserva.appendChild(p1);
    liReserva.appendChild(p2);
    listaReserva.appendChild(liReserva);
    salvarListaStorage()

  })

}

const limpaLista = () => {
  btnClear.addEventListener('click', () => {
    const listaReservas = document.querySelector('.list-section ol');
    listaReservas.innerHTML = '';
  })

}

window.onload = () => {
  salvaLista();
  limpaLista();
}
  


