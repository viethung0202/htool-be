const taskService = require('../services/taskService');

async function listBoards(req, res) {
  const boards = await taskService.listBoards(req.userId);
  res.json(boards);
}

async function createBoard(req, res) {
  const board = await taskService.createBoard(req.userId, req.body.title);
  res.status(201).json(board);
}

async function createList(req, res) {
  try {
    const list = await taskService.createList(
      req.userId,
      req.body.title,
      req.body.position,
      req.body.boardId,
    );
    res.status(201).json(list);
  } catch (err) {
    if (err instanceof taskService.ForbiddenError) {
      return res.status(403).json({ error: err.message });
    }
    throw err;
  }
}

async function createCard(req, res) {
  try {
    const card = await taskService.createCard(
      req.userId,
      req.body.title,
      req.body.description,
      req.body.position,
      req.body.listId,
    );
    res.status(201).json(card);
  } catch (err) {
    if (err instanceof taskService.ForbiddenError) {
      return res.status(403).json({ error: err.message });
    }
    throw err;
  }
}

module.exports = { listBoards, createBoard, createList, createCard };
