import { addLaw, executeCommand, startGame } from './game.js';

export function showScreen(screenId) {
    document.getElementById('map-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('president-modal').classList.add('hidden');
    document.getElementById(screenId).classList.remove('hidden');
}

export function showPresidentNameModal(countryName) {
    const modal = document.getElementById('president-modal');
    const countryNameSpan = document.getElementById('modal-country-name');
    const nameInput = document.getElementById('president-name-input');
    const startButton = document.getElementById('start-presidency-btn');

    countryNameSpan.textContent = countryName;
    nameInput.value = '';
    modal.classList.remove('hidden');
    nameInput.focus();

    const startHandler = () => {
        const presidentName = nameInput.value.trim() || 'Anonymous';
        modal.classList.add('hidden');
        startGame(countryName, presidentName);
        // Clean up listeners
        startButton.removeEventListener('click', startHandler);
        nameInput.removeEventListener('keypress', keypressHandler);
    };

    const keypressHandler = (e) => {
        if (e.key === 'Enter') {
            startHandler();
        }
    };

    startButton.addEventListener('click', startHandler);
    nameInput.addEventListener('keypress', keypressHandler);
}

export function showLoading(text = 'Simulating...') {
    document.getElementById('loading-text').textContent = text;
    document.getElementById('loading-overlay').classList.remove('hidden');
}

export function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

export function updateStatsUI(stats) {
    // Update header stats
    document.getElementById('approval-rating-display').textContent = `Approval: ${stats.approval.toFixed(2)}%`;

    const statsGrid = document.getElementById('stats-grid');
    
    // Dynamically update or create stat elements in the grid
    for (const key in stats) {
        if (key === 'approval' || key === 'suspicion') continue; // Skip non-displayed stats

        let statElement = document.getElementById(`stat-${key}`);
        
        if (!statElement) {
            // Create the element for the new stat if it doesn't exist
            statElement = document.createElement('div');
            statElement.classList.add('stat-item');
            statElement.id = `stat-${key}`;
            statsGrid.appendChild(statElement);
        }

        // Format the name and value
        const statName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        let statValueText = '';

        // Special formatting for specific stats
        const value = stats[key];
        switch(key) {
            case 'population':
                statValueText = (value / 1_000_000).toFixed(2) + 'M';
                break;
            case 'gdp':
            case 'budget':
                statValueText = `${value.toLocaleString()}`; // Base UI already says ($B)
                break;
            case 'crimeRate':
            case 'educationLevel':
            case 'unemployment':
            case 'taxes':
                statValueText = `${value.toFixed(2)}%`;
                break;
            case 'deaths':
                statValueText = Math.floor(value).toLocaleString();
                break;
            case 'research':
                 statValueText = value.toFixed(2);
                 break;
            default:
                // Generic formatting for new stats
                statValueText = typeof value === 'number' ? value.toLocaleString(undefined, {maximumFractionDigits: 2}) : value;
                break;
        }

        // Determine the label text
        let labelText;
        switch(key) {
            case 'gdp': labelText = 'GDP ($B):'; break;
            case 'budget': labelText = 'Budget ($B):'; break;
            case 'crimeRate': labelText = 'Crime Rate:'; break;
            case 'educationLevel': labelText = 'Education Lvl:'; break;
            case 'taxes': labelText = 'Tax Rate:'; break;
            case 'research': labelText = 'Research Lvl:'; break;
            default: labelText = `${statName}:`; break;
        }

        statElement.innerHTML = `${labelText} <span>${statValueText}</span>`;
    }
}

export function updateGameDateUI(day) {
    document.getElementById('game-date').textContent = `Day: ${day}`;
}

export function updateHeaderUI(countryName, presidentName) {
    document.getElementById('country-name-display').textContent = `Presidency of ${countryName}`;
    document.getElementById('president-name-display').textContent = `President ${presidentName}'s Administration`;
}

export function setCountryName(name) {
    document.getElementById('country-name-display').textContent = `Presidency of ${name}`;
}

export function handleTabClick(panel, tabId) {
    panel.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    panel.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    panel.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    panel.querySelector(`#${tabId}`).classList.add('active');
}

export function addLawToUI(lawText) {
    const lawsList = document.getElementById('laws-list');
    // Clear initial message if it exists
    if (lawsList.children.length === 1 && lawsList.children[0].textContent.includes('No laws enacted')) {
        lawsList.innerHTML = '';
    }
    const newLaw = document.createElement('li');
    newLaw.textContent = lawText;
    lawsList.prepend(newLaw);
}

export function addNewsToUI(newsText, feed = 'news', importance = 'normal') {
    const feedElement = document.getElementById(feed === 'news' ? 'news-feed' : 'conspiracy-feed');
    const newArticle = document.createElement('p');
    newArticle.textContent = newsText;
    if (importance === 'urgent') {
        newArticle.classList.add('urgent');
    }
    feedElement.prepend(newArticle);

    // Keep the feed from getting too long
    if (feedElement.children.length > 10) {
        feedElement.lastChild.remove();
    }
}

export function setupActionListeners() {
    document.getElementById('add-law-btn').addEventListener('click', () => {
        const input = document.getElementById('law-input');
        if (input.value.trim()) {
            addLaw(input.value.trim());
            input.value = '';
        }
    });

    document.getElementById('execute-command-btn').addEventListener('click', () => {
        const input = document.getElementById('custom-command');
        if (input.value.trim()) {
            executeCommand(input.value.trim());
            input.value = '';
        }
    });
}

export function toggleActionButtons(disabled) {
    document.getElementById('add-law-btn').disabled = disabled;
    document.getElementById('execute-command-btn').disabled = disabled;
    document.getElementById('law-input').disabled = disabled;
    document.getElementById('custom-command').disabled = disabled;
}