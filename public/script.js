/*3.3 (9) */
//Luodaan muuttujat
//10.3 (20) vaihdetaan koko 15 -> 20
let BOARD_SIZE = 20 //Pelikentän koko
/*3.3 (16) */
const cellSize = calculateCellSize(); // Lasketaan ruudun koko responsiivisesti
/*3.3 (9) */
let board; //kenttä tallennetaan tähän
//10.3 (24)
let player; //muuttuja pelaajalle
//24.3 (40)
let ghosts = []; // Lista, johon tallennetaan kaikki Ghost-oliot
//14.4 (57)
let isGameRunning = false; // Muuttuja kertoo, onko peli käynnissä vai ei
//14.4 (61)
let ghostInterval; // Muuttujaan tallennetaan haamujen liikkeen aikaväli (setInterval), jotta sen voi myöhemmin pysäyttää clearInterval-komennolla.
//7.4 (51)
let ghostSpeed = 1000; // Aloitusnopeus haamuille (millisekunteina)
//14.4 (64)
let score = 0; //Pistelaskuri


/*24.2 (2) */
// Painetaan nappia ja lisätään tapahtumakuuntelija
document.getElementById('new-game-btn').addEventListener('click', startGame);

//14.4 (65)
// Tämä on funktio, jonka nimi on updateScoreBoard. 
// Se saa parametrinaan `points`, joka on kokonaisluku ja kertoo, kuinka monta pistettä lisätään nykyiseen pistemäärään.
// Funktio päivittää muuttujan `score` arvon sekä näyttää sen ruudulla HTML-elementissä, jonka id on 'score-board'.
function updateScoreBoard(points) {
    const scoreBoard = document.getElementById('score-board'); // Haetaan HTML-elementti, johon pisteet näytetään (id="score-board")
    
    // (68)
    score = score + points; // Lisätään saatu pistemäärä (points) olemassa oleviin pisteisiin
  
    scoreBoard.textContent = `Pisteet: ${score}`; // Näytetään päivitetty pistemäärä ruudulla muodossa "Pisteet: 150"
  }
  

/*17.3 (33) */
// Lisätään tapahtumankuuntelija, joka reagoi näppäimistön painalluksiin
document.addEventListener('keydown', (event) => {
    //14.4 (58) Katsotaan onko peli päällä  
    if (isGameRunning) {
        // Tarkistetaan, mikä näppäin on painettu
        switch (event.key) {  

            case 'ArrowUp':  
                player.move(0, -1); // Liikuta pelaajaa yksi askel ylöspäin
                break;  

            case 'ArrowDown':  
                player.move(0, 1); // Liikuta pelaajaa yksi askel alaspäin
                break;  

            case 'ArrowLeft':  
                player.move(-1, 0); // Liikuta pelaajaa yksi askel vasemmalle
                break;  

            case 'ArrowRight':  
                player.move(1, 0); // Liikuta pelaajaa yksi askel oikealle
                break;  
            //7.4 (46)
            case 'w':
                shootAt(player.x, player.y - 1); // shoot up
                break;

            case 's':
                shootAt(player.x, player.y + 1); // shoot down
                break;

            case 'a':
                shootAt(player.x - 1, player.y); // shoot left
                break;

            case 'd':
                shootAt(player.x + 1, player.y); // shoot right
                break;
        }
    }
    event.preventDefault(); // Estetään selaimen oletustoiminnot, kuten sivun vieritys
});


