process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'development'){
	require('babel-register');
	require('./src/app');
}else {
	require('./dist/app');
}