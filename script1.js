// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryInput = document.getElementById('categoryInput');
    const itemList = document.getElementById('itemList');
    const items = itemList.getElementsByClassName('item');

    searchInput.addEventListener('input', filterItems);
    categoryInput.addEventListener('input', filterItems);

    function filterItems() {
        const searchFilter = searchInput.value.toLowerCase();
        const categoryFilter = categoryInput.value.toLowerCase();

        for (let item of items) {
            const itemName = item.querySelector('h2').textContent.toLowerCase();
            const itemCategory = item.getAttribute('data-category').toLowerCase();
            const matchesSearch = itemName.includes(searchFilter);
            const matchesCategory = categoryFilter === '' || itemCategory.includes(categoryFilter);

            if (matchesSearch && matchesCategory) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        }
    }

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementsByClassName('close')[0];

    itemList.addEventListener('click', (event) => {
        if (event.target.classList.contains('item-img')) {
            modal.style.display = 'flex';
            modalImg.src = event.target.src;
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});