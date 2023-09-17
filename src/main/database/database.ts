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

	public async teardown(): Promise<void> {
		this.handle.close();
	}

	public async addBeans(beans: Beans): Promise<Error | boolean> {
		const sql = `INSERT INTO Beans (name, roast, company, roast_date) VALUES (?,?,?,?)`;
		let error: Error | null = null;

		const rd = beans.roast_date.toISOString();
		this.handle.run(sql, [beans.name, beans.roast, beans.company, rd], (err: Error) => {
			if (err) {
				error = err;
			}
		});
		if (error) {
			return error;
		}
		return true;
	}

	public async addBrew(brew: Brew): Promise<boolean> {
		const sql = `INSERT INTO Brew (beans_id, brew_date, brew_time, grind_in, coffee_out, grind_size) VALUES (?,?,?,?,?,?)`;
		let error: Error | null = null;

		const bd = brew.brew_date.toISOString();
		this.handle.run(
			sql,
			[brew.beans_id, bd, brew.brew_time, brew.grind_in, brew.coffee_out, brew.grind_size],
			(err: Error) => {
				if (err) {
					error = err;
				}
			},
		);
		if (error) {
			return error;
		}
		return true;
	}

	public async addRating(rating: Rating): Promise<boolean> {
		const sql = `INSERT INTO Rating (brew_id, rating, notes, bitterness, acidity) VALUES (?,?,?,?,?)`;
		let error: Error | null = null;

		this.handle.run(
			sql,
			[rating.brew_id, rating.rating, rating.notes, rating.bitterness, rating.acidity],
			(err: Error) => {
				if (err) {
					error = err;
				}
			},
		);
		if (error) {
			return error;
		}
		return true;
	}

	public async getBeans(): Promise<Beans[] | Error> {
		const sql = `SELECT * FROM Beans`;
		let beans: Beans[] = [];
		let error: Error | null = null;

		this.handle.all(sql, [], (err: Error, rows: Beans[]) => {
			if (err) {
				error = err;
			}
			beans = rows;
		});
		if (error) {
			return error;
		}
		return beans;
	}

	public async getBrews(): Promise<Brew[] | Error> {
		const sql = `SELECT * FROM Brew`;
		let brew: Brew[] = [];
		let error: Error | null = null;

		this.handle.all(sql, [], (err: Error, rows: Brew[]) => {
			if (err) {
				error = err;
			}
			brew = rows;
		});
		if (error) {
			return error;
		}
		return brew;
	}

	public async getRatings(): Promise<Rating[] | Error> {
		const sql = `SELECT * FROM Rating`;
		let rating: Rating[] = [];
		let error: Error | null = null;

		this.handle.all(sql, [], (err: Error, rows: Rating[]) => {
			if (err) {
				error = err;
			}
			rating = rows;
		});
		if (error) {
			return error;
		}
		return rating;
	}
}
