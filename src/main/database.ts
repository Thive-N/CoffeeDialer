import * as sqlite3 from 'sqlite3';

const DBSOURCE = 'assets/db.sqlite';
export default class Database {
	private handle: sqlite3.Database;

	constructor() {
		this.handle = new sqlite3.Database(DBSOURCE, () => {});
	}
}
