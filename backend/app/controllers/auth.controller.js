const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullname: "",
        age: "",
        sex: "",
        height: "",
        weight: "",
        allergies: "",
        phone: "",
        address: ""
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                    name: { $in: req.body.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
            username: req.body.username,
        })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            req.session.token = token;

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
            });
        });
};

exports.signout = async(req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};

exports.getUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.findOne({ name: "admin" }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            const filteredUsers = users.filter(user => !user.roles.includes(role.id));

            console.log(filteredUsers);
            res.status(200).json(filteredUsers);
        })
    })
}

exports.addInformation = (req, res) => {
    const dataToUpdate = req.body;
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        user.fullname = dataToUpdate.fullname;
        user.age = dataToUpdate.age;
        user.sex = dataToUpdate.sex;
        user.height = dataToUpdate.height;
        user.weight = dataToUpdate.weight;
        user.allergies = dataToUpdate.allergies;
        user.phone = dataToUpdate.phone;
        user.address = dataToUpdate.address;
        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json(user);
        })
    })
}

exports.getDataForUser = (req, res) => {
    User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json(user);
        })
}