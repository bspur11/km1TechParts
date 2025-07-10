import inkItem from '../models/inkItem.js';

export const getAllInks = async (req, res) => {
  try {
    const inks = await inkItem.find();
    res.json(inks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};

export const createInk = async (req, res) => {
  try {
    const newInk = new InkIteminkItem(req.body);
    const savedInk = await newInk.save();
    res.json(savedInk);
  } catch (err) {
    res.status(400).json({ error: 'Error adding item' });
  }
};

export const updateInk = async (req, res) => {
  try {
    const updatedInk = await Ink.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedInk) {
      return res.status(404).json({ error: 'Item not found!' });
    }
    res.json(updatedInk);
  } catch (err) {
    res.status(400).json({ error: 'Error updating item!' });
  }
};

export const deleteInk = async (req, res) => {
  try {
    const deletedInk = await Ink.findOneAndDelete({ id: req.params.id });
    if (!deletedInk) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting Item!' });
  }
};
