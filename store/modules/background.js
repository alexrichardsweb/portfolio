export default {
  state: () => ({
    backgrounds: [], // Available background
    activeBackground: { // Active background
      wallpaper: ``,
      pattern: ``,
      display: `tile`,
    },
    transparentMenuItems: true,
  }),

  mutations: {
    SET_BACKGROUNDS (state, backgrounds) {
      state.backgrounds = backgrounds;
    },
    SET_BACKGROUND (state, background) {
      state.activeBackground = background;
    },
    SET_TRANSPARENCY (state, transparent) {
      state.transparentMenuItems = transparent;
    },
  },
  actions: {
    setBackgrounds ({ commit }, backgrounds) {
      commit(`SET_BACKGROUNDS`, backgrounds);
    },
    setBackground ({ commit }, background) {
      commit(`SET_BACKGROUND`, background);
    },
    setMenuItemTransparency ({ commit }, transparent) {
      commit(`SET_TRANSPARENCY`, transparent);
    },
  },
  getters: {
  },
};
