import { join } from 'path';
import express from 'express';
import router from './router'

const app = express();

app.use(express.static(join(__dirname,'../static/assets')));
app.use(express.static(join(__dirname,'../static/pages')));
app.use(express.static(join(__dirname,'../node_modules')));

app.set('views',join(__dirname,'views'));
app.set('view engine','hbs');

app.use(router);

const port = ((process.env.PORT||3000)+'').trim();

app.listen(port,error=>{
	if(error) throw error;
	console.log('success');
})