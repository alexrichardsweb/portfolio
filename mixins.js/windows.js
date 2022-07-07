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
    closeProgram (program) {
      const toClose = typeof program === `string`
        ? { slug: program }
        : program;
      this.$store.dispatch(`closeProgram`, toClose);
    },
    getImage (image, type) {
      return require(`~/assets/backgrounds/${type}/${image.replace(/\s/g, ``)}.png`);
    },
  },
};
