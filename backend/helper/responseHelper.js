exports.sendInternalServerError = function (response, err) {
    console.log(err);
    response.status(500).json({ error: "Internal Server Error" });
};