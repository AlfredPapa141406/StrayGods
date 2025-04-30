import { CONFIG } from './config.js';

// Function to fetch data from Google Sheets
export async function fetchSheetData(sheetName) {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEETS_ID}/values/${sheetName}?key=${CONFIG.API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
            console.warn(`No data found in sheet: ${sheetName}`);
            return [];
        }

        // Get headers from the first row
        const headers = data.values[0];
        
        // Convert the rest of the rows to objects using headers
        const rows = data.values.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
            });
            return obj;
        });

        return rows;
    } catch (error) {
        console.error(`Error fetching ${sheetName} data:`, error);
        throw error;
    }
} 