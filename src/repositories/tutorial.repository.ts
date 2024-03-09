import Tutorial from "../models/tutorial.model";
import pool from "../db/index";
import { ResultSetHeader } from "mysql2";

class TutorialRepository {
  async create(tutorial: Tutorial) {
    const sql =
      "INSERT INTO Tutorial (id, title, description, published) VALUES(?,?,?,?)";

    let conn = null;
    try {
      conn = await pool.getConnection();
      console.log("get connection completed.");
      const result = await conn.query(sql, [
        tutorial.id,
        tutorial.title,
        tutorial.description,
        tutorial.published ? tutorial.published : false,
      ]);

      return result;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }

  async findOne(tutorialId: number): Promise<Tutorial[]> {
    const sql = "SELECT * FROM Tutorial WHERE id = ? ";
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [result] = await conn.query<Tutorial[]>(sql, [tutorialId]);

      return result;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }

  async findAll(published?: boolean): Promise<Tutorial[]> {
    let conn = null;
    let sql = "SELECT * FROM Tutorial";
    const condition = "";

    if (published !== undefined) {
      sql += ` WHERE published = ${published}`;
    }
    try {
      conn = await pool.getConnection();
      const [result] = await conn.query<Tutorial[]>(sql);
      return result;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }

  async update(tutorial: Tutorial): Promise<number> {
    let conn = null;
    try {
      let sql =
        "UPDATE Tutorial SET title = ?, description = ?, published = ? WHERE id = ? ";
      conn = await pool.getConnection();

      const [result] = await conn.query<ResultSetHeader>(sql, [
        tutorial.title,
        tutorial.description,
        tutorial.published,
        tutorial.id,
      ]);

      return result.affectedRows;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }

  async delete(tutorialId: number): Promise<number> {
    let conn = null;
    try {
      let sql = "DELETE FROM Tutorial WHERE id = ? ";
      conn = await pool.getConnection();

      const [result] = await conn.query<ResultSetHeader>(sql, [tutorialId]);

      return result.affectedRows;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }

  async deleteAll(): Promise<number> {
    let conn = null;
    try {
      let sql = "DELETE FROM Tutorial  ";
      conn = await pool.getConnection();
      const [result] = await conn.query<ResultSetHeader>(sql);
      return result.affectedRows;
    } catch (error) {
      throw error;
    } finally {
      await conn?.release();
    }
  }
}

export const tutorialRepository = new TutorialRepository();
