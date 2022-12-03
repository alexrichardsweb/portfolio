import background from './modules/background';

export const state = () => ({
  config: {},
  menuOpen: false,
  menuItems: [],
  openPrograms: [],
  /*
  taskbarPrograms: {},

    Taskbar & Open => show program and taskbar item
    Only taskbar => Minimised
    Only open => show program, no taskbar item
  */
});

export const mutations = {
  SET_MENU_STATUS (state, menuOpen) {
    state.menuOpen = menuOpen;
  },
  SET_MENU_ITEMS (state, menuItems) {
    state.menuItems = menuItems;
  },
  TOGGLE_PROGRAM (state, program) {
    state.openPrograms[program.slug] = !state.openPrograms[program.slug];
  },
  OPEN_PROGRAM (state, program) {
    const programConfig = {
      open: true, // Is shown as window
      taskbar: true, // Is shown on taskbar
      icon: program.icon,
      title: program.title,
      slug: program.slug,
      component: program.title.replace(/\s/g, ``),
      window: program.window,
    };
    state.openPrograms.push(programConfig);
  },
  CLOSE_PROGRAM (state, program) {
    const programIndex = state.openPrograms.findIndex(p => p.slug === program.slug);
    if (programIndex > -1) {
      state.openPrograms.splice(programIndex, 1);
    }
  },
  MINIMISE_PROGRAM (state, program) {
    const programIndex = state.openPrograms.findIndex(p => p.slug === program.slug);
    if (programIndex > -1) {
      state.openPrograms[programIndex].open = false;
    }
  },
  RESTORE_PROGRAM (state, program) {
    const programIndex = state.openPrograms.findIndex(p => p.slug === program.slug);
    console.log(programIndex);
    if (programIndex > -1) {
      state.openPrograms[programIndex].open = true;
    }
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
  setMenuItems ({ commit }, value) {
    commit(`SET_MENU_ITEMS`, value);
  },
  toggleProgram ({ commit }, program) {
    commit(`TOGGLE_PROGRAM`, program);
  },
  openProgram ({ commit, state }, program) {
    if (state.openPrograms.findIndex(p => p.slug === program.slug) > -1) {
      commit(`RESTORE_PROGRAM`, program);
    } else {
      commit(`OPEN_PROGRAM`, program);
    }
  },
  closeProgram ({ commit }, program) {
    commit(`CLOSE_PROGRAM`, program);
  },
  minimiseProgram ({ commit }, program) {
    commit(`MINIMISE_PROGRAM`, program);
  },
  restoreProgram ({ commit }, program) {
    commit(`RESTORE_PROGRAM`, program);
  },
};

export const getters = {
};

export const modules = {
  background,
};
