import { body } from 'express-validator';

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .isIn(['student', 'teacher'])
        .withMessage('Role must be one of: student, teacher'),
];