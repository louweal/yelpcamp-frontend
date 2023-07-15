export const state = () => ({
  user: undefined,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};
