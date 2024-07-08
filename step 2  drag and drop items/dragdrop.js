document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let items = [
    { x: 50, y: 50, width: 100, height: 100, color: 'red', isDragging: false },
    { x: 200, y: 200, width: 100, height: 100, color: 'blue', isDragging: false },
  ];

  let selectedItem = null;

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);

  function drawItems() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach((item) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(item.x, item.y, item.width, item.height);
    });
  }

  function isInsideItem(x, y, item) {
    return x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height;
  }

  function onMouseDown(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    items.forEach((item) => {
      if (isInsideItem(x, y, item)) {
        item.isDragging = true;
        selectedItem = item;
      }
    });
  }

  function onMouseMove(e) {
    if (!selectedItem) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    if (selectedItem.isDragging) {
      selectedItem.x = x - selectedItem.width / 2;
      selectedItem.y = y - selectedItem.height / 2;
      drawItems();
    }
  }

  function onMouseUp() {
    if (selectedItem) {
      selectedItem.isDragging = false;
      selectedItem = null;
    }
  }

  drawItems();
});
