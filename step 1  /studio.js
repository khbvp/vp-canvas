document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let painting = false;
  let startX, startY;
  let tool = 'brush';

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', finishPosition);
  canvas.addEventListener('mousemove', draw);

  document.getElementById('clear').addEventListener('click', clearCanvas);
  document.getElementById('brush').addEventListener('click', () => (tool = 'brush'));
  document.getElementById('rectangle').addEventListener('click', () => (tool = 'rectangle'));
  document.getElementById('circle').addEventListener('click', () => (tool = 'circle'));

  function startPosition(e) {
    painting = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    if (tool === 'brush') draw(e);
  }

  function finishPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    if (tool === 'brush') {
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener('mouseup', function (e) {
    if (tool === 'rectangle') {
      const width = e.clientX - canvas.offsetLeft - startX;
      const height = e.clientY - canvas.offsetTop - startY;
      ctx.strokeRect(startX, startY, width, height);
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(e.clientX - canvas.offsetLeft - startX, 2) + Math.pow(e.clientY - canvas.offsetTop - startY, 2),
      );
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  });
});
