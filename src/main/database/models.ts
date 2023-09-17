/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Beans {
	beans_id?: number;
	name: string;
	roast: string;
	company: string;
	roast_date: Date;
}
export interface Brew {
	brew_id?: number;
	beans_id: number;
	brew_date: Date;
	brew_time: number;
	grind_in: number;
	coffee_out: number;

	grind_size: number;
}

export interface Rating {
	rating_id?: number;
	brew_id: number;
	rating: number;
	notes: string;
	bitterness: number;
	acidity: number;
}
