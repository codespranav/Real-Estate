import express from "express"
import { loginUserController, registerUserController } from "../controllers/AuthController.js";
const router = express.Router()


// SignUp Router
router.post("/register", registerUserController)
router.post("/login", loginUserController)



export default router;