const contentService = require('../services/contentService');

function handle(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof contentService.ForbiddenError) {
        return res.status(403).json({ error: err.message });
      }
      if (err instanceof contentService.NotFoundError) {
        return res.status(404).json({ error: err.message });
      }
      throw err;
    }
  };
}

const listItems = handle(async (req, res) => {
  const items = await contentService.listItems(req.userId);
  res.json(items);
});

const createItem = handle(async (req, res) => {
  const item = await contentService.createItem(req.userId, req.body);
  res.status(201).json(item);
});

const updateItem = handle(async (req, res) => {
  const item = await contentService.updateItem(req.userId, Number(req.params.id), req.body);
  res.json(item);
});

const deleteItem = handle(async (req, res) => {
  await contentService.deleteItem(req.userId, Number(req.params.id));
  res.status(204).end();
});

module.exports = { listItems, createItem, updateItem, deleteItem };
