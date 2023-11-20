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
    }
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