const prisma = require('../db');

class ForbiddenError extends Error {}
class NotFoundError extends Error {}

async function assertBoardOwner(boardId, userId) {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board) throw new NotFoundError('Board not found');
  if (board.userId !== userId) throw new ForbiddenError('Not your board');
  return board;
}

async function assertListOwner(listId, userId) {
  const list = await prisma.list.findUnique({ where: { id: listId }, include: { board: true } });
  if (!list) throw new NotFoundError('List not found');
  if (list.board.userId !== userId) throw new ForbiddenError('Not your list');
  return list;
}

async function assertCardOwner(cardId, userId) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: { list: { include: { board: true } } },
  });
  if (!card) throw new NotFoundError('Card not found');
  if (card.list.board.userId !== userId) throw new ForbiddenError('Not your card');
  return card;
}

async function listBoards(userId) {
  return prisma.board.findMany({
    where: { userId },
    include: { lists: { include: { cards: true }, orderBy: { position: 'asc' } } },
  });
}

async function getBoard(userId, boardId) {
  await assertBoardOwner(boardId, userId);
  return prisma.board.findUnique({
    where: { id: boardId },
    include: { lists: { include: { cards: true }, orderBy: { position: 'asc' } } },
  });
}

async function createBoard(userId, title) {
  return prisma.board.create({ data: { title, userId } });
}

async function updateBoard(userId, boardId, title) {
  await assertBoardOwner(boardId, userId);
  return prisma.board.update({ where: { id: boardId }, data: { title } });
}

async function deleteBoard(userId, boardId) {
  await assertBoardOwner(boardId, userId);
  return prisma.board.delete({ where: { id: boardId } });
}

async function createList(userId, title, position, boardId) {
  await assertBoardOwner(boardId, userId);
  return prisma.list.create({ data: { title, position, boardId } });
}

async function updateList(userId, listId, { title, position }) {
  await assertListOwner(listId, userId);
  return prisma.list.update({ where: { id: listId }, data: { title, position } });
}

async function deleteList(userId, listId) {
  await assertListOwner(listId, userId);
  return prisma.list.delete({ where: { id: listId } });
}

async function createCard(userId, title, description, position, listId) {
  await assertListOwner(listId, userId);
  return prisma.card.create({ data: { title, description, position, listId } });
}

async function updateCard(userId, cardId, { title, description, position, listId }) {
  await assertCardOwner(cardId, userId);
  if (listId !== undefined) await assertListOwner(listId, userId);
  return prisma.card.update({
    where: { id: cardId },
    data: { title, description, position, listId },
  });
}

async function deleteCard(userId, cardId) {
  await assertCardOwner(cardId, userId);
  return prisma.card.delete({ where: { id: cardId } });
}

module.exports = {
  ForbiddenError,
  NotFoundError,
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
