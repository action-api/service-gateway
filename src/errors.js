export class InputError extends Error {
	constructor(message) {
		super(message);
		this.name = 'InputError';
		this.statusCode = 400;
	}
}

export class RouteError extends Error {
	constructor(message) {
		super(message);
		this.name = 'RouteError';
		this.statusCode = 404;
	}
}
