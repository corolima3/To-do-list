const { Router } = require("express");
const  {
    login2,
    logout2,
    find,
    register,
    register2,
    verifyToken,
    profile,
} = require ("../controllers/auth.controller.js")
const {authRequired2,authRequired} =require("../middlewares/auth.middleware.js")
const router = Router();

router.get("/", (req, res) => {
    res.send("hola amigo, estas en route y funciona modulos indexjs")
})

router.get("/register", find);
router.post("/register", register2);
router.post("/login", login2);
router.post("/logout", logout2);
router.get("/profile", authRequired2, profile);
/* router.post("/register", validateSchema(registerSchema), register); para validar con zod 
router.post("/login", validateSchema (loginSchema), login); */ //npm
router.post("/", async (req, res) => {
    const { name, password, email } = req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    let data = new User({ name, email, hash });

    return res.status(201).json(await data.save())
})


module.exports = router;