// 10.3 (31) Asettaa tietyn arvon (esim. 'P' pelaajalle) tiettyyn ruutuun pelikentällä
function setCell(board, x, y, value) {  
    board[y][x] = value; // Muutetaan pelikentän (board) koordinaatin (x, y) arvoksi 'value'
}

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

    //14.4 (59)
    isGameRunning = true; // Merkitään peli käynnissä olevaksi

    /*17.3 (35)*/
    //luo uuden pelaajan ja sijoittaa sen koordinaatteihin (0,0)
    player = new Player(0,0);

    /*3.3 (10) */
    // Luo pelikenttä ja piirrä se
    board = generateRandomBoard();

    /*
    //7.4 (52)
    // setInterval on JavaScriptin sisäänrakennettu funktio, joka toistaa annetun toiminnon säännöllisin aikavälein.
    // Tässä se kutsuu moveGhosts-funktiota jatkuvasti ghostSpeed-millisekunnin välein.
    // Tämä saa haamut liikkumaan automaattisesti pelin aikana.
    // Esimerkiksi jos ghostSpeed = 1000, haamut liikkuvat kerran sekunnissa.
    setInterval(moveGhosts, ghostSpeed)
    */

    //korjaus
    //score = 0;              // Nollataan pisteet uuden pelin alussa
    //updateScoreBoard(0);    // Päivitetään pistetaulu näkymään ruudulle

    //14.4 (62) Huom tämä korvaa tuon yllä olevan setintervalin
    //Muuta ensin setrinterval ja sitten vasta tuo odotus
    // Odotetaan 1 sekunti ennen kuin haamut lähtevät liikkeelle
    setTimeout(() => {
        ghostInterval = setInterval(moveGhosts, ghostSpeed); // Haamut liikkuvat tietyin väliajoin
        //korjaus
        //drawBoard(board)
    }, 1000);
    
    
    //14.4 (66)
    score = 0;              // Nollataan pisteet uuden pelin alussa
    updateScoreBoard(0);    // Päivitetään pistetaulu näkymään ruudulle

    /*3.3 (12) */
    //HUOM 14.4 TÄMÄ PITÄÄ SIIRTÄÄ
    drawBoard(board); // Kutsutaan Piirretään pelikenttä HTML:ään 
    
    //console.log('klikattu');
    //console.log('peli käynnistetty');
    //console.log(board);
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
//10.3 (23)
    generateObstacles(newBoard);
//10.3 (25) Tämä poistetaan kohdassa (28) ja korvataan myöhemmin kohdassa 32
    //newBoard[6][7] = 'P'; // P on pelaaja, sijoitetaan kentälle kohtaan (6,7)
    //10.3 (32)

    //14.4 Tyhjennetään ghost lista (69)
    ghosts = [];

    //31.3 (41)
    for (let i = 0; i < 5; i++) { // Luodaan 5 haamua
        const [ghostX, ghostY] = randomEmptyPosition(newBoard); // Haetaan satunnainen tyhjä paikka kentältä
        console.log(ghostX, ghostY); // Tulostetaan haamun sijainti konsoliin (debuggausta varten)
        setCell(newBoard, ghostX, ghostY, 'H'); // Asetetaan haamu 'H' pelikentän matriisiin
        ghosts.push(new Ghost(ghostX, ghostY)); // Luodaan uusi Ghost-olio ja lisätään se ghost-listaan
        console.log(ghosts); // Tulostetaan koko ghost-lista konsoliin (näkee kaikki haamut)
    }
    
    const [playerX, playerY] = randomEmptyPosition(newBoard); // Haetaan satunnainen tyhjä paikka
    setCell(newBoard, playerX, playerY, 'P'); // Asetetaan pelaaja tähän kohtaan
    /*17.3 (36) */
    // Päivitetään pelaajan x- ja y-koordinaatit vastaamaan uutta sijaintia
    player.x = playerX;
    player.y = playerY;

    return newBoard; // Palautetaan luotu pelikenttä
}


/*3.3 (14) */
//Tämä funktio piirtää pelikentän
function drawBoard(board) { 
    const gameBoard = document.getElementById('game-board'); // Haetaan HTML-elementti, johon pelikenttä lisätään
    /*17.3 (37) */
    gameBoard.innerHTML = ''; // Tyhjennä olemassa oleva sisältö

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
            } else if (getCell(board, x, y) === 'P') { // Pelaaja lisätään ruudukkoon 10.3 (26)
                cell.classList.add('player'); //'P' on pelaaja
            }else if (getCell(board, x, y) === 'H') { // 31.3 (42) Jos ruudussa on 'H' eli haamu
                cell.classList.add('hornmonster'); // Lisätään haamun CSS-luokka, joka näyttää sen kuvana
            } else if (getCell(board, x, y) === 'B'){
                cell.classList.add('bullet'); //B on ammus
                setTimeout(() => {
                  setCell(board, x, y, ' ') 
              }, 500); // Ammus katoaa 0.5 sekunnin jälkeen
            }
            gameBoard.appendChild(cell); // Lisätään ruutu (div) pelikentän HTML-elementtiin
        }
    }
}

