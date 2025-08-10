
(function () {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    let cw, ch;

    function resizeCanvas() {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const fireworks = [];
    const particles = [];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function Firework() {
      this.x = cw / 2;
      this.y = ch;
      this.tx = random(0, cw);
      this.ty = random(0, ch / 2);
      this.distance = Math.hypot(this.tx - this.x, this.ty - this.y);
      this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
      this.speed = 5;
      this.traveled = 0;
    }

    Firework.prototype.update = function () {
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.x += vx;
      this.y += vy;
      this.traveled += Math.hypot(vx, vy);
      if (this.traveled >= this.distance) {
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle(this.tx, this.ty));
        }
        return false;
      }
      return true;
    };

    Firework.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.angle = Math.random() * 2 * Math.PI;
      this.speed = random(1, 6);
      this.friction = 0.96;
      this.gravity = 0.05;
      this.alpha = 1;
      this.decay = random(0.015, 0.03);
      this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;
    }

    Particle.prototype.update = function () {
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;
      return this.alpha > 0;
    };

    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    };

    function animate() {
      requestAnimationFrame(animate);
      // ✨ Transparent background instead of black
      ctx.clearRect(0, 0, cw, ch);

      if (Math.random() < 0.05) {
        fireworks.push(new Firework());
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        if (!fireworks[i].update()) {
          fireworks.splice(i, 1);
        } else {
          fireworks[i].draw();
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
          particles.splice(i, 1);
        } else {
          particles[i].draw();
        }
      }
    }

    animate();
  })();
