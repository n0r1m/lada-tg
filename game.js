class DinoGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.startBtn = document.getElementById('startGame');
        this.personalBest = parseInt(localStorage.getItem('personalBest')) || 0;
        this.personalBestElement = document.getElementById('personalBest');
        
        // Game state
        this.isPlaying = false;
        this.score = 0;
        this.gameSpeed = 2;
        
        // Player
        this.player = {
            x: 50,
            y: 0,
            width: 40,
            height: 40,
            jumping: false,
            jumpForce: 0,
            gravity: 0.4
        };
        
        // Obstacles
        this.obstacles = [];
        this.obstacleWidth = 20;
        this.obstacleHeight = 40;
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        
        // Touch controls
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!this.isPlaying) {
                this.startGame();
            } else if (!this.player.jumping) {
                this.player.jumping = true;
                this.player.jumpForce = -10;
            }
        }, { passive: false });
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 200;
        this.player.y = this.canvas.height - 60;
    }
    
    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.score = 0;
        this.gameSpeed = 2;
        this.obstacles = [];
        this.player.jumping = false;
        this.player.jumpForce = 0;
        this.player.y = this.canvas.height - 60;
        
        this.startBtn.textContent = 'Игра идет...';
        this.gameLoop();
    }
    
    createObstacle() {
        const obstacle = {
            x: this.canvas.width,
            y: this.canvas.height - this.obstacleHeight - 20,
            width: this.obstacleWidth,
            height: this.obstacleHeight
        };
        this.obstacles.push(obstacle);
    }
    
    update() {
        // Update player
        if (this.player.jumping) {
            this.player.y += this.player.jumpForce;
            this.player.jumpForce += this.player.gravity;
            
            if (this.player.y >= this.canvas.height - 60) {
                this.player.y = this.canvas.height - 60;
                this.player.jumping = false;
            }
        }
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            this.obstacles[i].x -= this.gameSpeed;
            
            // Remove off-screen obstacles
            if (this.obstacles[i].x + this.obstacleWidth < 0) {
                this.obstacles.splice(i, 1);
                this.score++;
                
                // Update personal best
                if (this.score > this.personalBest) {
                    this.personalBest = this.score;
                    this.personalBestElement.textContent = this.personalBest;
                    localStorage.setItem('personalBest', this.personalBest);
                }
            }
            
            // Check collision
            if (this.checkCollision(this.player, this.obstacles[i])) {
                this.gameOver();
            }
        }
    }
    
    checkCollision(player, obstacle) {
        return player.x < obstacle.x + obstacle.width &&
               player.x + player.width > obstacle.x &&
               player.y < obstacle.y + obstacle.height &&
               player.y + player.height > obstacle.y;
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw ground
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, this.canvas.height - 20, this.canvas.width, 20);
        
        // Draw player (car)
        this.ctx.fillStyle = '#1E90FF';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Draw car details
        this.ctx.fillStyle = '#FFFFFF';
        // Windows
        this.ctx.fillRect(this.player.x + 5, this.player.y + 5, 15, 10);
        this.ctx.fillRect(this.player.x + 20, this.player.y + 5, 15, 10);
        // Body
        this.ctx.fillRect(this.player.x + 2, this.player.y + 15, 36, 25);
        
        // Draw obstacles
        this.ctx.fillStyle = '#FF4444';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
        
        // Draw score
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(`Счёт: ${this.score}`, 10, 30);
    }
    
    gameOver() {
        this.isPlaying = false;
        this.startBtn.textContent = 'Начать игру';
        showToast(`Игра окончена! Счёт: ${this.score}`);
    }
    
    gameLoop() {
        if (!this.isPlaying) return;
        
        // Create new obstacles
        if (Math.random() < 0.01) {
            this.createObstacle();
        }
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DinoGame();
}); 