//10.3 (21)
function generateObstacles(board) {
    // Lista esteitä, jotka koostuvat koordinaattipareista suhteessa esteen aloituspisteeseen.
    // Jokainen este määritellään matriisina, jossa jokainen alkio edustaa yhden ruudun koordinaatteja.
    const obstacles = [
        [[0,0],[0,1],[1,0],[1,1]], // Square (neliö)
        [[0,0],[0,1],[0,2],[0,3]], // I-muoto (pysty- tai vaakasuora palkki)
        [[0,0],[1,0],[2,0],[1,1]], // T-muoto
        [[1,0],[2,0],[1,1],[0,2],[1,2]], // Z-muoto
        [[1,0],[2,0],[0,1],[1,1]], // S-muoto
        [[0,0],[1,0],[1,1],[1,2]], // L-muoto
        [[0,2],[0,1],[1,1],[2,1]]  // J-muoto (peilikuva L-muodosta)
    ];

    // Kovakoodatut aloituspaikat esteille pelikentällä.
    // Huom! Koska kenttä on 20x20, näiden paikkojen täytyy olla sellaisia, että esteet mahtuvat kokonaan kentälle.
    const positions = [
        { startX: 2, startY: 2 },   // Este kentän vasemmassa yläkulmassa
        { startX: 8, startY: 2 },   // Este ylempänä keskellä
        { startX: 4, startY: 8 },   // Este vasemmalla keskialueella
        { startX: 3, startY: 16 },  // Este alareunan vasemmassa osassa
        { startX: 10, startY: 10 }, // Este keskellä kenttää
        { startX: 12, startY: 5 },  // Este yläkeskialueella
        { startX: 12, startY: 10 }, // Este keskialueella
        { startX: 16, startY: 10 }, // Este oikealla keskialueella
        { startX: 13, startY: 14 }  // Este alhaalla keskellä
    ];

    // Käydään läpi jokainen aloituspaikka ja lisätään sinne satunnainen este
    positions.forEach(pos => {
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)]; 
        // Valitaan satunnainen este obstacles-taulukosta

        placeObstacle(board, randomObstacle, pos.startX, pos.startY); 
        // Sijoitetaan valittu este kentälle kyseiseen kohtaan
    });
}

//10.3 (22)
function placeObstacle(board, obstacle, startX, startY) {
    // Käydään läpi jokainen esteen määrittelemä ruutu
    for (coordinatePair of obstacle) {
        [x, y] = coordinatePair; // Puretaan koordinaattipari x- ja y-muuttujiin

        // Sijoitetaan esteen ruutu pelikentälle suhteessa aloituspisteeseen
        board[startY + y][startX + x] = 'W'; // 'W' tarkoittaa seinää
    }
}
//10.3 (29)
// Luo satunnaisen kokonaisluvun annettujen rajojen sisällä
function randomInt(min, max) {  
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    // Math.random() tuottaa satunnaisen luvun väliltä [0,1)
    // Kerrotaan tämä (max - min + 1):llä, jotta saadaan arvo väliltä [min, max]
    // Math.floor() pyöristää luvun alaspäin, jolloin saadaan kokonaisluku
}
//10.3 (30)
// Etsii pelikentältä satunnaisen tyhjän ruudun ja palauttaa sen koordinaatit
function randomEmptyPosition(board) {  
    x = randomInt(1, BOARD_SIZE - 2); // Satunnainen x-koordinaatti pelikentän sisäalueella
    y = randomInt(1, BOARD_SIZE - 2); // Satunnainen y-koordinaatti pelikentän sisäalueella

    if (getCell(board, x, y) === ' ') {  
        return [x, y]; // Jos ruutu on tyhjä (' '), palautetaan se
    } else {  
        //14.4 HUOM PITÄÄ KORJATA
        return randomEmptyPosition(board); // Jos ruutu ei ole tyhjä, haetaan uusi satunnainen paikka
    }
}
/*17.3 (34) */
// Luodaan Player-luokka, joka hallitsee pelaajan sijaintia ja liikettä
class Player {
    constructor(x, y) {
        this.x = x; // Tallennetaan pelaajan aloituspaikan x-koordinaatti
        this.y = y; // Tallennetaan pelaajan aloituspaikan y-koordinaatti
    }

