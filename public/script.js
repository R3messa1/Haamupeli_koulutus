/*24.2 (9) */
let BOARD_SIZE = 15
let board; //kenttä tallennetaan tähän


/*24.2 (2) */
// Painetaan nappia ja lisätään tapahtumakuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);
/*24.2 (4) ja (7) */
function startGame(){
    // Piilotetaan intro-näkymä ja näytetään pelialue
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    /*24.2 (10) */
    // Luo pelikenttä ja piirrä se
    board = generateRandomBoard();

    console.log('klikattu');
    console.log('peli käynnistetty');
    console.log(board);
    }
    /*24.2 (11) */
    function generateRandomBoard() {
        // Luodaan 2D-taulukko, joka täytetään tyhjillä soluilla (' ')
        const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(' '));
    
        // Luodaan kentän reunat ja merkitään ne seiniksi ('W')
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
                    newBoard[y][x] = 'W'; // Merkitään seiniksi
                }
            }
        }
    
        console.log(newBoard); // Näytetään taulukko konsolissa kehittäjälle
        return newBoard; // Palautetaan luotu pelikenttä
    }