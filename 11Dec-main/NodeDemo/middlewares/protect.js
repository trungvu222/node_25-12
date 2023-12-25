var jwt = require('jsonwebtoken');
const configs = require('../helper/configs');

function sendError() {
    return { err: "Vui long dang nhap" };
}

module.exports = {
    checkLogin: async function (req) {
        var token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")) {
            return sendError();
        }
        token = token.split(" ")[1];
        try {
            var userID = await jwt.verify(token, configs.SECRET_KEY);
            return userID.id;
        } catch (error) {
            return sendError();
        }
    },

    checkPermission: function (req, requiredPermission) {
        // Giả sử quyền của người dùng được lưu trữ trong req.user.permissions
        if (!req.user || !req.user.permissions.includes(requiredPermission)) {
            return { err: "Khong co quyen truy cap" };
        }
        return null;
    }
}