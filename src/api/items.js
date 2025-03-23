const apiUrl = 'http://localhost:3000/items';
let cache = null;
export function clearCache() {
  cache = null;
}

export async function getItems(forceRefresh = false) {
  if (cache && !forceRefresh) {
    return cache;
  }
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    cache = data;
    return data;
  } catch (err) {
    console.error('Failed to fetch items!', err.message);
    return cache || [];
  }
}

export async function addItem(item, forceRefresh = false) {
  if (cache && !forceRefresh) {
    return cache;
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.strighify(item),
    });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    if (forceRefresh) {
      cache = await getItems(true);
    }
  } catch (err) {
    console.log('Failed to POST!');
  }
}

export async function updateItem(id, updatedItem, forceRefresh = false) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    if (forceRefresh) {
      cache = await getItems(true);
    }
  } catch (err) {
    console.log(`Failed to update item!`, err.massage);
  }
}

export async function deleteItem(id, forceRefresh = false) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}: ${res.statusText}`);
    }
    if (forceRefresh) {
      cache = await getItems(true);
    }
    return true;
  } catch (err) {
    console.log('Error: Post not deleted!', err.message);
    return false;
  }
}
