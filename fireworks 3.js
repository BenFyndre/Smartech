 document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    // Create fireworks canvas inside #home
    const canvas = document.createElement("canvas");
    canvas.id = "fireworks-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = 2;
    canvas.style.pointerEvents = "none";
    homeSection.style.position = "relative"; // make sure home is relative
    homeSection.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let cw = canvas.width = homeSection.clientWidth;
    let ch = canvas.height = homeSection.clientHeight;

    window.addEventListener("resize", () => {
      cw = canvas.width = homeSection.clientWidth;
      ch = canvas.height = homeSection.clientHeight;
    });

    const fireworks = [], particles = [];

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
      this.speed = 4;
      this.traveled = 0;

    this.explodeAt = this.distance * random(0.3, 0.8)
    }

    Firework.prototype.update = function () {
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.x += vx;
      this.y += vy;
      this.traveled += Math.hypot(vx, vy);
      if (this.traveled >= this.distance) {
        for (let i = 0; i < 200; i++) {
          particles.push(new Particle(this.tx, this.ty));
        }
        return false;
      }
      return true;
    };

    Firework.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.angle = Math.random() * 2 * Math.PI;
      this.speed = random(2, 9);
      this.friction = 0.95;
      this.gravity = 0.06;
      this.alpha = 1;
      this.decay = random(0.012, 0.025);
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
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    };

    let active = true;
    function animate() {
      if (!active) return;
      requestAnimationFrame(animate);
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

    // Stop after 15 seconds
    setTimeout(() => {
      active = false;
      canvas.remove();
    }, 30000);
  });
