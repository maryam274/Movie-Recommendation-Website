import express from "express";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";


const router = express.Router();


router.use("/person", personRoute);
router.use("/:mediaType", mediaRoute);

export default router;