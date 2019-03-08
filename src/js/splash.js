const c = document.querySelector("#bg");
const ctx = c.getContext("2d");

class Bubble {
  constructor(settings) {
    Object.assign(this, {
      x: Math.random() * c.parentElement.offsetWidth,
      y: Math.random() * c.parentElement.offsetHeight,
      v: {
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 20
      },
      size: 80 + (40 * Math.random()),
      bg: Math.random() * 360
    });
    Object.assign(this, settings)
  }
  
}

const bubbles = [];
const n = 20;

for (let i = 0; i < n; ++i) {
  bubbles.push(new Bubble({x: i * (c.parentElement.offsetWidth / n)}))
}

lt = 0;

// const bg = `hsl(${Math.random() * 20}, 100%, 50%)`
const bg = '#00aac4'

function render(t) {
  const m = (t - lt) / 1000;
  c.width = c.parentElement.offsetWidth;
  c.height = c.parentElement.offsetHeight;
  
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, c.width, c.height)
  
  bubbles.forEach(function(i, j) {
    i.x += Math.cos(i.v.a)* i.v.s * m;
    i.y += Math.sin(i.v.a)* i.v.s * m;
    if(i.x < -i.size)      i.x = c.width + i.size;
    if(i.x > c.width + i.size) i.x = -i.size
    if(i.y < -i.size)      i.y = c.height + i.size
    if(i.y > c.height + i.size) i.y = -i.size
    ctx.fillStyle = `hsla(${i.bg}, 100%, 50%, 50%)`;
    ctx.beginPath();
    ctx.arc(i.x, i.y, i.size, 0, Math.PI * 2)
    ctx.fill()
  })
  
  requestAnimationFrame(render);
  lt = t;
}

requestAnimationFrame(render)