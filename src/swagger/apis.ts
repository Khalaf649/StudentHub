/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserRole:
 *       type: string
 *       enum: [student, teacher]
 *     Section:
 *       type: string
 *       enum: [first_sec, second_sec_scientific, second_sec_literary, third_sec]
 *     ParentRole:
 *       type: string
 *       enum: [father, mother, guardian]
 *     AttendanceStatus:
 *       type: string
 *       enum: [present, absent]
 *     LoginDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required: [email, password]
 *     RegisterStudentDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         center_id:
 *           type: integer
 *       required: [name,phone,email,password,section,center_id]
 *     LoginResponseDto:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             role:
 *               $ref: '#/components/schemas/UserRole'
 *       required: [token,user]
 *     TokenDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         role:
 *           $ref: '#/components/schemas/UserRole'
 *       required: [id,role]
 *     StudentInfoDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         centers:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *       required: [id,name,email,phone,section]
 *     CreateStudentParentDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         relationship:
 *           $ref: '#/components/schemas/ParentRole'
 *       required: [name,phone,relationship]
 *     GetStudentParentsDto:
 *       type: object
 *       properties:
 *         role:
 *           $ref: '#/components/schemas/ParentRole'
 *         parents:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *       required: [role,parents]
 *     StudentQuizDto:
 *       type: object
 *       properties:
 *         grade:
 *           type: number
 *         quizzes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               full_mark:
 *                 type: number
 *       required: [grade,quizzes]
 *     StudentSessionsDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         status:
 *           $ref: '#/components/schemas/AttendanceStatus'
 *         sessions:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             session_datetime:
 *               type: string
 *               format: date-time
 *             description:
 *               type: string
 *             section:
 *               $ref: '#/components/schemas/Section'
 *       required: [id,status,sessions]
 *     StudentHomeworkDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         grade:
 *           type: number
 *         submission_date:
 *           type: string
 *           format: date-time
 *         homeworks:
 *           type: object
 *           properties:
 *             start_date:
 *               type: string
 *               format: date-time
 *             due_date:
 *               type: string
 *               format: date-time
 *             description:
 *               type: string
 *             title:
 *               type: string
 *             full_mark:
 *               type: number
 *       required: [id,grade,submission_date,homeworks]
 *     CreateCenterDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         phone:
 *           type: string
 *       required: [name,location,phone]
 *     GetCenterDto:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateCenterDto'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *           required: [id]
 *     CreateHomeworkDto:
 *       type: object
 *       properties:
 *         session_id:
 *           type: integer
 *         title:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         due_date:
 *           type: string
 *           format: date-time
 *         full_mark:
 *           type: number
 *       required: [session_id,title,start_date,description,due_date,full_mark]
 *     AssignHomeworkDto:
 *       type: object
 *       properties:
 *         student_id:
 *           type: integer
 *         homework_id:
 *           type: integer
 *         grade:
 *           type: number
 *         submission_date:
 *           type: string
 *           format: date-time
 *       required: [student_id,homework_id,grade,submission_date]
 *     HomeworkFilters:
 *       type: object
 *       properties:
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         center_id:
 *           type: integer
 *         id:
 *           type: integer
 *     HomeworkDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date-time
 *         due_date:
 *           type: string
 *           format: date-time
 *         full_mark:
 *           type: number
 *         sessions:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             title:
 *               type: string
 *             section:
 *               $ref: '#/components/schemas/Section'
 *             center_id:
 *               type: integer
 *       required: [id,title,description,start_date,due_date,full_mark,sessions]
 *     CreateQuizDto:
 *       type: object
 *       properties:
 *         session_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         full_mark:
 *           type: number
 *       required: [session_id,title,full_mark]
 *     AssignQuizDto:
 *       type: object
 *       properties:
 *         student_id:
 *           type: integer
 *         quiz_id:
 *           type: integer
 *         grade:
 *           type: number
 *       required: [student_id,quiz_id,grade]
 *     QuizFilters:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         section:
 *           type: string
 *         center_id:
 *           type: integer
 *     QuizDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         full_mark:
 *           type: number
 *         sessions:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             title:
 *               type: string
 *             section:
 *               $ref: '#/components/schemas/Section'
 *             center_id:
 *               type: integer
 *       required: [id,title,full_mark,sessions]
 *     CreateSessionDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         center_id:
 *           type: integer
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         session_datetime:
 *           type: string
 *           format: date-time
 *       required: [title,description,center_id,section,session_datetime]
 *     GetSessionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         session_datetime:
 *           type: string
 *           format: date-time
 *         centers:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *         _count:
 *           type: object
 *           properties:
 *             attendances:
 *               type: integer
 *       required: [id,title,description,section,session_datetime,centers,_count]
 *     SessionFilters:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         center_id:
 *           type: integer
 *     AssignSessionDto:
 *       type: object
 *       properties:
 *         student_id:
 *           type: integer
 *         session_id:
 *           type: integer
 *         status:
 *           $ref: '#/components/schemas/AttendanceStatus'
 *       required: [student_id,session_id,status]
 *     StudentFilters:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         page:
 *           type: integer
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         center_id:
 *           type: integer
 *         session_id:
 *           type: integer
 *         homework_id:
 *           type: integer
 *         quiz_id:
 *           type: integer
 *     StudentWhereInput:
 *       type: object
 *       properties:
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         center_id:
 *           type: integer
 *         name:
 *           type: object
 *           properties:
 *             startsWith:
 *               type: string
 *             mode:
 *               type: string
 *               enum: [insensitive]
 *         attendances:
 *           type: object
 *           properties:
 *             some:
 *               type: object
 *               properties:
 *                 session_id:
 *                   type: integer
 *                 status:
 *                   $ref: '#/components/schemas/AttendanceStatus'
 *         homework_submissions:
 *           type: object
 *           properties:
 *             some:
 *               type: object
 *               properties:
 *                 homework_id:
 *                   type: integer
 *         student_quizzes:
 *           type: object
 *           properties:
 *             some:
 *               type: object
 *               properties:
 *                 quiz_id:
 *                   type: integer
 *     StudentDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         section:
 *           $ref: '#/components/schemas/Section'
 *         centers:
 *           oneOf:
 *             - type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *             - type: "null"
 *         student_parents:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               role:
 *                 $ref: '#/components/schemas/ParentRole'
 *               parents:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                     nullable: true
 *       required: [id,name,email,phone,section,student_parents]
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       '200':
 *         description: successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDto'
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new student account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterStudentDto'
 *     responses:
 *       '201':
 *         description: student registered successfully
 */

