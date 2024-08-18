

let nextId = 6; // Initial ID for new items; starts from 6 since we start with 1-5

// Function to create a new grid item
function createGridItem(id) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.draggable = true;
    item.dataset.id = id;
    item.textContent = 'Item ${id}';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering drag events
        removeItem(item);
    });

    item.appendChild(removeBtn);

    // Drag events
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.id);
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });

    return item;
}

// Function to handle drop events
function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedItem = document.querySelector('[data-id="${id}"]');
    const target = e.target.closest('.grid-item');

    if (target && target !== draggedItem) {
        const grid = document.getElementById('grid');
        // Move the dragged item to the position of the target item
        grid.insertBefore(draggedItem, target.nextSibling);
    }
}

// Function to allow dragging over items
function handleDragOver(e) {
    e.preventDefault();
}

// Function to add new item to the grid
function addNewItem() {
    const grid = document.getElementById('grid');
    // Find the highest ID currently displayed
    const items = Array.from(grid.querySelectorAll('.grid-item'));
    let highestId = 0;
    if (items.length > 0) {
        highestId = Math.max(...items.map(item => parseInt(item.dataset.id, 10)));
    }
    const newId = highestId + 1;
    const newItem = createGridItem(newId);
    
    grid.appendChild(newItem);
}

// Function to remove an item from the grid
function removeItem(item) {
    const grid = document.getElementById('grid');
    grid.removeChild(item);
    updateItemIds();
}

// Function to update IDs of remaining items to maintain order
function updateItemIds() {
    const gridItems = document.querySelectorAll('.grid-item');
    let id = 1;
    gridItems.forEach((item) => {
        item.dataset.id = id;
        item.textContent = "Item ${id}";
        const removeBtn = item.querySelector('.remove-btn');
        item.appendChild(removeBtn); // Re-append button to ensure it stays with item
        id++;
    });
    nextId = id; // Update nextId to be the next available number
}

// Initialize the grid with some items
const grid = document.getElementById('grid');
for (let i = 1; i <= 2; i++) {
    const item = createGridItem(i);
    grid.appendChild(item);
}

// Add event listeners for drag and drop
grid.addEventListener('dragover', handleDragOver);
grid.addEventListener('drop', handleDrop);

// Add new item button event listener
const addItemBtn = document.getElementById('addItemBtn');
addItemBtn.addEventListener('click', addNewItem);

// Add remove item button event listener
const removeItemBtn = document.getElementById('removeItemBtn');
removeItemBtn.addEventListener('click', () => {
    const itemToRemove = prompt('Enter the item number to remove:');
    if (itemToRemove) {
        const item = document.querySelector('[data-id="${itemToRemove}"]');
        if (item) {
            removeItem(item);
        } else {
            alert('Item not found.');
        }
    }
});