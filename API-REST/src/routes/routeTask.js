const { Router } =require ("express");
const {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} =require ("../controllers/task.controllers.js");
const { authRequired2 } =require ("../middlewares/auth.middleware.js");
/* const { validateSchema } =require ("../middlewares/validator.middleware.js");
const { createTaskSchema } =require ("../schemas/task.schema.js"); */

const router = Router();

//router.get("/tasks", authRequired2, (req, res) => res.send("tasks"));

router.get("/tasks", authRequired2, getTasks);
//validateSchema(createTaskSchema) valida que los datos sean enviados
//router.post("/tasks", authRequired2, validateSchema(createTaskSchema), createTask);
router.post("/tasks", authRequired2, createTask);

router.get("/tasks/:id", authRequired2, getTask);

router.put("/tasks/:id", authRequired2, updateTask);

router.delete("/tasks/:id", authRequired2, deleteTask); 

module.exports= router;