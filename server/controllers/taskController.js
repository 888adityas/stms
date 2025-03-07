import task from "../models/taskModel.js";
import employee from "../models/userModel.js";

export const setTask = async (req, res) => {
  try {
    let data = new task(req.body);
    await data.save().then(async (resp) => {
      let data = await employee.findOneAndUpdate(resp.assign, {
        $push: { tasks: resp._id },
      });
      console.log(resp);
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    let data = await task.findByIdAndUpdate(req.params.id, req.body);
    data.save().then((resp) => {
      res.json(resp);
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    let data = await task.findOneAndDelete(req.params.id);
    let employee_id = data.assign;
    console.log(data);
    if (data.assign != null) {
      let employeeData = await employee.findOneAndUpdate(
        { _id: data.assign },
        { $pull: { tasks: data._id } },
        { new: true }
      );
      employeeData.save().then((resp) => {});
    }
    res.json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const getTask = async (req, res) => {
  try {
    let data = await task.find().populate({
      path: "assign",
      select: "_id name email", // Only fetch the fields you need
    });
    res.json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const getTaskByID = async (req, res) => {
  try {
    let data = await task.findById(req.params.id).populate({
      path: "assign",
      select: "_id name email", // Only fetch the fields you need
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};

export const getEmployeeTask = async (req, res) => {
  try {
    let emp_id = req.params.id;
    console.log("works  " + emp_id);

    let data = await task.find({ assign: emp_id }).populate({
      path: "assign",
      select: "_id name email", // Only fetch the fields you need
    });

    res.json(data);
    console.log(data);
  } catch (err) {
    res.status(404).json({ success: false, message: "internal server err" });
    console.log(err);
  }
};
