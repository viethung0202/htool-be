const prisma = require('../db');

async function listBoards(userId) {
  return prisma.board.findMany({
    where: { userId },
    include: { lists: { include: { cards: true }, orderBy: { position: 'asc' } } },
  });
}

async function createBoard(userId, title) {
  return prisma.board.create({ data: { title, userId } });
}

async function createList(title, position, boardId) {
  return prisma.list.create({ data: { title, position, boardId } });
}

async function createCard(title, description, position, listId) {
  return prisma.card.create({ data: { title, description, position, listId } });
}

module.exports = { listBoards, createBoard, createList, createCard };
