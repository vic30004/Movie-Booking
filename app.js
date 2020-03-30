const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUi();

const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovie', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Get data from localstorage
function populateUi(){
  const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));
  const movieIndex = localStorage.getItem('selectedMovie');
  const moviePrice = localStorage.getItem('selectedMoviePrice');

  if(selectedSeats !==null && selectedSeats.length>0){
    seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index)>-1){
            seat.classList.add('selected')
        }
    })
  }
}

const updatedSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updatedSelectedCount();
});

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updatedSelectedCount();
  }
});
