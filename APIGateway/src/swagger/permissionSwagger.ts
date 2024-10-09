/**
 * @openapi
 * /api/permission/get-permissions:
 *   get:
 *     tags:
 *       - Permission
 *     summary: get all permissions
 *     description: This endpoint allows get all permissions data.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: All permission data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 12345
 *                   name:
 *                     type: string
 *                     example: permission1
 *                   description:
 *                     type: string
 *                     example: permission1 description
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not found
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
 * /api/permission/create-permission:
 *   post:
 *     tags:
 *       - Permission
 *     summary: Create a new permission
 *     description: This endpoint allows creating a new permission.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         required: true
 *         description: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: permission1
 *               description:
 *                 type: string
 *                 example: permission1 description
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Permission created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: permission1
 *                     description:
 *                       type: string
 *                       example: permission1 description
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
 * /api/permission/remove-permission/{id}:
 *   delete:
 *     tags:
 *       - Permission
 *     summary: Remove a permission
 *     description: This endpoint allows removing a permission.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 12345
 *         required: true
 *         description: Permission ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         required: true
 *         description: Bearer token
 *     responses:
 *       200:
 *         description: Permission deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission deleted
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission ID is required
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
