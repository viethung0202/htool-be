const db = require('../db');

class ForbiddenError extends Error {}
class NotFoundError extends Error {}

async function assertOwner(userId, id) {
  const item = await db.contentItem.findUnique({ where: { id } });
  if (!item) throw new NotFoundError('Không tìm thấy content');
  if (item.userId !== userId) throw new ForbiddenError('Không có quyền truy cập content này');
  return item;
}

function listItems(userId) {
  return db.contentItem.findMany({
    where: { userId },
    orderBy: [{ plannedDate: 'asc' }, { createdAt: 'desc' }],
  });
}

function createItem(userId, data) {
  return db.contentItem.create({
    data: {
      title: data.title,
      script: data.script,
      status: data.status,
      plannedDate: data.plannedDate ? new Date(data.plannedDate) : null,
      userId,
    },
  });
}

async function updateItem(userId, id, data) {
  await assertOwner(userId, id);
  const { title, script, status, plannedDate, views, likes } = data;
  return db.contentItem.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(script !== undefined && { script }),
      ...(status !== undefined && { status }),
      ...(plannedDate !== undefined && { plannedDate: plannedDate ? new Date(plannedDate) : null }),
      ...(views !== undefined && { views }),
      ...(likes !== undefined && { likes }),
    },
  });
}

async function deleteItem(userId, id) {
  await assertOwner(userId, id);
  await db.contentItem.delete({ where: { id } });
}

module.exports = { ForbiddenError, NotFoundError, listItems, createItem, updateItem, deleteItem };
