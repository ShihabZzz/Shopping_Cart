let cartTotal = Number(localStorage.getItem('cartTotal')) || Number(0);

export function cartCountRender() {
    const cartCountView = document.getElementById('cart-count');
    cartCountView.textContent = cartTotal;
}

export async function cart(id) {
    const loads = JSON.parse(localStorage.getItem('cart')) || [];
    const ep = await fetch(`https://dummyjson.com/products/${id}`);
    if (!ep.ok)
        throw new Error(`Error Fetching Products: ${ep.statusText}`);

    const res = await ep.json();

    let productInCart = loads.find((product) => product.id === res.id);
    if (productInCart) {
        productInCart.quantity += 1;
        productInCart.subTotal = productInCart.price * productInCart.quantity;
        productInCart.discountAmount = parseFloat((productInCart.subTotal * (res.discountPercentage / 100))).toFixed(2);
    } else {
        const subTotal = res.price;
        const discountAmount = parseFloat((subTotal * (res.discountPercentage / 100))).toFixed(2);
        loads.push({
            id: res.id,
            title: res.title,
            price: res.price,
            quantity: 1,
            subTotal: subTotal,
            discountAmount: discountAmount,
            thumbnail: res.thumbnail,
        });
    }
    localStorage.setItem('cart', JSON.stringify(loads));

    cartTotal += 1;
    localStorage.setItem('cartTotal', cartTotal);
    cartCountRender();
}