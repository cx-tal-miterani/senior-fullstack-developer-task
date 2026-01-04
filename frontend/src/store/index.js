import { createStore } from "vuex"
import axios from "axios";

export default createStore({
	state: {
		user: null,
	},
	getters: {
		roles: (state) => state.user?.roles || [],
		status: (state) => state.user?.status || null,
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
	},
	actions: {
		async getUser({ commit }, userData) {
			try {
				const response = await axios.post(`/api/users/login/${userData}`)
				if (response.data) {
					commit("setUser", response.data)
				}
			} catch (error) {
				console.error("Error fetching user data:", error)
				throw error
			}
		}
	},
})
