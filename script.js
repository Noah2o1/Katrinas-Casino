// Initialize or retrieve currency from localStorage
let currency = localStorage.getItem('casinoCurrency');

if (currency === null) {
    currency = 1000;
    localStorage.setItem('casinoCurrency', currency);
} else {
    currency = parseInt(currency);
}

const currencyAmountElement = document.getElementById('currency-amount');
currencyAmountElement.textContent = currency;

document.getElementById('add-funds').addEventListener('click', () => {
    currency += 100;
    localStorage.setItem('casinoCurrency', currency);
    currencyAmountElement.textContent = currency;
});

// Create stars dynamically
const starContainer = document.querySelector('.floating-effects');
const numberOfStars = 100; // Increase this value for more stars

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${6 + Math.random() * 4}s`; // Randomize float duration
    starContainer.appendChild(star);
}

// Menu navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const gameId = item.id;
        let redirectUrl = '';

        if (gameId === 'slot-machine') {
            redirectUrl = 'slotmachine.html';
        } else if (gameId === 'blackjack') {
            redirectUrl = 'blackjack.html';
        } else if (gameId === 'roulette') {
            redirectUrl = 'roulette.html';
        }

        if (redirectUrl) {
            window.location.href = `${redirectUrl}?currency=${currency}`;
        }
    });
});
