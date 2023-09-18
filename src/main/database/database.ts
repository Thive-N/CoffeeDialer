/* eslint-disable compat/compat */
import * as sqlite3 from 'sqlite3';
import { Beans, Brew, Rating } from './models';

const fs = require('fs');

export default class Database {
	private handle: sqlite3.Database;

	constructor(DBSOURCE: string = 'assets/db.sqlite') {
		if (fs.existsSync(DBSOURCE)) {
			this.handle = new sqlite3.Database(DBSOURCE);
		} else {
			this.handle = new sqlite3.Database(DBSOURCE);
			const data = fs.readFileSync('./src/main/database/initialisedb.sql').toString();
			this.handle.exec(data);
		}
	}

	public async teardown(): Promise<boolean> {
		return new Promise((resolve) => {
			this.handle.close(() => {
				resolve(true);
			});
		});
	}

	public async addBeans(beans: Beans): Promise<Error | boolean> {
		const sql = `INSERT INTO Beans (name, roast, company, roast_date) VALUES (?,?,?,?)`;
		const rd = beans.roast_date.toISOString();

		return new Promise((resolve, reject) => {
			this.handle.run(sql, [beans.name, beans.roast, beans.company, rd], (err: Error) => {
				if (err) {
					reject(err);
				}
				resolve(true);
			});
		});
	}

	public async addBrew(brew: Brew): Promise<Error | boolean> {
		const sql = `INSERT INTO Brew (beans_id, brew_date, brew_time, grind_in, coffee_out, grind_size) VALUES (?,?,?,?,?,?)`;
		const bd = brew.brew_date.toISOString();

		return new Promise((resolve, reject) => {
			this.handle.run(
				sql,
				[brew.beans_id, bd, brew.brew_time, brew.grind_in, brew.coffee_out, brew.grind_size],
				(err: Error) => {
					if (err) {
						reject(err);
					}
					resolve(true);
				},
			);
		});
	}

	public async addRating(rating: Rating): Promise<Error | boolean> {
		const sql = `INSERT INTO Rating (brew_id, rating, notes, bitterness, acidity) VALUES (?,?,?,?,?)`;

		return new Promise((resolve, reject) => {
			this.handle.run(
				sql,
				[rating.brew_id, rating.rating, rating.notes, rating.bitterness, rating.acidity],
				(err: Error) => {
					if (err) {
						reject(err);
					}
					resolve(true);
				},
			);
		});
	}

	public async getBeans(): Promise<Error | Beans[]> {
		const sql = `SELECT * FROM Beans`;

		return new Promise((resolve, reject) => {
			this.handle.all(sql, (err: Error, rows: any[]) => {
				if (err) {
					reject(err);
				}
				resolve(
					rows.map((row: any): Beans => {
						return {
							beans_id: row.beans_id,
							name: row.name,
							roast: row.roast,
							company: row.company,
							roast_date: new Date(row.roast_date),
						};
					}),
				);
			});
		});
	}

	public async getBrews(): Promise<Error | Brew[]> {
		const sql = `SELECT * FROM Brew`;

		return new Promise((resolve, reject) => {
			this.handle.all(sql, (err: Error, rows: any[]) => {
				if (err) {
					reject(err);
				}
				resolve(
					rows.map((row: any) => {
						return {
							brew_id: row.Brew_id,
							beans_id: row.beans_id,
							brew_date: new Date(row.brew_date),
							brew_time: row.brew_time,
							grind_in: row.grind_in,
							coffee_out: row.coffee_out,
							grind_size: row.grind_size,
						};
					}),
				);
			});
		});
	}

	public async getRatings(): Promise<Rating[] | Error> {
		const sql = `SELECT * FROM Rating`;

		return new Promise((resolve, reject) => {
			this.handle.all(sql, [], (err: Error, rows: any[]) => {
				if (err) {
					reject(err);
				}

				resolve(rows);
			});
		});
	}
}
