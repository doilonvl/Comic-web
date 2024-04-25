import express from "express";
import userController from "../../controllers/userController/index.js";
import verifyToken from "../../middleware/verifyToken.js";
import upload from "../../middleware/multer.js";
import authenticate from "../../middleware/authenticate.js";
import authenticateAdmin from "../../middleware/authenticateAdmin.js";

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *  get:
 *    tags: ['User and Authentication']
 *    description: Use to request a user by token
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.get("/", verifyToken, userController.getUserByToken);

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags: ['User and Authentication']
 *    description: Use to login a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.post("/login", userController.login);

/**
 * @swagger
 * /user/register:
 *  post:
 *    tags: ['User and Authentication']
 *    description: Use to register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.post("/register", userController.register);

/**
 * @swagger
 * /user/update:
 *  put:
 *    tags: ['User and Authentication']
 *    description: Use to update a user
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.put("/update", userController.updateUser);

/**
 * @swagger
 * /user/upload:
 *  post:
 *    tags: ['User and Authentication']
 *    description: Use to upload a user image
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: file
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.post(
  "/upload",
  authenticate,
  upload.single("image"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(404).send("please select img");
    }
    console.log("No error");
    next();
  },
  userController.uploadImage
);

/**
 * @swagger
 * /user/all:
 *  get:
 *    tags: ['User and Authentication']
 *    description: Use to request all users sorted by role
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.get("/all", authenticate, userController.getAllUsersSortedByRole);

/**
 * @swagger
 * /user/change-role:
 *  put:
 *    tags: ['User and Authentication']
 *    description: Use to change a user's role
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              newRole:
 *                type: number
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.put(
  "/change-role",
  authenticateAdmin,
  userController.changeUserRole
);

/**
 * @swagger
 * /user/change-status:
 *  put:
 *    tags: ['User and Authentication']
 *    description: Use to change a user's status
 *    security:
 *      - BearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              newStatus:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.put(
  "/change-status",
  authenticateAdmin,
  userController.changeUserStatus
);
export default userRouter;
