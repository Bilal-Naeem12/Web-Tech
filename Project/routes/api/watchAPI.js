let express = require("express");
let router = express.Router();
let Watch = require("../../modal/Watch");
router.get("/api/watches/:id", async (req, res) => {
  let watch = await Watch.findById(req.params.id);
  return res.send(watch);
});
router.put("/api/watches/:id", async (req, res) => {
  let watch = await Watch.findById(req.params.id);
  watch.title = req.body.title;
  watch.type = req.body.type;
  watch.genre = req.body.genre;
  await watch.save();
  return res.send(watch);
});
router.delete("/api/watches/:id", async (req, res) => {
  let watch = await Watch.findByIdAndDelete(req.params.id);
  return res.send(watch);
});

router.post("/api/watches", async (req, res) => {
  let data = req.body;
  let record = new Watch(data);
  await record.save();
  return res.send(record);
});
router.get("/api/watches", async function (req, res) {
  let watches = await Watch.find();
  return res.send(watches);
});

module.exports = router;