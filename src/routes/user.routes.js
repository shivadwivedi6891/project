// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";

// const router = Router()

// router.route("/register").post(registerUser)

// export default Router


import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

export default router; // Correctly export the router instance