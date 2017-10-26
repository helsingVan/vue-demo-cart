
const Home = (resolve) => {
  import('@/pages/home/home').then((module)=> {
  	resolve(module);
  });
};

const Singer = (resolve) => {
  import('@/pages/singer/singer').then((module)=> {
  	resolve(module);
  });
};

const Search = (resolve) => {
  import('@/pages/search/search').then((module)=> {
  	resolve(module);
  });
};

const Rank = (resolve) => {
  import('@/pages/rank/rank').then((module) => {
    resolve(module);
  });
}
const routes = [
	{path:'/',redirect:'/home'},
	{path:'/home',name:'Home',component:Home,children:[
    {path: 'rank/:id',name: 'Rank',component: Rank}
  ]},
	{path:'/singer',name:'Singer',component:Singer},
	{path:'/search',name:'Search',component:Search}
];

export default routes;