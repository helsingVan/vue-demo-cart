import { Router } from 'express';

const router = Router();

router.get('/',(req,res)=>{
	res.render('home');
});

export const profix = '/';
export default router;