    // Funktio pelaajan liikuttamiseen
    move(deltaX, deltaY) {
        // Tallennetaan pelaajan nykyinen sijainti ennen liikettä
        const currentX = player.x;
        const currentY = player.y;

        // Tulostetaan pelaajan nykyinen sijainti konsoliin (debuggausta varten)
        console.log(`Current Position: (${currentX}, ${currentY})`);

        // Lasketaan uusi sijainti lisäämällä delta-arvot nykyiseen sijaintiin
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        /*17.3 (38) HUOM Tämä if lisätään vasta 38 kohdassa!!) */
        // Tarkista, onko aidan uusi paikka kentällä ja tyhjä
        if (getCell(board,newX,newY) === ' ') {
        // Päivitetään pelaajan uusi sijainti muuttujissa
        player.x = newX;
        player.y = newY;

        // Päivitetään pelikenttä:
        board[currentY][currentX] = ' '; // Tyhjennetään vanha paikka pelikentällä (jätetään tyhjäksi)
        board[newY][newX] = 'P'; // Asetetaan uusi sijainti pelikentälle pelaajaksi ('P')
        //HUom tämä seuraava sulku on iffin sulkeva. Lisää vasta kohdassa (38)
        }
        // Piirretään pelikenttä uudelleen, jotta pelaajan liike näkyy visuaalisesti
        drawBoard(board);
    }
}
//24.3 (39)
class Ghost { // Määritellään Ghost-luokka, joka kuvaa yhtä haamua
    constructor(x, y) { // Konstruktori saa aloituskoordinaatit x ja y
        this.x = x; // Tallennetaan x-koordinaatti haamulle
        this.y = y; // Tallennetaan y-koordinaatti haamulle
    }
    //14.4 (53)
    moveGhostTowardsPlayer(player, board, oldGhosts) { // Metodi, joka liikuttaa haamua kohti pelaajaa
        let dx = player.x - this.x; // Lasketaan x-suuntainen etäisyys pelaajaan
        let dy = player.y - this.y; // Lasketaan y-suuntainen etäisyys pelaajaan

        let moves = []; // Lista mahdollisista siirroista

        // Päätetään liikesuunta sen mukaan, kumpi etäisyys on suurempi (x vai y)
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) moves.push({ x: this.x + 1, y: this.y }); // Siirto oikealle
            else moves.push({ x: this.x - 1, y: this.y }); // Siirto vasemmalle
            if (dy > 0) moves.push({ x: this.x, y: this.y + 1 }); // Siirto alas
            else moves.push({ x: this.x, y: this.y - 1 }); // Siirto ylös
        } else {
            if (dy > 0) moves.push({ x: this.x, y: this.y + 1 }); // Siirto alas
            else moves.push({ x: this.x, y: this.y - 1 }); // Siirto ylös
            if (dx > 0) moves.push({ x: this.x + 1, y: this.y }); // Siirto oikealle
            else moves.push({ x: this.x - 1, y: this.y }); // Siirto vasemmalle
        }

        // Käydään läpi kaikki mahdolliset liikkeet
        for (let move of moves) {
            // Jos uusi ruutu on tyhjä tai siellä on pelaaja JA sinne ei ole jo menossa toinen haamu
            if (
                (board[move.y][move.x] === ' ' || board[move.y][move.x] === 'P') &&
                !oldGhosts.some(h => h.x === move.x && h.y === move.y)
            ) {
                return move; // Palautetaan ensimmäinen kelvollinen liike
            }
        }

        // Jos mikään liike ei onnistu, pysytään paikallaan
        return { x: this.x, y: this.y };
    }
}


