import carvingImages from './gallery-data.js';

document.addEventListener('DOMContentLoaded', () => {    

     // Налаштування пагінації
    const ITEMS_PER_PAGE = 12; // 4 колонки * 3 рядки
    let currentPage = 1;

    // Елементи DOM
    const priceElement = document.getElementById('price');
    const sizeOptionsContainer = document.getElementById('size-options');
    const slabPreview = document.getElementById('slab-preview');
    const nameInput = document.getElementById('full-name');
    const datesInput = document.getElementById('dates');
    const previewName = document.getElementById('preview-name');
    const previewDates = document.getElementById('preview-dates');
    const photoUploadInput = document.getElementById('photo-upload');
    const previewImage = document.getElementById('preview-image');
    const carvingsGallery = document.getElementById('carvings-gallery');
    const prevButton = document.getElementById('prev-gallery');
    const nextButton = document.getElementById('next-gallery');
    
    // Налаштування та стан
    const MAX_WIDTH_CM = 120;
    let currentActiveSize = document.querySelector('.size-options li.active');
    let currentActiveCarving = null;
    const totalPages = Math.ceil(carvingImages.length / ITEMS_PER_PAGE);

    // === ФУНКЦІЇ РЕНДЕРИНГУ ===
    function renderCarvingsPage() {
        if (!carvingsGallery) return;
        
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageItems = carvingImages.slice(startIndex, endIndex);
        
        const galleryMarkup = pageItems.map((image, index) => `
            <div class="gallery-item" data-carving-id="${startIndex + index + 1}">
                <img src="${image.preview}" alt="${image.description}">
            </div>
        `).join('');
        
        carvingsGallery.innerHTML = galleryMarkup;
        updatePaginationButtons();
    }
    
    function updatePaginationButtons() {
        if (!prevButton || !nextButton) return;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages <= 1;
    }

    function updateSlabLook(element) {
        if (!element) return;
        const price = element.dataset.price;
        if (price) priceElement.textContent = parseFloat(price).toFixed(2);
        
        const sizeString = element.dataset.size;
        if (sizeString && slabPreview) {
            const [widthCm, heightCm] = sizeString.split('x').map(Number);
            if (widthCm && heightCm) {
                slabPreview.style.aspectRatio = widthCm / heightCm;
                slabPreview.style.width = `${(widthCm / MAX_WIDTH_CM) * 100}%`;
            }
        }
    }

    // === ОБРОБНИКИ ПОДІЙ ===
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCarvingsPage();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCarvingsPage();
            }
        });
    }
    
    if (sizeOptionsContainer) {
        sizeOptionsContainer.addEventListener('click', (event) => {
            const target = event.target.closest('.size-options li');
            if (!target || target === currentActiveSize) return;
            if (currentActiveSize) currentActiveSize.classList.remove('active');
            target.classList.add('active');
            currentActiveSize = target;
            updateSlabLook(target);
        });
    }
    
    if (nameInput) nameInput.addEventListener('input', (e) => { previewName.textContent = e.target.value; });
    if (datesInput) datesInput.addEventListener('input', (e) => { previewDates.textContent = e.target.value; });
    
    if (photoUploadInput) {
        photoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                previewImage.src = URL.createObjectURL(file);
                previewImage.style.display = 'block';
            }
        });
    }

    if (carvingsGallery) {
    carvingsGallery.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.gallery-item');
        if (!clickedItem) return;
        if (currentActiveCarving) currentActiveCarving.classList.remove('active');
        clickedItem.classList.add('active');
        currentActiveCarving = clickedItem;
        const carvingImageSrc = clickedItem.querySelector('img').src;
        
        // === ОСЬ КЛЮЧОВЕ ВИПРАВЛЕННЯ ===
        // Встановлюємо фон, який займає 100% ширини і центрується
        slabPreview.style.background = `url(${carvingImageSrc}) center / 100% auto no-repeat, #808080`;
    });
    }
    
    const orderBtn = document.getElementById('order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            const orderData = {
                size: currentActiveSize ? currentActiveSize.textContent : 'Не вибрано',
                price: priceElement ? priceElement.textContent : 'N/A',
                name: nameInput ? nameInput.value : '',
                dates: datesInput ? datesInput.value : '',
                photoFile: photoUploadInput.files.length > 0 ? photoUploadInput.files[0] : null,
                carving: currentActiveCarving ? {
                    id: currentActiveCarving.dataset.carvingId,
                    description: currentActiveCarving.querySelector('img').alt
                } : 'Не вибрано'
            };
            console.log('Дані замовлення:', orderData);
            alert('Дякуємо за замовлення!');
        });
    }

    // === ІНІЦІАЛІЗАЦІЯ СТОРІНКИ ===
    renderCarvingsPage();
    if (currentActiveSize) {
        updateSlabLook(currentActiveSize);
    }
});