/*3.3 (9) */
//Luodaan muuttujat
let BOARD_SIZE = 15 //Pelikentän koko
/*3.3 (16) */
const cellSize = calculateCellSize(); // Lasketaan ruudun koko responsiivisesti
/*3.3 (9) */
let board; //kenttä tallennetaan tähän


/*24.2 (2) */
// Painetaan nappia ja lisätään tapahtumakuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);

/*3.3 (13) */
//Luodaan apufunktio joka hakee tietyn ruudun sisällön pelilaudasta
function getCell(board, x, y) {
    return board[y][x]; // Palautetaan koordinaattien (x, y) kohdalla oleva arvo
}
/*3.3 (17) */
function calculateCellSize() {
    // Selvitetään selainikkunan leveys ja korkeus ja valitaan näistä pienempi arvo
    const screenSize = Math.min(window.innerWidth, window.innerHeight); 
    
    // Lasketaan pelilaudan koko tekemällä siitä 95 % ikkunan pienemmästä reunasta 
    // Tämä jättää hieman reunatilaa ympärille
    const gameBoardSize = 0.95 * screenSize; 
    
    // Lasketaan yksittäisen ruudun koko jakamalla pelilaudan koko ruutujen määrällä
    return gameBoardSize / BOARD_SIZE; 
  }

/*24.2 (4) ja (7) */
function startGame(){
    // Piilotetaan intro-näkymä ja näytetään pelialue
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    /*3.3 (10) */
    // Luo pelikenttä ja piirrä se
    board = generateRandomBoard();
    /*3.3 (12) */
    drawBoard(board); // Kutsutaan Piirretään pelikenttä HTML:ään

    console.log('klikattu');
    console.log('peli käynnistetty');
    console.log(board);
    }
/*3.3 (11) */
function generateRandomBoard() {
    // Luodaan 2D-taulukko, joka täytetään tyhjillä soluilla (' ')
    const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '));

    // Käydään läpi pelikentän jokainen rivi
    for (let y = 0; y < BOARD_SIZE; y++) { 
        // Käydään läpi jokainen sarake kyseisellä rivillä
        for (let x = 0; x < BOARD_SIZE; x++) { 
            // Tarkistetaan, onko solu pelikentän reunassa
            if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) { 
                newBoard[y][x] = 'W'; // Jos solu on reunassa, merkitään se seinäksi ('W')
            }
        }
    }

    console.log(newBoard); // Näytetään taulukko konsolissa kehittäjälle
    return newBoard; // Palautetaan luotu pelikenttä
}


/*3.3 (14) */
//Tämä funktio piirtää pelikentän
function drawBoard(board) { 
    const gameBoard = document.getElementById('game-board'); // Haetaan HTML-elementti, johon pelikenttä lisätään

    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`; // Asetetaan grid-sarakkeet ja rivit dynaamisesti BOARD_SIZE:n mukaan

    for (let y = 0; y < BOARD_SIZE; y++) { // Käydään läpi pelikentän rivit
        for (let x = 0; x < BOARD_SIZE; x++) { // Käydään läpi jokaisen rivin sarakkeet
            const cell = document.createElement('div'); // Luodaan uusi HTML-elementti (div), joka edustaa yhtä pelikentän ruutua
            cell.classList.add('cell'); // Lisätään ruudulle perusluokka "cell", joka muotoilee ruudun CSS:llä
            /*3.3 (18) */
            cell.style.width = cellSize + "px"; // Asetetaan ruudun leveys dynaamisesti laskettuun kokoon (cellSize), lisätään yksikkö "px"
            cell.style.height = cellSize + "px"; // Asetetaan ruudun korkeus dynaamisesti laskettuun kokoon (cellSize), lisätään yksikkö "px"

           
            if (getCell(board, x, y) === 'W') { // Tarkistetaan, onko ruutu seinä ('W')
                cell.classList.add('wall'); // Jos ruutu on seinä, lisätään sille erityinen CSS-luokka "wall"
            }
            gameBoard.appendChild(cell); // Lisätään ruutu (div) pelikentän HTML-elementtiin
        }
    }
}
