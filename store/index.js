export const state = () => ({
  config: {},
  menuOpen: false,
});

export const mutations = {
  SET_MENU_STATUS (state, menuOpen) {
    state.menuOpen = menuOpen;
  },
};

export const actions = {
  /* nuxtServerInit ({ commit }, context) {
    return context.$axios.get(`${process.env.baseUrl}/options?id=options`).then(response => {
      commit(`SAVE_OPTIONS`, response.data.data);
    });
  }, */
  setMenuStatus ({ commit }, value) {
    commit(`SET_MENU_STATUS`, value);
  },
};

export const getters = {
};

export const modules = {
};
