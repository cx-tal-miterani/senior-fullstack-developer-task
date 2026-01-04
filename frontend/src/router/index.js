import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import store from "../store"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true, roles: ["Admin"] },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true, roles: ["Editor", "Admin"] },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const userRoles = store.getters.roles

	if (to.meta.requiresAuth && !store.state.user) {
		next("/")
	} else if (to.meta.roles && !to.meta.roles.some((role) => userRoles.includes(role))) {
		next("/home")
	} else {
		next()
	}
})

export default router
