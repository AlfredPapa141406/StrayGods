// Stats Manager
class StatsManager {
    constructor() {
        this.stats = [];
        this.loadStats();
    }

    async loadStats() {
        this.stats = await sheetsManager.getStats() || [];
    }

    async renderStats() {
        await this.loadStats();
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;

        statsGrid.innerHTML = '';
        this.stats.forEach(stat => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card animate-on-scroll';
            statCard.innerHTML = `
                <h3>${stat.title}</h3>
                <p class="stat-number">${stat.value}</p>
            `;
            statsGrid.appendChild(statCard);
        });
    }
}

// Initialize managers
const statsManager = new StatsManager(); 