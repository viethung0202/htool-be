const prisma = require('../db');

class ForbiddenError extends Error {}

async function assertBoardOwner(boardId, userId) {
  const board = await prisma.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== userId) throw new ForbiddenError('Not your board');
}

async function assertListOwner(listId, userId) {
  const list = await prisma.list.findUnique({ where: { id: listId }, include: { board: true } });
  if (!list || list.board.userId !== userId) throw new ForbiddenError('Not your list');
}

async function listBoards(userId) {
  return prisma.board.findMany({
    where: { userId },
    include: { lists: { include: { cards: true }, orderBy: { position: 'asc' } } },
  });
}

async function createBoard(userId, title) {
  return prisma.board.create({ data: { title, userId } });
}

async function createList(userId, title, position, boardId) {
  await assertBoardOwner(boardId, userId);
  return prisma.list.create({ data: { title, position, boardId } });
}

async function createCard(userId, title, description, position, listId) {
  await assertListOwner(listId, userId);
  return prisma.card.create({ data: { title, description, position, listId } });
}

module.exports = { ForbiddenError, listBoards, createBoard, createList, createCard };
