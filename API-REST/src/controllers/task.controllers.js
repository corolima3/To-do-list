const Task = require ("../schemas/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user : req.user.id }).populate("user");
    //console.log(tasks);
  /* [
  {
    "_id": "65a81667ec0e5d32189b1a7e",
    "title": "tarea 2",
    "description": "14:47 17-01-2024",
    "date": null,
    "user": {
      "_id": "65a7e978c581b641bc34a0da",
      "name": "pepe17/01/2024-11:45hs",
      "email": "pepe3@gmail.com",
      "password": "$2b$10$5c3/YbXP/ObLj0PsHIZ4IuDVcD4GmzyEN6aaO40m.gxYmxirZwVGK",
      "createdAt": "2024-01-17T14:51:36.937Z",
      "updatedAt": "2024-01-17T14:51:36.937Z"
    },
    "createdAt": "2024-01-17T18:03:19.019Z",
    "updatedAt": "2024-01-17T18:03:19.019Z",
    "__v": 0
  },
  {
    "_id": "65a817bcec0e5d32189b1a80",
    "title": "tarea 3",
    "description": "14:47 17-01-2024",
    "date": "2024-01-17T18:09:00.513Z",
    "user": {
      "_id": "65a7e978c581b641bc34a0da",
      "name": "pepe17/01/2024-11:45hs",
      "email": "pepe3@gmail.com",
      "password": "$2b$10$5c3/YbXP/ObLj0PsHIZ4IuDVcD4GmzyEN6aaO40m.gxYmxirZwVGK",
      "createdAt": "2024-01-17T14:51:36.937Z",
      "updatedAt": "2024-01-17T14:51:36.937Z"
    },
    "createdAt": "2024-01-17T18:09:00.514Z",
    "updatedAt": "2024-01-17T18:09:00.514Z",
    "__v": 0
  }
] */
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    await newTask.save();//recordar que podes guradar en const
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);//res.json(deletedTask)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    /* mi codigo
      const task = await Task.findByIdAndUpdate (req.params.id, req.body, {
      new: true,});
      if (!task) return res.status (404).json({ message: "Task not found" });
      return res.json(task);
      }; */
    const { title, description, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }//pasa el dato nuevo, guardar el actualizado
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports ={ getTasks, createTask, updateTask, deleteTask, getTask }