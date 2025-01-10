const spinButton = document.getElementById("spinButton");
const reels = document.querySelectorAll(".reel");
const result = document.getElementById("result");

// Symbols for the slot machine
const symbols = ["🍒", "🍋", "🍉", "⭐", "🍇", "🍎","🔥"];

// Populate each reel with symbols
function populateReel(reel) {
    const content = [];
    for (let i = 0; i < symbols.length * 3; i++) {
        content.push(`<div class="symbol">${symbols[i % symbols.length]}</div>`);
    }
    reel.innerHTML = content.join("");
}

// Start spinning by applying animation
function startSpinning(reel) {
    reel.style.animation = "spin 1s linear infinite";
}

// Stop the reel and align it to a random symbol
function stopReel(reel) {
    return new Promise((resolve) => {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const symbolHeight = 80; // Each symbol's height in pixels
        const offset = -randomIndex * symbolHeight;

        setTimeout(() => {
            reel.style.animation = ""; // Stop spinning animation
            reel.style.transform = `translateY(${offset}px)`; // Align reel to selected symbol
            reel.style.transition = "transform 0.3s ease-out"; // Smooth stopping
            resolve(symbols[randomIndex]); // Return the stopped symbol
        }, 1000);
    });
}

// Main function to spin the reels
async function spinReels() {
    result.textContent = "";
    spinButton.disabled = true;

    // Populate reels with symbols
    reels.forEach((reel) => {
        populateReel(reel);
        startSpinning(reel);
    });

    // Stop reels one by one
    const finalSymbols = [];
    for (const reel of reels) {
        const symbol = await stopReel(reel);
        finalSymbols.push(symbol);
    }

    spinButton.disabled = false;

    // Check if all reels match
    if (finalSymbols.every((symbol) => symbol === finalSymbols[0])) {
        result.textContent = "🎉 Jackpot! You win! 🎉";
    } else {
        result.textContent = "Try again!";
    }
}

spinButton.addEventListener("click", spinReels);