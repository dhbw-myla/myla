
const statusCodes = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    418: "I'm a teapot",
};

exports.sendClientError = function (response, status, errorMessage) {
    if (typeof(status) === "string" && errorMessage === undefined) {
        // u just need to specify the message if you're lazy
        errorMessage = status;
        status = 400;
    }
    response.status(status).json({ error: errorMessage || statusCodes[status] || "Error" });
};

exports.sendInternalServerError = function (response, err) {
    console.log(err);
    response.status(500).json({ error: "Internal Server Error" });
};
