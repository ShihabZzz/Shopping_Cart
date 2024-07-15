import '../styles.css'
import { cartCountRender } from '../utils';

cartCountRender();

const tbody = document.querySelector('tbody');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

let totalAmount = 0;
let totalDiscount = 0;

for (let i = 0; i < cart.length; i++) {
    // Create table row
    const tr = document.createElement('tr');

    // Create first table data cell
    const td1 = document.createElement('td');
    const div1 = document.createElement('div');
    div1.classList.add('flex', 'items-center', 'gap-3');
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    const maskDiv = document.createElement('div');
    maskDiv.classList.add('mask', 'mask-squircle', 'w-12', 'h-12');
    const img = document.createElement('img');
    img.src = cart[i].thumbnail;
    img.alt = cart[i].title;
    maskDiv.appendChild(img);
    avatarDiv.appendChild(maskDiv);
    const fontBoldDiv = document.createElement('div');
    const fontBoldText = document.createElement('div');
    fontBoldText.classList.add('font-bold');
    fontBoldText.textContent = cart[i].title;
    fontBoldDiv.appendChild(fontBoldText);
    div1.appendChild(avatarDiv);
    div1.appendChild(fontBoldDiv);
    td1.appendChild(div1);

    // Create second table data cell
    const td2 = document.createElement('td');
    td2.textContent = cart[i].price;

    // Create third table data cell
    const td3 = document.createElement('td');
    const input = document.createElement('input');
    input.type = "number";
    input.placeholder = "Type here";
    input.value = cart[i].quantity;
    input.classList.add('input', 'input-bordered', 'input-md');
    td3.appendChild(input);

    // Create fourth table data cell
    const td4 = document.createElement('td');
    td4.textContent = cart[i].subTotal;

    // Append all td elements to tr
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // Append tr to table
    tbody.appendChild(tr);

    totalAmount += Number(cart[i].subTotal);
    totalDiscount += Number(cart[i].discountAmount);
}

let paidAmount = (61.99 + Number(totalAmount) - Number(totalDiscount));

const cartTotals = document.getElementById('cart-totals');
// Create the main div
const mainDiv = document.createElement('div');
mainDiv.classList.add('my-4', 'flex', 'flex-col', 'gap-4');

// Function to create rows
function createRow(label, value) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('flex', 'justify-between');
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('text-slate-500');
    labelSpan.textContent = label;
    const valueSpan = document.createElement('span');
    valueSpan.classList.add('font-medium');
    valueSpan.textContent = value;
    rowDiv.appendChild(labelSpan);
    rowDiv.appendChild(valueSpan);
    return rowDiv;
}

// Create and append rows to the main div
mainDiv.appendChild(createRow('Sub-total', `$${totalAmount}`));
mainDiv.appendChild(createRow('Shipping', 'Free'));
mainDiv.appendChild(createRow('Discount', `$${totalDiscount.toFixed(2)}`));
mainDiv.appendChild(createRow('Tax', '$61.99'));

// Append main div to container
cartTotals.appendChild(mainDiv);

// Create and append the horizontal rule
const hr = document.createElement('hr');
cartTotals.appendChild(hr);

// Create and append the total row
const totalDiv = document.createElement('div');
totalDiv.classList.add('my-4', 'flex', 'justify-between');
const totalLabel = document.createElement('span');
totalLabel.textContent = 'Total';
const totalValue = document.createElement('span');
totalValue.classList.add('font-medium');
totalValue.textContent = `$${paidAmount.toFixed(2)}`;
totalDiv.appendChild(totalLabel);
totalDiv.appendChild(totalValue);
cartTotals.appendChild(totalDiv);

// Create and append the button
const button = document.createElement('button');
button.classList.add('btn', 'btn-success', 'font-bold', 'text-white');
button.textContent = 'Proceed to Checkout';
cartTotals.appendChild(button);

