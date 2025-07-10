export default function validateItem(req, res, next) {
  const { docketNumber, paperName, type, caliper, size, count, savedAt } =
    req.body;

  const errors = [];

  if (!docketNumber || typeof docketNumber !== 'number') {
    errors.push('docketNumber must be a number');
  }

  if (!paperName || typeof paperName !== 'string') {
    errors.push('paperName must be a string');
  }

  if (!type || typeof type !== 'string') {
    errors.push('type must be a string');
  }

  if (typeof caliper !== 'string') {
    errors.push('caliper must be a string');
  }

  if (typeof size !== 'string') {
    errors.push('size must be a number');
  }

  if (count !== undefined && typeof count !== 'number') {
    errors.push('count must be a number');
  }

  if (!savedAt || typeof savedAt !== 'string') {
    errors.push('savedAt must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}
