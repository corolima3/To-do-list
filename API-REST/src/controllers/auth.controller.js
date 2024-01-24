
//const VIdeo = require("../schemas/video");
const User = require("../schemas/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* import { TOKEN_SECRET } from "../config.js";*/
const createAccessToken = require("../libs/jwt.js");

//pruebas register2, sirve register optimo 
const register2 = async (req, res) => {

  const { email, password, name } = req.body;
  try {
    const userFound= await User.findOne({email})
    if (userFound) return res.status(400).json(["The email already exists"])//{message: "The email already exists}

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    // create access token
    const token = await createAccessToken({
      id: newUser._id,
    });
    console.log(token);
    res.cookie("token", token);

    res.json(await newUser.save())
  } catch (error) {
    console.log(error);
  }

}

const find = async (req, res) => {// busca y muestra todos los registrados
  try {
    const Resenas = await User.find({});

    return res.status(200).json(Resenas);

  } catch (error) {
    return res.status(500).send(error.message);

  }
}

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFound._id,
    name1: userFound.name,
    email: userFound.email,

  })

}

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login2 = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json(["The email does not exist"]
      );
    /* if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      }); */

    const isMatch = await bcrypt.compare(password, userFound.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json(["The password is incorrect"],
      );
    }
  /*   if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }
 */
    const token = await createAccessToken({
      id: userFound._id
    });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

const logout2 = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};


module.exports = { login2, logout2, find, register, register2, verifyToken, profile };