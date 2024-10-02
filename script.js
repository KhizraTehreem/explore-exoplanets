const planets = [
    { name: "Kepler-22b", clue: "This planet is 2.4 times the size of Earth and orbits a star in the habitable zone." },
    { name: "Proxima Centauri b", clue: "This planet orbits the closest star to the Sun and could be rocky." },
    { name: "HD 209458 b", clue: "This is a gas giant known as 'Osiris' and was the first planet observed transiting its star." },
    { name: "TRAPPIST-1e", clue: "This planet is one of seven rocky planets orbiting a cool red dwarf star." },
    { name: "WASP-12b", clue: "This hot Jupiter is being devoured by its star and has a pitch-black surface." },
    { name: "Gliese 1214b", clue: "This is a waterworld planet, likely covered by an ocean beneath a thick atmosphere." },
    { name: "55 Cancri e", clue: "This super-Earth is thought to be made partly of diamond and orbits its star in just 18 hours." },
    { name: "LHS 1140 b", clue: "This planet is a super-Earth that is about 1.4 times the size of Earth." },
    { name: "K2-18b", clue: "This exoplanet is located in the habitable zone of its star and may have water." },
    { name: "GJ 357 d", clue: "This planet is considered a potential candidate for life due to its location in the habitable zone." },
];

let currentPlanet = 0;
let score = 0;
const clueElement = document.getElementById('clue');
const choicesElement = document.getElementById('choices');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');
const scoreElement = document.getElementById('score');
const background = document.querySelector('.background-animation');
const starsContainer = document.querySelector('.stars');

// Load the first planet clue
function loadPlanet() {
    clueElement.textContent = planets[currentPlanet].clue;
    feedbackElement.textContent = '';
    nextBtn.style.display = 'none';
    retryBtn.style.display = 'none';

    // Reset background to galaxy
    background.classList.remove('happy-background');
    background.classList.add('background-animation');

    // Create the choices buttons
    choicesElement.innerHTML = '';
    const options = getRandomOptions(planets[currentPlanet].name);
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        choicesElement.appendChild(button);
    });
}

// Get random options including the correct answer
function getRandomOptions(correctAnswer) {
    const shuffled = planets
        .map(planet => planet.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
    shuffled.push(correctAnswer);
    return shuffled.sort(() => 0.5 - Math.random()); // Shuffle options again
}

// Check the player's answer
function checkAnswer(answer) {
    if (answer === planets[currentPlanet].name) {
        feedbackElement.textContent = 'Correct! 🎉';
        score++;
        scoreElement.textContent = `Score: ${score}`;
        nextBtn.style.display = 'block';

        // Change background to happy theme
        background.classList.remove('background-animation');
        background.classList.add('happy-background');

        // Show emoji
        showEmoji();
    } else {
        feedbackElement.textContent = 'Oops, try again!';
    }
}

// Show random emoji
function showEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = '🌟'; // You can change this to any emoji you like
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1000); // Remove emoji after 1 second
}

// Move to the next planet
function nextPlanet() {
    currentPlanet++;
    if (currentPlanet < planets.length) {
        loadPlanet();
    } else {
        clueElement.textContent = "You've explored all the planets! Well done!";
        choicesElement.innerHTML = '';
        nextBtn.style.display = 'none';
        retryBtn.style.display = 'block';
    }
}

// Retry the game
function retryGame() {
    currentPlanet = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    loadPlanet();
}

// Initialize the game
loadPlanet();

// Create twinkling stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1; // Random size for stars
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        starsContainer.appendChild(star);
    }
}

createStars();



