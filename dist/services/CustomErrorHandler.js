class CustomErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        // Set the prototype explicitly to maintain the correct prototype chain
        Object.setPrototypeOf(this, CustomErrorHandler.prototype);
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }
    static credentials(message = "username or password is invalid") {
        return new CustomErrorHandler(401, message);
    }
}
export default CustomErrorHandler;
//# sourceMappingURL=CustomErrorHandler.js.map