const apiUrl = 'http://localhost:3000/items';

export async function getItems() {
  const res = await fetch('http://localhost:3000/items');
  const data = await res.json();
  return res.json();
}

export async function addItem(item) {
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.strighify(item),
  });
}

export async function updateItem(id, updatedItem) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });
}

export async function deleteItem(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
}
