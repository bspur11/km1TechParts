// ✅ Place `DOMContentLoaded` at the top to register event listeners early
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('deleteItemBtn')
    .addEventListener(
      'click',
      () => deleteItem(document.getElementById('deleteItemId')).value
    );
  document.getElementById('addItemForm').addEventListener('submit', addItem);
  document
    .getElementById('updateItemForm')
    .addEventListener('submit', updateItem);

  getItems(); // Load items when page loads
});

// ✅ Functions can be placed anywhere (before or after `DOMContentLoaded`)
async function getItems() {
  const res = await fetch('http://localhost:3000/items');
  const data = await res.json();
  console.log('script21', data);

  const list = document.getElementById('itemsList');
  list.innerHTML = '';
  data.forEach((item) => {
    console.log('item from API', item);
    console.log('script27', item.dateReceived);
    console.log('script27', item.stockQuantity);
    console.log('script27', item.id);
    console.log('script27', item.name);
    console.log('script27', item.description);
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Description: ${item.description}, Received: ${item.dateReceived}, Quantity: ${item.stockQuantity},`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.dataset.id = item.id;

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  });

  if (data.length > 1) {
    console.log('this is data', data[0].name);
  }

  // ✅ Attach event listeners to delete buttons after they are added
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemId = event.target.dataset.id;
      console.log(`Deleting item with ID: ${itemId}`);
      deleteItem(itemId);
    });
  });
}

async function addItem(event) {
  event.preventDefault();

  console.log('ID:', document.getElementById('itemId')); // Debugging
  console.log('Name:', document.getElementById('itemName'));
  console.log('Description:', document.getElementById('itemDescription'));
  console.log('Date Received:', document.getElementById('itemDateReceived'));
  console.log('Stock Quantity:', document.getElementById('itemStockQuantity'));

  const newItem = {
    id: document.getElementById('itemId').value,
    name: document.getElementById('itemName').value,
    description: document.getElementById('itemDescription').value,
    dateReceived: document.getElementById('itemDateReceived').value,
    stockQuantity: document.getElementById('itemStockQuantity').value,
  };

  console.log('script.js 70', newItem);

  await fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  });

  getItems(); // Refresh list
}

async function updateItem(event) {
  event.preventDefault();
  const itemId = document.getElementById('updateItemId').value;
  const updatedName = document.getElementById('updateItemName').value;
  const updatedDescription = document.getElementById(
    'updateItemDescription'
  ).value;
  const updatedDateReceived = document.getElementById(
    'updateItemDateReceived'
  ).value;
  const updatedStockQuantity = document.getElementById(
    'updateItemStockQuantity'
  ).value;
  console.log(
    'script.js 92 stock',
    updatedStockQuantity,
    'date',
    updatedDateReceived
  );
  // ✅ Only include fields that have values
  const updatedItem = {};
  if (updatedName) updatedItem.name = updatedName;
  if (updatedDescription) updatedItem.description = updatedDescription;
  if (updatedDateReceived) updatedItem.dateReceived = updatedDateReceived;
  if (updatedStockQuantity) updatedItem.stockQuantity = updatedStockQuantity;

  console.log('Updating112 Item:', updatedItem); // ✅ Debugging before sending

  await fetch(`http://localhost:3000/items/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });

  getItems(); // Refresh list
}

async function deleteItem(itemId) {
  if (!itemId) {
    console.error('Item ID is required for deletion.');
    return;
  }
  await fetch(`http://localhost:3000/items/${itemId}`, { method: 'DELETE' });
  getItems(); // Refresh list
}
