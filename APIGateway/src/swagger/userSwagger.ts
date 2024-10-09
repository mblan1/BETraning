/**
 * @openapi
 * /api/user/auth/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their necessary information such as username, password, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please provide all required fields
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request
 *
 * /api/user/auth/sign-in:
 *   post:
 *     tags:
 *       - User
 *     summary: Login
 *     description: This endpoint allows a user to login by providing their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123!
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 12345
 *                     username:
 *                       type: string
 *                       example: user123
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJpYXQiOjE1MTYyMzkwMjJ9.7
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please provide all required fields
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request
 *
 * /api/user/get-user:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID query or all users
 *     description: This endpoint allows a user to get a specific user by providing their ID or all users if ID is not provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *           example: 12345
 *         description: User ID
 *         required: false
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         description: Bearer token
 *         required: true
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: user123
 *                 role:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: admin
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ['permission1', 'permission2']
 *       404:
 *         description: User not found or no users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found or no users found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request
 */
