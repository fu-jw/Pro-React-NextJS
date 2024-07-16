import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "./db";
import {
  InsertUser,
  SelectUser,
  SelectPost,
  postsTable,
  usersTable,
} from "./schema";

// 添加数据
export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

// 查询数据
export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}
export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(
      between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`)
    )
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

// 更新数据
export async function updatePost(
  id: SelectPost["id"],
  data: Partial<Omit<SelectPost, "id">>
) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}

// 删除数据
export async function deleteUser(id: SelectUser["id"]) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
