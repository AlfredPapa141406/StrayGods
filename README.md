# STRAYGODS Guild Website

A modern, responsive website for the STRAYGODS Guild featuring a sleek dark theme with cyan accents.

## Features

### 🏠 Home Page
- Dynamic hero section with guild statistics
- Latest news and announcements
- Featured guild activities
- Quick access to important guild information

### 👥 Members Section
- Complete guild roster
- Role-based member cards with special styling
  - Guild Leader (Gold accents)
  - Vice Guild Leader (Silver accents)
  - Admin (Bronze accents)
- Class distribution statistics
- Member search functionality

### ⚔️ Party List
- War of Crystal (WoC) party compositions
- War of Emperium (WoE) party formations
- Real-time updates from Google Sheets
- Class-specific color coding
- Team-based organization

### 📅 Events
- Upcoming guild events
- Event calendar
- Event details and registration

### ℹ️ About
- Guild history
- Mission statement
- Achievements
- Leadership structure

### 📞 Contact
- Guild recruitment form
- Contact information
- Social media links

## Technical Features

### 🎨 Design
- Modern dark theme with cyan accents
- Responsive design for all devices
- Animated elements and transitions
- Custom scrollbar styling
- Neon text effects
- Role-specific card designs

### 🔧 Integration
- Google Sheets API integration for dynamic data
- Real-time party list updates
- Data validation for member management
- Cross-sheet duplicate checking

### 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Configure Google Sheets:
- Create a Google Cloud Project
- Enable Google Sheets API
- Create API credentials
- Update config.js with your credentials

3. Set up Google Sheets:
- Create sheets named:
  - "WoE_WoC Party"
  - "Members"
  - Other content sheets

4. Update Configuration:
```javascript
// config.js
export const CONFIG = {
    SHEETS_ID: 'your-sheet-id',
    API_KEY: 'your-api-key'
};
```

5. Deploy the website:
- Host on any web server
- Ensure CORS is properly configured
- Set up proper file permissions

## 📁 Project Structure

```
STRAYGODS/
├── css/
│   ├── styles.css        # Main styles
│   ├── partylist.css     # Party list specific styles
│   └── [other css files]
├── images/
│   └── STRAYGODS_Logo.png
├── js/
│   ├── config.js         # Configuration
│   └── sheets.js         # Google Sheets integration
├── index.html
├── members.html
├── partylist.html
├── events.html
├── about.html
├── contact.html
└── README.md
```

## 🎨 Color Scheme

- Primary: #00e1ff (Cyan)
- Background: #000000 (Black)
- Text: #ffffff (White)
- Accents:
  - Gold: #FFD700
  - Silver: #C0C0C0
  - Bronze: #CD7F32

## 🔄 Maintenance

### Google Sheets Management
- Avoid modifying sheet names
- Use data validation for member names
- Keep party lists updated
- Regular backup of sheet data

### Website Updates
- Test responsiveness on multiple devices
- Verify API integration after changes
- Monitor API usage limits
- Keep dependencies updated

## 📝 License

[ALFRED PAPA ALL RIGHTS RESERVED]

## 🤝 Contributing

[DEVELOPER]

## 📧 Contact

For questions or support, contact:
- Discord: [Your Discord]
- Email: [alfredpapa1422@gmail.com]

