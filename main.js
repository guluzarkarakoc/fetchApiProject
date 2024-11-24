const apiUrl = 'http://localhost:3000/products';
const modal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const cardsContainer = document.getElementById('cards-container');
const productTitle = document.getElementById('product-title');
const productImage = document.getElementById('modal-image');
const productDescription = document.getElementById('product-description');

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${product.productImage}" alt="${product.productName}">
                <h3>${product.productName}</h3>
                <p class="rating">${'⭐'.repeat(Math.round(product.rating))}</p>
                <p>${product.price}</p>
               <button class="cart-btn">Sepete Ekle</button>
            `;
            card.addEventListener('click', () => openModal(product));

            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Veri çekme hatası:', error);
    }
}
function openModal(product) {
    console.log('Modal açılacak:', product);
    productTitle.textContent = product.productName;
    productImage.src = product.productImage;
    productDescription.textContent = product.description;

    modal.style.display = 'block';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.onload = fetchProducts;
