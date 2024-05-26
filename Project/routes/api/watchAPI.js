let express = require("express");
let router = express.Router();
let Watch = require("../../modal/Watch");

router.get("/watches", async function (req, res) {
  let watches = await Watch.find();
  return res.send(watches);
});

router.get("/watches/:id", async (req, res) => {
  let watch = await Watch.findById(req.params.id);
  return res.send(watch);
});
router.put("/watches/:id", async (req, res) => {
  let watch = await Watch.findById(req.params.id);

  watch.title = req.body.title;
  watch.image_url = req.body.image_url;
  watch.price = req.body.price;
  watch.brand = req.body.brand;

  await watch.save();
  return res.send(watch);
});
router.delete("/watches/:id", async (req, res) => {
  let watch = await Watch.findByIdAndDelete(req.params.id);
  return res.send(watch);
});

router.post("/watches", async (req, res) => {
  let data = req.body;
  let record = new Watch(data);
  await record.save();
  return res.send(record);
});


module.exports = router;