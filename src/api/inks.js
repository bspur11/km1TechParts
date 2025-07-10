const apiUrl = 'http://localhost:3000/api/inks';
let cache = null;
export function clearCache() {
  cache = null;
}

export async function getInks(forceRefresh = false) {
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
    console.error('Failed to fetch inks!', err.message);
    return cache || [];
  }
}

export async function addInk(ink, forceRefresh = false) {
  if (cache && !forceRefresh) {
    return cache;
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.strigify(ink),
    });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    if (forceRefresh) {
      cache = await getInks(true);
    }
  } catch (err) {
    console.log('Failed to POST!');
  }
}

export async function updateInk(id, updatedItem, forceRefresh = false) {
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
      cache = await getInks(true);
    }
  } catch (err) {
    console.log(`Failed to update item!`, err.message);
  }
}

export async function deleteInk(id, forceRefresh = false) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}: ${res.statusText}`);
    }
    if (forceRefresh) {
      cache = await getInks(true);
    }
    return true;
  } catch (err) {
    console.log('Error: Failed to delete Ink!', err.message);
    return false;
  }
}
