import { Router } from 'express';
import { generate, saveEmail, getEmails } from '../controllers/email.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Public generation (or protected if you prefer, leaving public for easy testing initially, but usually should be protected)
// Let's protect it to encourage login
// Public generation for easier testing/onboarding
router.post('/generate', generate); // Removed authenticateToken for now
router.post('/save', authenticateToken, saveEmail);
router.get('/', authenticateToken, getEmails);

export default router;
