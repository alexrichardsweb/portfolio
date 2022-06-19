import { mixin as clickaway } from 'vue-clickaway';
export default {
  mixins: [clickaway],
  computed: {
    menuOpen () {
      return this.$store.state?.menuOpen;
    },
  },
  methods: {
    closeMenu () {
      this.$store.dispatch(`setMenuStatus`, false);
    },
    icon (icon) {
      const filetype = icon === `windows` ? `png` : `svg`;
      return require(`~/assets/icons/windows/${icon}.${filetype}`);
    },
  },
};
