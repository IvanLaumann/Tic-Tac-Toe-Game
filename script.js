let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;
            cell.textContent = fields[index] || '';
            row.appendChild(cell);

            // Füge das onclick-Attribut hinzu und setze die Funktion für den Klick-Event
            cell.onclick = function() {
                handleCellClick(cell, index);
            };
        }

        table.appendChild(row);
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);
}

function handleCellClick(cell, index) {
    if (fields[index] === null) {
        const currentPlayer = fields.filter(field => field !== null).length % 2 === 0 ? 'circle' : 'cross';
        
        fields[index] = currentPlayer;
        const htmlCode = currentPlayer === 'circle' ? generateAnimatedCircle() : generateAnimatedCross();

        cell.innerHTML = htmlCode;
        cell.onclick = null;

        const winner = checkGameEnd();

        if (winner === 'circle' || winner === 'cross') {
            drawWinningLine(winner);
            showEndGameOverlay(`Spieler ${winner === 'circle' ? '1' : '2'} hat gewonnen! 🔥`);
        } else if (winner === 'draw') {
            showEndGameOverlay('Unentschieden! 😁');
        }
    }
}

function showEndGameOverlay(message) {
    const endGameOverlay = document.getElementById('endGameOverlay');
    const endGameContent = document.getElementById('endGameContent');
    endGameContent.innerHTML = `<h2>${message}</h2><button onclick="restartGame()">Neustart</button>`;
    endGameOverlay.style.display = 'flex';
}

function restartGame() {
    // Hier setzt du die Spielvariablen zurück und versteckst das Overlay
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    const endGameOverlay = document.getElementById('endGameOverlay');
    endGameOverlay.style.display = 'none';

    // Rufe die Funktion auf, um das Spiel neu zu rendern
    render();
}

function generateAnimatedCircle() {
    const svgCode = `
    <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5">
        <animate attributeName="r" values="0;30" dur="200ms" begin="0s"/>
    </circle>
</svg>
    `;

    return svgCode;
}

function generateAnimatedCross() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="125ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="125ms" begin="0s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="200ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="200ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}

function checkGameEnd() {
    // Überprüfe auf einen Gewinner
    const winningCombos = [
        // Horizontale Linien
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertikale Linien
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonale Linien
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Gewinner gefunden, gib den Gewinner zurück
            return fields[a];
        }
    }

    // Überprüfe auf ein Unentschieden
    if (fields.every(cell => cell !== null)) {
        // Unentschieden
        return 'draw';
    }

    // Spiel geht weiter
    return null;
}

function drawWinningLine(winner) {
    const contentDiv = document.getElementById('content');

    if (winner) {
        // Ermittle die Gewinnkombination
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
                // Entferne zuerst alle vorhandenen Klassen von allen Zellen
                const table = contentDiv.querySelector('table');
                const cells = table.getElementsByTagName('td');
                for (const cell of cells) {
                    cell.classList.remove('winning-cell', 'horizontal', 'vertical', 'diagonal-left', 'diagonal-right');
                }

                // Füge die Klassen zur Gewinnzellen hinzu
                [a, b, c].forEach(index => {
                    const cell = cells[index];
                    cell.classList.add('winning-cell');

                    // Bestimme die Gewinnrichtung und füge die entsprechende Klasse hinzu
                    if (a % 3 === b % 3 && b % 3 === c % 3) {
                        cell.classList.add('horizontal');
                    } else if (Math.floor(a / 3) === Math.floor(b / 3) && Math.floor(b / 3) === Math.floor(c / 3)) {
                        cell.classList.add('vertical');
                    } else {
                        // Diagonale überprüfen
                        const diagonals = [[0, 4, 8], [2, 4, 6]];
                        if (diagonals.some(diagonal => diagonal.every(diagonalIndex => combo.includes(diagonalIndex)))) {
                            if (a === 0 || a === 8) {
                                cell.classList.add('diagonal-left');
                            } else {
                                cell.classList.add('diagonal-right');
                            }
                        }
                    }
                });

                return;
            }
        }
    }
}