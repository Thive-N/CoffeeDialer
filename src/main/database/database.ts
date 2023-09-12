import * as sqlite3 from 'sqlite3';
import { Beans, Brew, Rating } from './models';

export default class Database {
	private handle: sqlite3.Database;

	constructor(DBSOURCE: string = 'assets/db.sqlite') {
		this.handle = new sqlite3.Database(DBSOURCE);
	}

	public async addBeans(beans: Beans): Promise<boolean> {
		const sql = `INSERT INTO beans (name, roast, company, roast_date) VALUES (?,?,?,?)`;
		try {
			this.handle.run(sql, [beans.name, beans.roast, beans.company, beans.roast_date]);
			return true;
		} catch (error) {
			return false;
		}
	}

	public async addBrew(brew: Brew): Promise<boolean> {
		const sql = `INSERT INTO brew (beans_id, brew_date, brew_time, grind_in, coffee_out, grind_size) VALUES (?,?,?,?,?,?)`;
		try {
			this.handle.run(sql, [
				brew.beans_id,
				brew.brew_date,
				brew.brew_time,
				brew.grind_in,
				brew.coffee_out,
				brew.grind_size,
			]);
			return true;
		} catch (error) {
			return false;
		}
	}

	public async addRating(rating: Rating): Promise<boolean> {
		const sql = `INSERT INTO rating (brew_id, rating, notes, bitterness, acidity) VALUES (?,?,?,?,?)`;
		try {
			this.handle.run(sql, [rating.brew_id, rating.rating, rating.notes, rating.bitterness, rating.acidity]);
			return true;
		} catch (error) {
			return false;
		}
	}
}
