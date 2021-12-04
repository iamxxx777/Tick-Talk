const router = require('express').Router();
const { createProfile, getProfile, getAllProfiles, updateImage, updateProfile } = require("../controllers/profileController")
const upload = require("../config/multer");

router.get("/", getAllProfiles);

router.get("/:id", getProfile);

router.post("/", createProfile);

router.put("/", updateProfile);

router.put("/image", upload.single("image"), updateImage)

module.exports = router;