/* eslint-disable compat/compat */
const electronApp = require('electron').app;
const fs = require('fs');

type Config = {
	CURRENT_DB: string;
	PREVIOUS_DBS: string[];
};

class ConfigManager {
	private appUserDataPath: string;

	private jsonPath: string;

	private config: Config = {
		CURRENT_DB: '',
		PREVIOUS_DBS: [],
	};

	constructor() {
		this.appUserDataPath = electronApp.getPath('userData');
		this.jsonPath = `${this.appUserDataPath}/config.json`;
		this.init();
	}

	private init(): void {
		if (!fs.existsSync(this.jsonPath)) {
			this.saveDB(); // saves the file with the default config specified on line 15
		} else {
			this.config = this.loadDB(); // else overwrites the default config with the saved config
		}
	}

	private loadDB(): Config {
		return fs.readFileSync(this.jsonPath, 'utf8');
	}

	private saveDB(): void {
		fs.writeFileSync(this.jsonPath, JSON.stringify(this.config));
	}

	public getDB(): string {
		return this.config.CURRENT_DB;
	}

	public setDB(db: string): void {
		this.config.CURRENT_DB = db;
		this.addPreviousDB(db);
		this.saveDB();
	}

	public getPreviousDBs(): string[] {
		return this.config.PREVIOUS_DBS;
	}

	public setPreviousDBs(dbs: string[]): void {
		this.config.PREVIOUS_DBS = dbs;

		this.saveDB();
	}

	public addPreviousDB(db: string): void {
		this.config.PREVIOUS_DBS.push(db);

		this.saveDB();
	}
}

export default ConfigManager;
