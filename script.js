const wrapper = document.getElementById('wrapper');

const products = [
    { name: "Apple", category: "fruit", price: 1.5, emoji: "🍎" },
    { name: "Banana", category: "fruit", price: 0.75, emoji: "🍌" },
    { name: "Mango", category: "fruit", price: 2.25, emoji: "🥭" },
    { name: "Strawberry", category: "fruit", price: 3.0, emoji: "🍓" }
];

function renderProducts(list){
    wrapper.innerHTML = '';

    const mapped = list.map((item)=>{
        return renderProduct(item);
    })
    mapped.forEach((item)=>{
        wrapper.appendChild(item);
    })
}

function renderProduct(prd){
    const ele = document.createElement("div");
    ele.innerHTML = prd.emoji + " " + prd.name + " Price: ";

    const price = document.createElement("input");
    price.type = "number";
    price.step = "0.01";
    price.value = prd.price;
    price.addEventListener("input", function () {
        prd.price = Number(price.value);
    });

    const remove = document.createElement("button");
    remove.innerHTML = "Delete";
    remove.addEventListener("click", function () {
        products.splice(products.indexOf(prd), 1);
        renderProducts(products);
    });

    ele.appendChild(price);
    ele.appendChild(remove);
    return ele;
}

renderProducts(products);
