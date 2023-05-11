import { Router } from 'express';

const router = Router();
router.get('/teams', (req, res) => res.json({ ok: false }));

export default router;
