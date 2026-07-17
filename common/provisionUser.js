const tasksDb = require('../tools/tasks/db');
const contentDb = require('../tools/content/db');

// Mỗi khi thêm tool mới cần bảng User rút gọn, thêm client của tool đó vào đây.
const TOOL_DBS = [tasksDb, contentDb];

async function provisionUser(userId) {
  await Promise.all(
    TOOL_DBS.map((db) =>
      db.user.upsert({ where: { id: userId }, update: {}, create: { id: userId } }),
    ),
  );
}

module.exports = { provisionUser };
