module.exports = class ApiResponse {

	constructor() {
		this.payload = {};
		this.message = "";
	}

	static with(payload, message) {
		const response = new ApiResponse();

		if (response.payload) {
			response.payload = payload;
		}

		if (message) {
			response.message = message;
		}

		return response.toObject();
	};

	toObject() {
		return {
			data: this.payload,
			message: this.message
		}
	}
};