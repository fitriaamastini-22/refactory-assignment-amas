import VueRouter from 'vue-router';

const routes = [
	// {
	// 	// path: '/hello',
	// 	path: '*', //
	// 	// redirect: '/',
	// 	redirect: to =>{
	// 		// console.log(to, 'HELLO');

	// 		return '/'
	// 	}
	// },
	{
		path: "*",
		redirect: "/not-found",
	},
	{
		path: "/not-found",
		component: () => import("./pages/NotFound.vue"),
	},
	{
		path: "/alias",
		alias: "/ilang",
		component: () => import("./pages/NotFound.vue"),
	},
	{
		path: '/',
		name: 'Dashboard',
		components: {
			default: () => import("./pages/Dashboard.vue"),
			// sidebarA: () => import("./components/SideBarA.vue"),
			sidebarB: () => import("./components/SideBarB.vue"),
		},
		meta: {requireAuth: true}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import("./pages/Login.vue")
	},
	{
		path: '/detail/:id',
		name: 'DetailItem',
		props:{
			default:true
		},
		components: {
			default: () => import("./pages/DetailItem.vue"),
			// sidebarA: () => import("./components/SideBarA.vue"),
			sidebarB: () => import("./components/SideBarB.vue"),
		}
	},

	{
		path: '/checkout',
		name: 'Checkout',
		component: () => import("./pages/Checkout.vue"),
	},
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

router.beforeEach((to, from, next) =>{
	const test = to.matched.some(record=> record.meta.requiresAuth);
	console.log(test);
	console.log("[to]", to, "[from]", from, "[next]", next);
	const login = localStorage.getItem("login");
	if(to.name != 'Login' && !login){
		next({name:"Login"});
	}
	next();
});

export default router;