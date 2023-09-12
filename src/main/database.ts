import * as sqlite3 from 'sqlite3';

export default class Database {
	private handle: sqlite3.Database;

	constructor(DBSOURCE: string = 'assets/db.sqlite') {
		this.handle = new sqlite3.Database(DBSOURCE, () => {});
	}
}
