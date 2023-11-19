let fields = [
    null,
    'circle',
    null,
    null,
    null,
    null,
    'cross',
    'cross',
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

            if (fields[index] === 'circle') {
                cell.textContent = 'o';
            } else if (fields[index] === 'cross') {
                cell.textContent = 'x';
            }
        }
        
        table.appendChild(row);
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);
}