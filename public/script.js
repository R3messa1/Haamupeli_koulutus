/*3.3 (9) */
//Luodaan muuttujat
let BOARD_SIZE = 15 //Pelikentän koko
let board; //kenttä tallennetaan tähän


/*24.2 (2) */
// Painetaan nappia ja lisätään tapahtumakuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);
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
/*24.2 (11) */
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

/*3.3 (12) */
//Luodaan apufunktio joka hakee tietyn ruudun sisällön pelilaudasta
function getCell(board, x, y) {
    return board[y][x]; // Palautetaan koordinaattien (x, y) kohdalla oleva arvo
}

function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');

    // Asetetaan grid-sarakkeet ja rivit dynaamisesti BOARD_SIZE:n mukaan
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

    // Luodaan jokainen ruutu
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
           
            if (getCell(board, x, y) === 'W') {
                cell.classList.add('wall'); // 'W' on seinä
            }
            gameBoard.appendChild(cell);
        }
    }

}
