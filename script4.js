document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('animationBox');
    const colors = ['#28a745', '#dc3545', '#ffc107', '#007bff', '#17a2b8', '#6f42c1', '#fd7e14'];
    
    let currentColorIndex = 0;

    document.getElementById('expandBtn').addEventListener('click', () => {
        if (!box.classList.contains('expand')) {
            box.className = 'animation-box expand';
        } else {
          
            box.classList.remove('expand');
        }
    });

    document.getElementById('rotateBtn').addEventListener('click', () => {
        box.classList.remove('slide', 'expand');
        box.classList.add('rotate');
        
        // Rotate box and change color
        box.style.transition = 'transform 1s ease-in-out, background-color 1s ease-in-out';
        let newColorIndex;
        do {
            newColorIndex = Math.floor(Math.random() * colors.length);
        } while (newColorIndex === currentColorIndex); 
        
        box.style.backgroundColor = colors[newColorIndex];
        currentColorIndex = newColorIndex;
    });

    document.getElementById('slideBtn').addEventListener('click', () => {
        box.classList.remove('rotate', 'expand');
        box.classList.add('slide');
    });
});