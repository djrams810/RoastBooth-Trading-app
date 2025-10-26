# RoastBooth Trading App ☕

A web-based coffee bean trading simulator where you can buy and sell premium coffee beans in a dynamic market.

## Features

- **Real-time Market Prices**: Coffee bean prices fluctuate every 5 seconds to simulate a real market
- **Portfolio Management**: Track your holdings and total net worth
- **Buy/Sell Functionality**: Trade four types of premium coffee beans
- **Transaction History**: View your last 10 transactions
- **Persistent State**: Your balance, portfolio, and transaction history are saved locally

## Coffee Bean Types

1. **Arabica Beans** - Starting at $25.50/lb
2. **Robusta Beans** - Starting at $18.75/lb
3. **Liberica Beans** - Starting at $32.00/lb
4. **Excelsa Beans** - Starting at $28.25/lb

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or server required!

### How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/djrams810/RoastBooth-Trading-app.git
   cd RoastBooth-Trading-app
   ```

2. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Right-click and select "Open with" your browser, or
   - Use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### How to Play

1. You start with a balance of **$10,000**
2. **Buy** coffee beans when prices are low
3. **Sell** them when prices rise to make a profit
4. Watch your portfolio value and net worth grow!
5. Your progress is automatically saved in your browser

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - All functionality (no frameworks required)
- **LocalStorage** - Data persistence

## File Structure

```
RoastBooth-Trading-app/
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── app.js          # Trading logic and state management
└── README.md       # This file
```

## Features Explained

### Dynamic Pricing
Prices update every 5 seconds with random fluctuations to simulate market conditions.

### Portfolio Tracking
- **Account Balance**: Your available cash
- **Portfolio Value**: Current value of all your coffee bean holdings
- **Total Net Worth**: Balance + Portfolio Value

### Transaction History
The app keeps track of your last 10 transactions, showing:
- Type (Buy/Sell)
- Quantity
- Price per pound
- Total transaction value
- Timestamp

### Local Storage
All your data persists in your browser's local storage, so you can close the tab and return later without losing progress.

## Tips for Success

- Buy low, sell high!
- Diversify your portfolio across different bean types
- Watch the market trends
- Don't spend all your cash - keep some for opportunities

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

## License

This project is open source and available for educational purposes.

## Author

Created by djrams810

---

**Happy Trading! ☕📈**