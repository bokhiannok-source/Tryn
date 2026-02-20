// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 }
);

// Cursor glow effect
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  z-index: 9998;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

document
  .querySelectorAll(
    ".thing-item, .song-card, .closing-text, .closing-small"
  )
  .forEach((el) => observer.observe(el));

// Nav dots
const sections = ["hero", "things", "playlist", "closing"];
const dots = document.querySelectorAll(".nav-dot");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target.id);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});
