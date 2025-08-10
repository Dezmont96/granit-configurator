document.addEventListener('DOMContentLoaded', () => {
    const priceElement = document.getElementById('price');
    const sizeOptionsContainer = document.getElementById('size-options');
    let currentActiveSize = document.querySelector('.size-options li.active');

    // Обробник кліків на контейнері з розмірами
    sizeOptionsContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        // Переконуємось, що клікнули на елемент <li>
        if (target.tagName === 'LI') {
            // Знімаємо клас 'active' з попереднього елемента
            if (currentActiveSize) {
                currentActiveSize.classList.remove('active');
            }
            
            // Додаємо клас 'active' новому та зберігаємо його
            target.classList.add('active');
            currentActiveSize = target;

            // Отримуємо ціну з data-атрибуту та оновлюємо її
            const newPrice = target.dataset.price;
            if (newPrice) {
                priceElement.textContent = `${parseFloat(newPrice).toFixed(2)}`;
            }
        }
    });

    // TODO: Додати логіку для стрілок пагінації галереї та головного вигляду
    document.getElementById('prev-gallery').addEventListener('click', () => {
        console.log('Попередня сторінка галереї');
    });

    document.getElementById('next-gallery').addEventListener('click', () => {
        console.log('Наступна сторінка галереї');
    });
});