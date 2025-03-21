# Lada Telegram Mini App

A fun and interactive Telegram Mini App featuring a referral system, coin collection, and a dinosaur mini-game.

## Features

- Navigation bar with channel link and "Coming Soon" buttons
- Referral system with progress tracking
- Coin collection by clicking the car model
- Dinosaur mini-game with personal best tracking
- Responsive design for mobile devices

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to repository Settings > Pages
4. Select the main branch as the source
5. Save the settings

Your app will be available at: `https://[your-username].github.io/[repository-name]`

## Telegram Bot Setup

1. Create a new bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Set up the webhook to point to your bot's server
4. Configure the Mini App in BotFather:
   - Use `/newapp` command
   - Select your bot
   - Enter the GitHub Pages URL
   - Set the app title and description

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. For Telegram WebApp testing:
   - Use the Telegram WebApp API in development mode
   - Or use the [Telegram WebApp Tester](https://t.me/WebAppTestBot)

## File Structure

- `index.html` - Main HTML file
- `styles.css` - Styling
- `script.js` - Core functionality
- `game.js` - Dinosaur mini-game implementation

## Customization

1. Update the channel URL in `script.js`:
```javascript
tg.openTelegramLink('https://t.me/your_channel');
```

2. Update the bot username in the referral link generation:
```javascript
const botUsername = tg.initDataUnsafe.user?.username || 'your_bot';
```

## Contributing

Feel free to submit issues and enhancement requests! 