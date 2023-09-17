import Database from '../main/database/database';
import * as models from '../main/database/models';

// const fs = require('fs');

const TESTSQLITE = './test.sqlite';
let db: Database;

beforeEach(() => {
	db = new Database(TESTSQLITE);
});

describe('database.addBeans', () => {
	test('adding', async () => {
		const beans: models.Beans = {
			name: 'test beans',
			roast: 'light',
			company: 'test company',
			roast_date: new Date(),
		};
		const result = await db.addBeans(beans);
		expect(result).toBe(true);
	});
});
