const express = require("express");
const router = express.Router();
const ABI = require("../ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
  "https://attentive-snowy-shard.ethereum-sepolia.discover.quiknode.pro/00d5d730e4ec03d62d2e83d73d0a9c42a9e556a9/"
);

const contractAddres = "0x7ca47e1b442493a67a61c2b382131489ba52f15c";
const contract = new web3.eth.Contract(ABI, contractAddres);

router.get("/viewTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    if (taskId) {
      const response = await contract.methods.viewTask(taskId).call();
      console.log(response);
      const { id, name, data } = response;
      const FormateId = Number(id);
      const newObject = {
        id: FormateId,
        name: name,
        data: data,
      };
      res
        .status(200)
        .json({ message: "Data has benn fetched", data: newObject });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/viewAllTask", async (req, res) => {
  try {
    const response = await contract.methods.allTask().call();
    if (response.length > 0) {
      let TaskData = response.map(({ id, name, data }) => {
        const TaskId = Number(id);
        return { TaskId, name, data };
      });
      res.json({ data: TaskData, message: "data Fetched successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/createTask", async (req, res) => {
  try {
   

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
