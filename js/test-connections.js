// Test Connections Script
import { CONFIG } from './config.js';
import { fetchSheetData } from './sheets.js';

class ConnectionTester {
    constructor() {
        this.results = {
            success: [],
            failed: []
        };
        this.totalTests = 0;
        this.completedTests = 0;
    }

    async testConnection(sheetName) {
        try {
            console.log(`Testing connection to ${sheetName}...`);
            const data = await fetchSheetData(sheetName);
            
            if (data && Array.isArray(data)) {
                this.results.success.push({
                    sheet: sheetName,
                    records: data.length,
                    timestamp: new Date().toISOString()
                });
                console.log(`✅ ${sheetName}: Connected successfully - ${data.length} records found`);
            } else {
                throw new Error('Invalid data format received');
            }
        } catch (error) {
            this.results.failed.push({
                sheet: sheetName,
                error: error.message,
                timestamp: new Date().toISOString()
            });
            console.error(`❌ ${sheetName}: Connection failed - ${error.message}`);
        }
        this.completedTests++;
        this.updateProgress();
    }

    updateProgress() {
        const progress = (this.completedTests / this.totalTests) * 100;
        console.log(`Progress: ${progress.toFixed(1)}% (${this.completedTests}/${this.totalTests})`);
    }

    displayResults() {
        console.log('\n=== Connection Test Results ===');
        console.log(`\nSuccessful Connections (${this.results.success.length}):`);
        this.results.success.forEach(result => {
            console.log(`✅ ${result.sheet}: ${result.records} records`);
        });

        console.log(`\nFailed Connections (${this.results.failed.length}):`);
        this.results.failed.forEach(result => {
            console.log(`❌ ${result.sheet}: ${result.error}`);
        });

        // Add results to the DOM if we're in a browser
        if (typeof document !== 'undefined') {
            this.displayResultsInDOM();
        }
    }

    displayResultsInDOM() {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'connection-test-results';
        
        const style = document.createElement('style');
        style.textContent = `
            .connection-test-results {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--secondary-color);
                border: 1px solid var(--primary-color);
                border-radius: 10px;
                padding: 20px;
                max-width: 400px;
                max-height: 80vh;
                overflow-y: auto;
                z-index: 9999;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            .test-success {
                color: #4CAF50;
                margin: 5px 0;
            }
            .test-failed {
                color: #f44336;
                margin: 5px 0;
            }
            .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                color: var(--text-light);
                cursor: pointer;
            }
            .close-button:hover {
                color: var(--accent-color);
            }
        `;
        document.head.appendChild(style);

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => resultsContainer.remove();
        resultsContainer.appendChild(closeButton);

        const title = document.createElement('h3');
        title.textContent = 'Connection Test Results';
        title.style.marginBottom = '15px';
        resultsContainer.appendChild(title);

        // Success section
        if (this.results.success.length > 0) {
            const successTitle = document.createElement('h4');
            successTitle.textContent = `Successful Connections (${this.results.success.length})`;
            resultsContainer.appendChild(successTitle);

            this.results.success.forEach(result => {
                const div = document.createElement('div');
                div.className = 'test-success';
                div.textContent = `✓ ${result.sheet}: ${result.records} records`;
                resultsContainer.appendChild(div);
            });
        }

        // Failed section
        if (this.results.failed.length > 0) {
            const failedTitle = document.createElement('h4');
            failedTitle.textContent = `Failed Connections (${this.results.failed.length})`;
            failedTitle.style.marginTop = '15px';
            resultsContainer.appendChild(failedTitle);

            this.results.failed.forEach(result => {
                const div = document.createElement('div');
                div.className = 'test-failed';
                div.textContent = `✗ ${result.sheet}: ${result.error}`;
                resultsContainer.appendChild(div);
            });
        }

        document.body.appendChild(resultsContainer);
    }

    async runAllTests() {
        const sheets = Object.values(CONFIG.SHEETS);
        this.totalTests = sheets.length;
        this.completedTests = 0;

        console.log('Starting connection tests...');
        await Promise.all(sheets.map(sheet => this.testConnection(sheet)));
        this.displayResults();
    }
}

// Create and export the tester instance
export const connectionTester = new ConnectionTester();

// Auto-run tests if in a browser environment
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        const testButton = document.createElement('button');
        testButton.textContent = 'Test Sheet Connections';
        testButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: var(--accent-color);
            color: var(--text-dark);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 9999;
            font-weight: bold;
        `;
        testButton.onclick = () => connectionTester.runAllTests();
        document.body.appendChild(testButton);
    });
} 