/**
 * @openapi
 * /student/sessions:
 *   get:
 *     tags: [Student]
 *     summary: Get the sessions for the authenticated student
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: list of student sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentSessionsDto'
 */

/**
 * @openapi
 * /student/homeworks:
 *   get:
 *     tags: [Student]
 *     summary: Get homeworks for the authenticated student
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: list of student homework entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentHomeworkDto'
 */

/**
 * @openapi
 * /student/parents:
 *   post:
 *     tags: [Student]
 *     summary: Add a parent record for the authenticated student
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentParentDto'
 *     responses:
 *       '201':
 *         description: parent created successfully
 *   get:
 *     tags: [Student]
 *     summary: Retrieve parents of the authenticated student
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: student parents information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetStudentParentsDto'
 */

/**
 * @openapi
 * /student/quizzes:
 *   get:
 *     tags: [Student]
 *     summary: Get quizzes taken by the authenticated student
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: student quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentQuizDto'
 */

/**
 * @openapi
 * /student/info:
 *   get:
 *     tags: [Student]
 *     summary: Get profile information for authenticated student
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: student profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentInfoDto'
 */

/**
 * @openapi
 * /teacher/center:
 *   get:
 *     tags: [Teacher Center]
 *     summary: List all centers
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: array of centers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetCenterDto'
 *   post:
 *     tags: [Teacher Center]
 *     summary: Create a new center
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCenterDto'
 *     responses:
 *       '201':
 *         description: center created
 */

/**
 * @openapi
 * /teacher/homework:
 *   post:
 *     tags: [Teacher Homework]
 *     summary: Create a homework entry
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHomeworkDto'
 *     responses:
 *       '201':
 *         description: homework created
 *   get:
 *     tags: [Teacher Homework]
 *     summary: Retrieve homeworks with optional filters
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: section
 *         schema:
 *           $ref: '#/components/schemas/Section'
 *       - in: query
 *         name: center_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: array of homework records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HomeworkDto'
 * /teacher/homework/assign:
 *   post:
 *     tags: [Teacher Homework]
 *     summary: Assign homework to a student
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignHomeworkDto'
 *     responses:
 *       '200':
 *         description: homework assigned
 */

/**
 * @openapi
 * /teacher/quiz:
 *   post:
 *     tags: [Teacher Quiz]
 *     summary: Create a quiz
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuizDto'
 *     responses:
 *       '201':
 *         description: quiz created
 *   get:
 *     tags: [Teacher Quiz]
 *     summary: Retrieve quizzes with optional filters
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: section
 *         schema:
 *           type: string
 *       - in: query
 *         name: center_id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: array of quiz records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuizDto'
 * /teacher/quiz/assign:
 *   post:
 *     tags: [Teacher Quiz]
 *     summary: Assign a quiz to a student
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignQuizDto'
 *     responses:
 *       '200':
 *         description: quiz assigned
 */

/**
 * @openapi
 * /teacher/session:
 *   post:
 *     tags: [Teacher Session]
 *     summary: Create a session
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionDto'
 *     responses:
 *       '201':
 *         description: session created
 *   get:
 *     tags: [Teacher Session]
 *     summary: Retrieve sessions with optional filters
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: section
 *         schema:
 *           $ref: '#/components/schemas/Section'
 *       - in: query
 *         name: center_id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: array of session records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetSessionDto'
 * /teacher/session/assign:
 *   post:
 *     tags: [Teacher Session]
 *     summary: Assign a student to a session
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignSessionDto'
 *     responses:
 *       '200':
 *         description: session assigned
 * /teacher/session/{id}:
 *   put:
 *     tags: [Teacher Session]
 *     summary: Update a session
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionDto'
 *     responses:
 *       '200':
 *         description: session updated
 */

/**
 * @openapi
 * /teacher/student:
 *   get:
 *     tags: [Teacher Student]
 *     summary: List students with optional filters
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: section
 *         schema:
 *           $ref: '#/components/schemas/Section'
 *       - in: query
 *         name: center_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: session_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: homework_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: quiz_id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: array of student objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentDto'
 */