// 31.3 (44)
function shootAt(x, y) {

    // 7.4 (48) Tarkistetaan, osuuko ammus seinään ennen ampumista
    if (getCell(board, x, y) === 'W') {
        // Jos ruudussa on seinä ('W'), ei tehdä mitään – ammus ei voi mennä läpi
        return;
    }
    // 7.4 (49)
    // 🎯 Etsitään, onko haamu samassa ruudussa mihin ammutaan
    const ghostIndex = ghosts.findIndex(ghost => ghost.x === x && ghost.y === y);

    if (ghostIndex !== -1) {
        // 👻 Jos haamu löytyy, poistetaan se haamujen listasta
        ghosts.splice(ghostIndex, 1);  // Poistaa yhden haamun listasta
        // (67)
        updateScoreBoard(50);         // Lisätään pisteitä (esim. 50 pistettä osumasta)
    }

    // 🔴 Asetetaan ruutuun 'B' eli ammus, jotta se näkyy pelissä
    setCell(board, x, y, 'B');

    // 🖼️ Piirretään peli uudelleen, jotta ammus näkyy
    drawBoard(board);

    // ✅ Tarkistetaan, onko kaikki haamut poistettu pelistä
    if (ghosts.length === 0) {
        // Jos kaikki haamut on ammuttu, siirrytään seuraavalle tasolle
        startNextLevel();  // TAI alert('kaikki ammuttu');
    }
}
/*
//(50)
function moveGhosts() {
    // 👣 Tallennetaan kaikkien haamujen nykyiset sijainnit ennen kuin niitä liikutetaan
    const oldGhosts = ghosts.map(ghost => ({ x: ghost.x, y: ghost.y }));

    // 🔄 Käydään jokainen haamu yksitellen läpi
    ghosts.forEach(ghost => {

        // 🧭 Mahdolliset suunnat joihin haamu voi yrittää liikkua (ylös, alas, vasen, oikea)
        const possibleNewPositions = [
            { x: ghost.x, y: ghost.y - 1 }, // Ylös
            { x: ghost.x, y: ghost.y + 1 }, // Alas
            { x: ghost.x - 1, y: ghost.y }, // Vasen
            { x: ghost.x + 1, y: ghost.y }  // Oikea
        ];

        // 🚫 Poistetaan listalta suunnat, jotka menevät seinän tai kentän ulkopuolelle
        const validNewPositions = possibleNewPositions.filter(newPosition =>
            newPosition.x >= 0 && newPosition.x < BOARD_SIZE &&           // Ei mennä vasemmalta tai oikealta ulos kentästä
            newPosition.y >= 0 && newPosition.y < BOARD_SIZE &&           // Ei mennä ylhäältä tai alhaalta ulos kentästä
            board[newPosition.y][newPosition.x] === ' '                   // Vain tyhjät ruudut kelpaa (ei seinää eikä pelaajaa)
        );

        // 🎲 Jos haamulle löytyi ainakin yksi tyhjä ruutu johon se voi mennä
        if (validNewPositions.length > 0) {
            // Valitaan satunnainen uusi ruutu listasta
            const randomNewPosition = validNewPositions[Math.floor(Math.random() * validNewPositions.length)];

            // 🔁 Päivitetään haamun sijainti uuteen paikkaan
            ghost.x = randomNewPosition.x;
            ghost.y = randomNewPosition.y;
        }

        // 📍 Merkitään haamu uuteen paikkaan pelilaudalle (asetetaan 'H')
        setCell(board, ghost.x, ghost.y, 'H');
    });

    // 🧹 Kun kaikki haamut on siirretty, tyhjennetään vanhat haamujen paikat
    oldGhosts.forEach(ghost => {
        board[ghost.y][ghost.x] = ' '; // Korvataan vanha haamusolu tyhjällä
    });

    // 🖼️ Lopuksi piirretään uusi pelilauta näkyviin, jotta liike näkyy ruudulla
    drawBoard(board);
}
*/

