import { initMap } from './modules/map.js';
import { handleTabClick, setupActionListeners } from './modules/ui.js';
import { nextDay } from './modules/game.js';

function init() {
    console.log("Initializing President Simulator...");
    initMap();

    document.querySelectorAll('.tabs .tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const parentPanel = button.closest('.panel');
            const tabId = button.dataset.tab;
            handleTabClick(parentPanel, tabId);
        });
    });

    setupActionListeners();
    document.getElementById('next-day-btn').addEventListener('click', nextDay);
}

document.addEventListener('DOMContentLoaded', init);

