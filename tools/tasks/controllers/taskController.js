const taskService = require('../services/taskService');

function handle(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof taskService.ForbiddenError) {
        return res.status(403).json({ error: err.message });
      }
      if (err instanceof taskService.NotFoundError) {
        return res.status(404).json({ error: err.message });
      }
      throw err;
    }
  };
}

const listBoards = handle(async (req, res) => {
  const boards = await taskService.listBoards(req.userId);
  res.json(boards);
});

const getBoard = handle(async (req, res) => {
  const board = await taskService.getBoard(req.userId, Number(req.params.id));
  res.json(board);
});

const createBoard = handle(async (req, res) => {
  const board = await taskService.createBoard(req.userId, req.body.title);
  res.status(201).json(board);
});

const updateBoard = handle(async (req, res) => {
  const board = await taskService.updateBoard(req.userId, Number(req.params.id), req.body.title);
  res.json(board);
});

const deleteBoard = handle(async (req, res) => {
  await taskService.deleteBoard(req.userId, Number(req.params.id));
  res.status(204).end();
});

const createList = handle(async (req, res) => {
  const list = await taskService.createList(
    req.userId,
    req.body.title,
    req.body.position,
    req.body.boardId,
  );
  res.status(201).json(list);
});

const updateList = handle(async (req, res) => {
  const list = await taskService.updateList(req.userId, Number(req.params.id), req.body);
  res.json(list);
});

const deleteList = handle(async (req, res) => {
  await taskService.deleteList(req.userId, Number(req.params.id));
  res.status(204).end();
});

const createCard = handle(async (req, res) => {
  const card = await taskService.createCard(
    req.userId,
    req.body.title,
    req.body.description,
    req.body.position,
    req.body.listId,
  );
  res.status(201).json(card);
});

const updateCard = handle(async (req, res) => {
  const card = await taskService.updateCard(req.userId, Number(req.params.id), req.body);
  res.json(card);
});

const deleteCard = handle(async (req, res) => {
  await taskService.deleteCard(req.userId, Number(req.params.id));
  res.status(204).end();
});

module.exports = {
  listBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  createList,
  updateList,
  deleteList,
  createCard,
  updateCard,
  deleteCard,
};
