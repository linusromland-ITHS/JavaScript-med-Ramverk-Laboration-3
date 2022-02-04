import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			// Home Route
			name: 'Home',
			component: () => import('./views/HomeView.vue'),
			path: '/'
		},
		{
			// About Route
			name: 'About',
			component: () => import('./views/AboutView.vue'),
			path: '/about'
		},
		{
			// Products Route?
			name: 'Djur',
			component: () => import('./views/DjurView.vue'),
			path: '/djur'
		}
	]
});

router.beforeEach((to, from, next) => {
	//Before each route, updates the title of page to match name attribute of route
	document.title = `${String(to.name)} | Red Mountain Ranch`;
	next();
});

//Exports vue-router
export default router;
