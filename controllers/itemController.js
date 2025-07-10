import Item from '../models/items.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Errror fetching items!' });
  }
};

export const createItem = async (req, res) => {
  try {
    console.log('REQ.BODY:', req.body);
    const newItem = new Item(req.body);
    console.log('Creating item:', req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    console.log('CREATE ITEM ERROR:', err.message, err.stack); //log actual error.
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(400).json({ error: 'Item not found!' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Item not found!' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ id: req.params.id });
    if (!deleteItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting Item!' });
  }
};
