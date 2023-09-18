import Database from '../main/database/database';
import * as models from '../main/database/models';

const fs = require('fs');

const TESTSQLITE = './test.sqlite';
let db: Database;

beforeEach(() => {
	db = new Database(TESTSQLITE);
});

beforeAll(async () => {
	if (fs.existsSync(TESTSQLITE)) {
		await fs.rmSync(TESTSQLITE);
	}
});

describe('database.addBeans', () => {
	test('adding', async () => {
		const beans: models.Beans = {
			name: 'test beans',
			roast: 'light',
			company: 'test company',
			roast_date: new Date(Date.now()),
		};
		const result = await db.addBeans(beans);
		expect(result).toBe(true);
	});
});

describe('database.addBrew', () => {
	test('adding', async () => {
		const brew: models.Brew = {
			beans_id: 1,
			brew_date: new Date(Date.now()),
			brew_time: 30,
			grind_in: 30,
			coffee_out: 30,
			grind_size: 30,
		};
		const result = await db.addBrew(brew);
		expect(result).toBe(true);
	});
});

describe('database.addRating', () => {
	test('adding', async () => {
		const rating: models.Rating = {
			brew_id: 1,
			rating: 3,
			notes: 'test notes',
			bitterness: 3,
			acidity: 3,
		};
		const result = await db.addRating(rating);
		expect(result).toBe(true);
	});
});

describe('database.getBeans', () => {
	test('getting results from the table', async () => {
		const result = await db.getBeans();
		expect(result).not.toBe(null);
	});
});

describe('database.getBrews', () => {
	test('getting results from the table', async () => {
		const result = await db.getBrews();
		expect(result).not.toBe(null);
	});
});

describe('database.getRatings', () => {
	test('getting results from the table', async () => {
		const result = await db.getRatings();
		expect(result).not.toBe(null);
	});
});

describe('database.teardown', () => {
	test('closing the database', async () => {
		const result = await db.teardown();
		expect(result).toBe(true);
	});
});
