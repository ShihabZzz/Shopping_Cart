import './styles.css'
import { cartCountRender, cart } from './utils';
import { downArrow } from './svgUtils';

let defaultCategory = '';
const limit = 5;
let skip = 0;
let total = 0;
const listContainer = document.querySelector('section[data-name="listContainer"]');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let products = async (categoryName, skip) => {
    let url = `https://dummyjson.com/products/category/${categoryName}?limit=${limit}`;
    if (skip)
        url += `&skip=${skip}`;
    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Erorr:')
            error.status = ep.status;
            throw error;
        }
        const result = await ep.json();
        total = result.total;

        const productsContainer = document.getElementById('products');
        productsContainer.innerText = '';
        for (let i = 0; i < result.products.length; i++) {
            const content = document.createElement('div');
            content.classList.add('w-60', 'h-80', 'card', 'card-compact', 'bg-base-100', 'shadow-xl', 'relative');

            // thumbnail
            const contentFigure = document.createElement('figure');
            const figureImg = document.createElement('img');
            figureImg.src = `${result.products[i].thumbnail}`;
            figureImg.alt = `${result.products[i].title}`;
            contentFigure.appendChild(figureImg);

            // discount
            const contentDiscount = document.createElement('div');
            contentDiscount.classList.add('absolute', 'flex', 'items-center', 'w-14', 'h-14', 'top-0',
                'right-0', 'rounded-tr-2xl', 'rounded-bl-2xl', 'font-semibold', 'text-center',
                'text-white', 'bg-primary');
            contentDiscount.textContent = `${result.products[i].discountPercentage}% OFF`;

            const contentBody = document.createElement('div');
            contentBody.classList.add('card-body');
            // title
            const contentBodyTitle = document.createElement('h2');
            contentBodyTitle.classList.add('card-title');
            contentBodyTitle.textContent = `${result.products[i].title}`;
            contentBody.appendChild(contentBodyTitle);
            // description
            const contentBodyDescription = document.createElement('p');
            contentBodyDescription.textContent = `${result.products[i].description}`;
            contentBody.appendChild(contentBodyDescription);
            // price
            const contentBodyPrice = document.createElement('p');
            contentBodyPrice.textContent = `$${result.products[i].price}`;
            contentBody.appendChild(contentBodyPrice);
            // Add to cart
            const contentBodyCart = document.createElement('div');
            contentBodyCart.classList.add('card-actions', 'justify-end');
            const contentBodyCartButton = document.createElement('button');
            contentBodyCartButton.classList.add('btn', 'btn-sm', 'btn-primary');
            contentBodyCartButton.textContent = 'Add to Cart';
            contentBodyCartButton.id = result.products[i].id;

            contentBodyCart.appendChild(contentBodyCartButton);
            contentBody.appendChild(contentBodyCart);

            content.appendChild(contentFigure);
            content.appendChild(contentDiscount);
            content.appendChild(contentBody);
            productsContainer.appendChild(content);
        }
        productsContainer.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            if (event.target.tagName === 'BUTTON') {
                cart(event.target.id);
            }
        });
    } catch (error) {
        console.error(error.message, error.status);
    }
}

let list = async () => {
    const url = `https://dummyjson.com/products/category-list`
    const reqOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const ep = await fetch(url, reqOptions);
        if (!ep.ok) {
            const error = new Error('Unexpected Erorr:')
            error.status = ep.status;
            throw error;
        }
        const result = await ep.json();
        defaultCategory = result[0];
        products(defaultCategory);

        let dropdown, summary, ul;
        if (result.length > 8) {
            dropdown = document.createElement('details');
            dropdown.classList.add('dropdown', 'dropdown-bottom', 'dropdown-end');

            summary = document.createElement('summary');
            summary.classList.add('btn', 'btn-xs', 'lg:btn-sm', 'rounded-full', 'm-1');
            summary.textContent = 'More';

            const downArrowSvg = downArrow();
            summary.appendChild(downArrowSvg);

            ul = document.createElement('ul');
            ul.classList.add('menu', 'dropdown-content', 'bg-base-100',
                'rounded-box', 'z-[1]', 'w-max', 'max-h-[40vh]', 'overflow-auto', 'p-2', 'shadow');
        }

        result.forEach((element, index) => {
            if (index < 7) {
                const btTag = document.createElement('button');
                btTag.classList.add('btn', 'btn-xs', 'lg:btn-sm', 'rounded-full', 'm-1');
                btTag.innerText = element;
                listContainer.appendChild(btTag);
            }
            if (result.length > 8) {
                const li = document.createElement('li');
                li.classList.add('font-medium', 'text-sm');
                const a = document.createElement('a');
                a.textContent = `${element}`;
                li.appendChild(a);

                ul.appendChild(li);
            }
        });
        if (result.length > 8) {
            dropdown.appendChild(summary);
            dropdown.appendChild(ul);
            listContainer.appendChild(dropdown);
        }

        listContainer.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
                defaultCategory = event.target.textContent;
                products(event.target.textContent);
            }
        });

    } catch (error) {
        console.error(error.message, error.status);
    }
}

prev.addEventListener('click', () => {
    if (skip - 5 < 0) {
        return;
    }
    skip -= limit;
    products(defaultCategory, skip);
});

next.addEventListener('click', () => {
    if (skip + 5 >= total) {
        return;
    }
    skip += limit
    products(defaultCategory, skip);
});


list();
cartCountRender();