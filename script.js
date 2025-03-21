// Initialize Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();

// DOM Elements
const channelBtn = document.getElementById('channelBtn');
const comingSoon1 = document.getElementById('comingSoon1');
const comingSoon2 = document.getElementById('comingSoon2');
const friendsBtn = document.getElementById('friendsBtn');
const referralCount = document.getElementById('referralCount');
const progressFill = document.getElementById('progressFill');
const hintBtn = document.getElementById('hintBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const carModel = document.getElementById('carModel');
const coinBalance = document.getElementById('coinBalance');

// Initialize localStorage values
let coins = parseInt(localStorage.getItem('coins')) || 0;
let referrals = parseInt(localStorage.getItem('referralCount')) || 0;

// Update UI with stored values
updateUI();

// Navigation Bar Functions
channelBtn.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/your_channel');
});

comingSoon1.addEventListener('click', () => {
    showToast('Coming Soon!');
});

comingSoon2.addEventListener('click', () => {
    showToast('Coming Soon!');
});

// Referral System
friendsBtn.addEventListener('click', () => {
    const botUsername = tg.initDataUnsafe.user?.username || 'your_bot';
    const referralLink = `https://t.me/${botUsername}?start=ref_${tg.initDataUnsafe.user?.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(referralLink).then(() => {
        showToast('Referral link copied to clipboard!');
    });
});

// Hint Button
hintBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Car Click Feature
carModel.addEventListener('click', () => {
    coins++;
    localStorage.setItem('coins', coins);
    updateUI();
    showToast('+1 coin!');
});

// Helper Functions
function updateUI() {
    // Update coin balance
    coinBalance.textContent = coins;
    
    // Update referral count and progress
    referralCount.textContent = referrals;
    const progress = (referrals / 10) * 100;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add toast styles dynamically
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 1000;
        animation: fadeInOut 3s ease;
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, 20px); }
        15% { opacity: 1; transform: translate(-50%, 0); }
        85% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style); 