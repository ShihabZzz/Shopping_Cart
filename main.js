import './styles.css'
import { cartCountRender, cart } from './utils';

const limit = 5;

let products = async () => {
    const ep = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    if (!ep.ok)
        throw new Error(`Error Fetching Products: ${ep.statusText}`);
    const res = await ep.json();
    const productsContainer = document.getElementById('products');

    for (let i = 0; i < res.products.length; i++) {
        const content = document.createElement('div');
        content.classList.add('w-60', 'h-80', 'card', 'card-compact', 'bg-base-100', 'shadow-xl', 'relative');

        // thumbnail
        const contentFigure = document.createElement('figure');
        const figureImg = document.createElement('img');
        figureImg.src = `${res.products[i].thumbnail}`;
        figureImg.alt = `${res.products[i].title}`;
        contentFigure.appendChild(figureImg);

        // discount
        const contentDiscount = document.createElement('div');
        contentDiscount.classList.add('absolute', 'flex', 'items-center', 'w-14', 'h-14', 'top-0',
            'right-0', 'rounded-tr-2xl', 'rounded-bl-2xl', 'font-semibold', 'text-center',
            'text-white', 'bg-primary');
        contentDiscount.textContent = `${res.products[i].discountPercentage}% OFF`;

        const contentBody = document.createElement('div');
        contentBody.classList.add('card-body');
        // title
        const contentBodyTitle = document.createElement('h2');
        contentBodyTitle.classList.add('card-title');
        contentBodyTitle.textContent = `${res.products[i].title}`;
        contentBody.appendChild(contentBodyTitle);
        // description
        const contentBodyDescription = document.createElement('p');
        contentBodyDescription.textContent = `${res.products[i].description}`;
        contentBody.appendChild(contentBodyDescription);
        // price
        const contentBodyPrice = document.createElement('p');
        contentBodyPrice.textContent = `$${res.products[i].price}`;
        contentBody.appendChild(contentBodyPrice);
        // Add to cart
        const contentBodyCart = document.createElement('div');
        contentBodyCart.classList.add('card-actions', 'justify-end');
        const contentBodyCartButton = document.createElement('button');
        contentBodyCartButton.classList.add('btn', 'btn-sm', 'btn-primary');
        contentBodyCartButton.textContent = 'Add to Cart';
        contentBodyCartButton.id = res.products[i].id;

        contentBodyCart.appendChild(contentBodyCartButton);
        contentBody.appendChild(contentBodyCart);

        content.appendChild(contentFigure);
        content.appendChild(contentDiscount);
        content.appendChild(contentBody);
        productsContainer.appendChild(content);
    }
    productsContainer.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        if (e.target.tagName === 'BUTTON') {
            cart(e.target.id);
        }
    });
}

cartCountRender();
products();