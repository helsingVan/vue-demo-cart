import { Router } from 'express';
import glob from 'glob';

const router = Router();

glob.sync('./controller/*.js',{cwd:__dirname}).forEach(files=>{
	let controller = require(files);
	router.use(controller.profix,controller.default);
});

export default router;