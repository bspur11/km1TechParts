const apiUrl = 'http://localhost:3000/items';

// **GET all items from MongoDB**
async function getItems() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    
    document.getElementById('itemsList').innerHTML = data.map(item => 
        `<li>
            <strong>ID:</strong> ${item.id} | 
            <strong>Name:</strong> ${item.name} | 
            <strong>Description:</strong> ${item.description} | 
            <strong>Date Received:</strong> ${item.dateRecieved} | 
            <strong>Stock Quantity:</strong> ${item.stockQuantity}
        </li>`
    ).join('');
}

// **POST a new item**
document.getElementById('addItemForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const newItem = {
        id: document.getElementById('itemId').value,
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        dateRecieved: document.getElementById('itemDateReceived').value,
        stockQuantity: document.getElementById('itemStockQuantity').value
    };

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    });

    const data = await res.json();
    console.log('Added:', data);
    getItems(); // Refresh list
});

// **PUT (Update an item)**
document.getElementById('updateItemForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const itemId = document.getElementById('updateItemId').value;

    const updatedItem = {
        name: document.getElementById('updateItemName').value,
        description: document.getElementById('updateItemDescription').value,
        dateRecieved: document.getElementById('updateItemDateReceived').value,
        stockQuantity: document.getElementById('updateItemStockQuantity').value
    };

    const res = await fetch(`${apiUrl}/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    });

    const data = await res.json();
    console.log('Updated:', data);
    getItems(); // Refresh list
});

// **DELETE an item**
async function deleteItem() {
    const itemId = document.getElementById('deleteItemId').value;

    const res = await fetch(`${apiUrl}/${itemId}`, {
        method: 'DELETE'
    });

    const data = await res.json();
    console.log(data.message);
    getItems(); // Refresh list
}

// Load items on page load
getItems();
