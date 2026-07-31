document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const landing = document.getElementById('landing');
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationStarted = false;
    let particles = [];
    let animationFrameId;
    
    startBtn.addEventListener('click', () => {
        if (animationStarted) return;
        animationStarted = true;
        
        // Hide landing UI
        landing.classList.add('hidden');
        
        // Start animation
        setTimeout(() => {
            requestAnimationFrame(animateHearts);
        }, 800);

        // Show the next button after 4 seconds of enjoying the animation
        setTimeout(() => {
            nextBtn.classList.remove('hidden-btn');
        }, 4000);
    });

    class HeartParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 20 + 10;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1;
            this.color = `hsla(${Math.random() * 40 + 330}, 100%, 65%, ${Math.random() * 0.5 + 0.3})`;
            this.sway = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.05 + 0.02;
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.sway) * 1.5 + this.speedX;
            this.sway += this.swaySpeed;
        }

        draw(ctx) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            
            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(this.x, this.y + topCurveHeight);
            ctx.bezierCurveTo(
                this.x, this.y, 
                this.x - this.size / 2, this.y, 
                this.x - this.size / 2, this.y + topCurveHeight
            );
            ctx.bezierCurveTo(
                this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
                this.x, this.y + (this.size + topCurveHeight) / 2, 
                this.x, this.y + this.size
            );
            ctx.bezierCurveTo(
                this.x, this.y + (this.size + topCurveHeight) / 2, 
                this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
                this.x + this.size / 2, this.y + topCurveHeight
            );
            ctx.bezierCurveTo(
                this.x + this.size / 2, this.y, 
                this.x, this.y, 
                this.x, this.y + topCurveHeight
            );
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add new particles occasionally
        if (Math.random() < 0.2) {
            particles.push(new HeartParticle());
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(ctx);
            
            // Remove particles that went off screen
            if (particles[i].y < -50) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        animationFrameId = requestAnimationFrame(animateHearts);
    }

    function drawText() {
        const screenScale = Math.min(window.innerWidth / 550, window.innerHeight / 750, 1);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        const fontSize = Math.max(16, Math.floor(26 * screenScale));
        ctx.font = `bold ${fontSize}px "Comic Sans MS", cursive, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("Sorry, Manjusha 💖", cx, cy + 260 * screenScale);
        
        ctx.fillStyle = "pink";
        ctx.fillText("Sorry, Manjusha 💖", cx, cy + 260 * screenScale);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', () => {
        // Stop the floating hearts animation
        cancelAnimationFrame(animationFrameId);
        
        document.body.style.backgroundImage = "url('PIC.jpeg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
        canvas.style.backgroundColor = "transparent";
        nextBtn.classList.add('hidden-btn');
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the text over the picture
        drawText();
    });
});