// (54)
function moveGhosts() {
    // Tallennetaan kaikkien haamujen nykyiset sijainnit (ennen siirtoa)
    const oldGhosts = ghosts.map(ghost => ({ x: ghost.x, y: ghost.y }));

    // Käydään läpi jokainen haamu
    ghosts.forEach(ghost => {
        // Lasketaan uusi sijainti, johon haamu haluaa liikkua
        const newPosition = ghost.moveGhostTowardsPlayer(player, board, oldGhosts);

        // Päivitetään haamun koordinaatit
        ghost.x = newPosition.x;
        ghost.y = newPosition.y;

        // Asetetaan uusi sijainti laudalle
        setCell(board, ghost.x, ghost.y, 'H');

        //14.4 (56)
        // Tarkistetaan törmääkö haamu pelaajaan
        if (ghost.x === player.x && ghost.y === player.y) {
            endGame(); // Peli päättyy jos haamu osuu pelaajaan
            return;
        }
    });

    // Tyhjennetään vanhat haamujen paikat laudalta (jotta niistä ei jää haamuja näkyviin)
    oldGhosts.forEach(ghost => {
        board[ghost.y][ghost.x] = ' ';
    });

    // Päivitetään uudet sijainnit laudalle (uudelleenvarmistus)
    ghosts.forEach(ghost => {
        board[ghost.y][ghost.x] = 'H';
    });

    // Piirretään kenttä uudestaan näytölle
    drawBoard(board);
}


// (55) End game funktio (huom katso dokumentista mitä tähän tulee alkuun)
function endGame() {

    //14.4 (60)
    isGameRunning = false; // Asetetaan peli päättyneeksi (ei voi enää liikuttaa pelaajaa)
  
    alert('Game Over! The ghost caught you!'); // Näytetään ilmoitus pelaajalle, että peli on ohi
  
    // 14.4 (63)Pysäytetään haamujen liike, eli perutaan setInterval, joka liikuttaa haamuja
    clearInterval(ghostInterval);
  
    // Näytetään aloitusnäkymä uudelleen (pelaaja voi aloittaa uuden pelin)
    document.getElementById('intro-screen').style.display = 'block';
  
    // Piilotetaan pelinäkymä, koska peli päättyi
    document.getElementById('game-screen').style.display = 'none';
  }

//14.4 Seuraavan levelin funktio (70)
// Tämä funktio käynnistyy, kun kaikki haamut on tuhottu nykyisellä tasolla.
// Se aloittaa seuraavan tason, kasvattaa haamujen nopeutta ja generoi uuden pelikentän.

function startNextLevel() {
    // Näytetään pelaajalle ilmoitus siitä, että uusi taso alkaa ja haamujen nopeus kasvaa
    alert('Level Up! Haamujen nopeus kasvaa.');
  
    // Luodaan uusi satunnainen pelikenttä, johon sijoitetaan pelaaja, haamut ja esteet
    board = generateRandomBoard();
  
    // Piirretään uusi pelikenttä ruudulle, jotta uudet aloitussijainnit tulevat näkyviin
    drawBoard(board);
  
    // Vähennetään haamujen liikkumisväliä (nopeus kasvaa). 
    // Kerroin 0.9 tarkoittaa, että liike tapahtuu 10 % nopeammin kuin edellisellä tasolla.
    ghostSpeed = ghostSpeed * 0.9;
  
    // Lopetetaan vanha setInterval, joka ohjasi haamujen liikettä aiemmalla nopeudella
    clearInterval(ghostInterval);
  
    // Käynnistetään uusi setInterval 1 sekunnin kuluttua, jolloin haamut alkavat liikkua uudella nopeudella.
    // setTimeout takaa pienen tauon ennen haamujen liikkeen alkua uuden tason alussa.
    setTimeout(() => {
      // Asetetaan haamujen liikkuminen tapahtumaan ghostSpeed-määräajoin
      ghostInterval = setInterval(moveGhosts, ghostSpeed);
    }, 1000); // 1000 ms = 1 sekunti
  }
  
  
