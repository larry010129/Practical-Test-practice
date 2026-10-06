const wrapper = document.getElementById('wrapper');

let editing = [];

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

    if (editing.indexOf(prd) !== -1) {
        ele.innerHTML = prd.emoji + " " + prd.name + " Price: ";

        const price = document.createElement("input");
        price.type = "number";
        price.step = "0.01";
        price.value = prd.price;
        ele.appendChild(price);
    } else {
        ele.innerHTML = prd.emoji + " " + prd.name + " Price: " + prd.price;
    }

    const edit = document.createElement("button");

    if (editing.indexOf(prd) !== -1) {
        edit.innerHTML = "Submit";
        edit.addEventListener("click", function () {
            prd.price = Number(ele.querySelector("input").value);
            editing.splice(editing.indexOf(prd), 1);
            savePrices();
            renderProducts(products);
        });
    } else {
        edit.innerHTML = "Edit";
        edit.addEventListener("click", function () {
            savePrices();
            editing.push(prd);
            renderProducts(products);
        });
    }

    const remove = document.createElement("button");
    remove.innerHTML = "Delete";
    remove.addEventListener("click", function () {
        products.splice(products.indexOf(prd), 1);
        if (editing.indexOf(prd) !== -1) {
            editing.splice(editing.indexOf(prd), 1);
        }
        renderProducts(products);
    });

    ele.appendChild(edit);
    ele.appendChild(remove);
    return ele;
}

function savePrices() {
    const prices = wrapper.querySelectorAll("input");
    let inputIndex = 0;

    products.forEach(function (prd) {
        if (editing.indexOf(prd) !== -1) {
            prd.price = Number(prices[inputIndex].value);
            inputIndex = inputIndex + 1;
        }
    });
}

renderProducts(products);
