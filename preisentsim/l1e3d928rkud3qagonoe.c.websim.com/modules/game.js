import { generateReport } from './ai.js';
import { showScreen, updateHeaderUI, updateStatsUI, showLoading, hideLoading, addLawToUI, addNewsToUI, updateGameDateUI, toggleActionButtons } from './ui.js';

let gameState = {};

function createInitialStats(countryName) {
    // These are simplified and randomized for gameplay variety
    const hash = countryName.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const rand = (min, max) => min + (hash % (max - min));
    
    return {
        population: rand(5_000_000, 300_000_000),
        gdp: rand(100, 20000), // in Billions
        budget: rand(10, 2000), // in Billions
        approval: 50,
        crimeRate: rand(5, 40),
        educationLevel: rand(30, 90),
        unemployment: rand(3, 15),
        deaths: 0, // Start with a clean slate
        suspicion: 0, // Hidden stat for private actions
        taxes: rand(15, 45), // Average national tax rate as a percentage of GDP
        research: 0, // Represents an abstract level of research and development
    };
}

export function startGame(countryName, presidentName) {
    showScreen('game-screen');
    updateHeaderUI(countryName, presidentName);
    
    gameState = {
        countryName,
        presidentName,
        day: 1,
        stats: createInitialStats(countryName),
        laws: [],
        events: []
    };
    
    updateStatsUI(gameState.stats);
    updateGameDateUI(gameState.day);
    toggleActionButtons(false);
    console.log(`Game started for ${countryName} with president ${presidentName}`, gameState);
}

export function addLaw(lawText) {
    if (gameState.stats.budget < 1) {
        addNewsToUI("Government lacks funds to enact new legislation.", "news");
        return;
    }
    showLoading('Deliberating new law...');
    toggleActionButtons(true);
    gameState.laws.push(lawText);
    addLawToUI(lawText);
    gameState.stats.budget -= 1; // Simplified cost for passing a law
    
    const context = `President ${gameState.presidentName} of ${gameState.countryName} just passed a new law: "${lawText}". This is a public action (isPrivate: false). The current country situation is: GDP ${gameState.stats.gdp}B, Approval ${gameState.stats.approval}%, Crime ${gameState.stats.crimeRate}%, Suspicion ${gameState.stats.suspicion}%.`;
    
    generateReport(context, 'law').then(report => {
        applyChanges(report.stat_changes);
        addNewsToUI(report.news_report, 'news');
        addNewsToUI(report.conspiracy_theory, 'conspiracy');
        hideLoading();
    });
}

export function executeCommand(commandText) {
    if (gameState.stats.budget < 5) {
        addNewsToUI("Insufficient funds for major executive action.", "news");
        return;
    }
    showLoading('Executing command...');
    toggleActionButtons(true);
    gameState.stats.budget -= 5; // Base cost for a command
    
    const isPrivate = commandText.trim().toUpperCase().startsWith('PRIVATE:');
    const commandContent = isPrivate ? commandText.trim().substring(8).trim() : commandText.trim();

    const context = `President ${gameState.presidentName} of ${gameState.countryName} issued an executive command: "${commandContent}". isPrivate: ${isPrivate}. The current country situation is: GDP ${gameState.stats.gdp}B, Approval ${gameState.stats.approval}%, Crime ${gameState.stats.crimeRate}%, currentSuspicion: ${gameState.stats.suspicion}.`;
    
    generateReport(context, 'command').then(report => {
        applyChanges(report.stat_changes);
        
        if (report.leaked_story) {
            addNewsToUI(`LEAK: ${report.leaked_story}`, 'news', 'urgent');
             // Reset suspicion after a leak
            gameState.stats.suspicion = 10;
        } else {
            addNewsToUI(report.news_report, 'news');
        }

        addNewsToUI(report.conspiracy_theory, 'conspiracy');
        hideLoading();
    });
}

export function nextDay() {
    showLoading('Simulating the next day...');
    gameState.day += 1;
    
    // Organic daily changes
    gameState.stats.deaths += Math.floor(gameState.stats.population * 0.000022); // Approximate daily crude death rate
    gameState.stats.population = Math.floor(gameState.stats.population * 1.00001); // Approximate daily crude birth rate
    gameState.stats.approval = Math.max(0, gameState.stats.approval - 0.05);

    const context = `It's a new day for President ${gameState.presidentName} in ${gameState.countryName}. The current country situation is: GDP ${gameState.stats.gdp}B, Approval ${gameState.stats.approval}%, Unemployment ${gameState.stats.unemployment}%. The most recent law is: "${gameState.laws.slice(-1)[0] || 'None'}".`;

    generateReport(context, 'next_day').then(report => {
        applyChanges(report.stat_changes);
        addNewsToUI(report.news_report, 'news');
        addNewsToUI(report.conspiracy_theory, 'conspiracy');
        
        updateGameDateUI(gameState.day);
        updateStatsUI(gameState.stats);
        toggleActionButtons(false);
        hideLoading();
    });
}

function applyChanges(changes) {
    if (!changes) return;

    for (const key in changes) {
        // Ensure the change is a valid number, otherwise skip.
        const changeValue = parseFloat(changes[key]);
        if (isNaN(changeValue)) continue;

        if (gameState.stats.hasOwnProperty(key)) {
            // It's an existing stat, apply the change as a delta.
            gameState.stats[key] += changeValue;
        } else {
            // It's a new stat! Add it to the game state with its initial value.
            console.log(`New stat introduced: ${key}`);
            gameState.stats[key] = changeValue;
        }
    }
    
    // Clamp values to reasonable ranges
    gameState.stats.approval = Math.max(0, Math.min(100, gameState.stats.approval));
    gameState.stats.crimeRate = Math.max(0, Math.min(100, gameState.stats.crimeRate));
    gameState.stats.educationLevel = Math.max(0, Math.min(100, gameState.stats.educationLevel));
    gameState.stats.unemployment = Math.max(0, Math.min(100, gameState.stats.unemployment));
    gameState.stats.suspicion = Math.max(0, Math.min(100, gameState.stats.suspicion || 0));
    gameState.stats.gdp = Math.max(1, gameState.stats.gdp);
    gameState.stats.budget = Math.max(0, gameState.stats.budget);

    // Round to 2 decimal places
    for (const key in gameState.stats) {
        gameState.stats[key] = parseFloat(gameState.stats[key].toFixed(2));
    }

    updateStatsUI(gameState.stats);
}