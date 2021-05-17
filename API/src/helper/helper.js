import jwt from 'jsonwebtoken';

class Helper {
    constructor(){

    }
    static encodeRegistrationToken(rand,id) {
        const token = jwt.sign({
            rand: rand,
            id:id
        }, "yoursecretkey");
        return token;
    }

    static decodeRegistrationToken(token) {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const rand = decoded.rand;
        const id = decoded.id
        const dateNow = new Date();
        const tokenTime = decoded.iat * 1000;

        let tokenLife = 122222000;

        if (tokenTime + tokenLife < dateNow.getTime()) {
            return {
                expired: true
            };
        }
        return {
            rand,id
        };
    }

    static generateAccessToken(data) {
        // expires after half and hour (1800 seconds = 30 minutes)
        return jwt.sign({
            username: data.email
        },  process.env.TOKEN_SECRET, { expiresIn: "1800s"});
    }

    static isUnique(modelName, field, value, next) {
        var query = {};
        query[field] = value;
        modelName.findOne({where: query, attributes: ["id"]}).then(function(obj) {
            if (obj) {
                next(field + ' "' + value + '" is already in use');
            } else {
                next();
            }
        });
    }
}

export default Helper
