import express from "express";
import personController from "../controllers/person.controller.js";

// Person Route
// This route handles the person-related requests
// It takes the person ID from the request parameters
// and calls the personController to get the person details
// and the person's media
const router = express.Router({ mergeParams: true });

router.get("/:personId/medias", personController.personMedias);

router.get("/:personId", personController.personDetail);

export default router;