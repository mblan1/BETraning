/**
 * @openapi
 * /pi/route/get-routes\:
 *   get:
 *     tags:
 *       - Route
 *     summary: get a specific route or all routes
 *     description: This endpoint allows get all routes or a specific route if id was provided.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         required: true
 *         description: Bearer token
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *           example: 12345
 *         required: false
 *         description: Route ID
 *     responses:
 *       200:
 *         description: Route data
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
 *                     example: /route
 *                   description:
 *                     type: string
 *                     example: route description
 *                   method:
 *                     type: string
 *                     example: GET
 *                   permissions:
 *                     type: array
 *                     example: [permission1, permission2]
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: route Not found
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
 * /api/route/create-route:
 *   post:
 *     tags:
 *       - Route
 *     summary: Create a new route
 *     description: This endpoint allows creating a new route with one or many permission with permissionIds.
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
 *               path:
 *                 type: string
 *                 example: /route
 *               description:
 *                 type: string
 *                 example: route description
 *               method:
 *                 type: string
 *                 example: GET
 *               permissionIds:
 *                 type: array
 *                 example: [1, 2]
 *             required:
 *               - name
 *               - description
 *               - method
 *               - permissionIds
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
 *                       example: /route
 *                     description:
 *                       type: string
 *                       example: route description
 *                     method:
 *                       type: string
 *                       example: GET
 *                     permissions:
 *                       type: array
 *                       example: [permission1, permission2]
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Path, description and permission are required
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
 * /api/route/update-route:
 *   put:
 *     tags:
 *       - Route
 *     summary: Update a route by ID
 *     description: This endpoint allows update a specific route.
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
 *               id:
 *                 type: number
 *                 example: 12345
 *               description:
 *                 type: string
 *                 example: route description
 *               method:
 *                 type: string
 *                 example: GET
 *               permissionIds:
 *                 type: array
 *                 example: [1, 2]
 *             required:
 *               - id
 *               - description
 *               - method
 *               - permissionIds
 *     responses:
 *       200:
 *         description: Route updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 12345
 *                     name:
 *                       type: string
 *                       example: /route
 *                     description:
 *                       type: string
 *                       example: route description
 *                     method:
 *                       type: string
 *                       example: GET
 *                     permissions:
 *                       type: array
 *                       example: [permission1, permission2]
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id, description and permissionIds are required and Permission Ids should be an array
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
 * /api/route/remove-route/{id}:
 *   delete:
 *     tags:
 *       - Route
 *     summary: Remove a route by ID
 *     description: This endpoint allows remove a specific route.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer token
 *         required: true
 *         description: Bearer token
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: 12345
 *         required: true
 *         description: Route ID
 *     responses:
 *       200:
 *         description: Route removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route removed successfully
 *       400:
 *         description: Bad request, missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Route id is required
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
