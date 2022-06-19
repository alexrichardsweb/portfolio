
import consts from './includes/const';

export default {
  methods: {
    // ======================================
    // STRING METHODS
    // ======================================
    /*
    *  Convert string to kebab-case to use as page slugs and Vue component IDs
    */
    slugify (text) {
      return text.replace(/[^A-Za-z0-9\s_]/g, ``)
        .replace(/[_\s]/g, `-`)
        .replace(`/-+/`, `-`, this)
        .toLowerCase();
    },
    /*
    *  Convert string to array of words
    */
    splitTitle (title) {
      return title.split(` `);
    },
    /*
    *  Capitalise every word in a string
    */
    capitalise (text) {
      const textArr = text.split(` `);
      const capitalised = textArr.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      return capitalised.join(` `);
    },
    /*
    *  Extract substring from between two other substrings
    *  e.g. extractString(iframeString, `src="`, `"`) would return the src URL of an iframe
    */
    extractString (text, start, end) {
      return text.split(start)[1].split(end)[0];
    },
    // ======================================
    // NUMBER METHODS
    // ======================================
    /*
    *  Get ordinal of number e.g. st, nd, rd, th
    */
    ordinal (num) {
      const number = parseInt(num);
      return `${num}${[`st`, `nd`, `rd`][((number + 90) % 100 - 10) % 10 - 1] || `th`}`;
    },
    /*
    *  Get compact number e.g. 123456 => 123K, 1234.56 => 1.2K
    */
    compactNumber (number) {
      return consts.COMPACT_NUMBER_FORMATTER.format(number);
    },

    // ======================================
    // ARRAY/OBJECT METHODS
    // ======================================
    /*
    *  Split data into pages; nested arrays with set maximum lengths
    */
    paginateData (data, perPage) {
      const pages = [];
      for (let i = 0; i < data.length; i += perPage) {
        pages.push(data.slice(i, i + perPage));
      }
      return pages;
    },
    /*
    *  Remove falsey values from array: false, undefined, null, '', 0, NaN
    */
    declutter (data) {
      const result = [];
      for (const value of data) {
        if (value) {
          result.push(value);
        }
      }
      return result;
    },
    /*
    *  Remove primitive values or objects from an array, the selected values must be as an array e.g. [6], ['a'], [object]
    */
    removeFromArray (data, remove = []) {
      const result = [];
      for (const value of data) {
        if (!remove.includes(value)) {
          result.push(value);
        }
      }
      return result;
    },
    /*
    * Get object value by string path e.g. 'country.id'
    */
    resolveObjectPath (data, path) {
      return path.split(`.`).reduce((a, v) => a[v], data);
    },
    /*
    *  Sort a nested array by string, use dot notation e.g. 'country.name'
    */
    sortNestedString (data, sortBy, order = `asc`) {
      return order === `asc`
        ? data.sort((a, b) => this.resolveObjectPath(a, sortBy).localeCompare(this.resolveObjectPath(b, sortBy)))
        : data.sort((a, b) => this.resolveObjectPath(b, sortBy).localeCompare(this.resolveObjectPath(a, sortBy)));
    },
    /*
    *  Sort a nested array by number, use dot notation e.g. 'country.info.points'
    */
    sortNestedNumber (data, sortBy, order = `asc`) {
      return order === `asc`
        ? data.sort((a, b) => parseFloat(this.resolveObjectPath(a, sortBy)) - parseFloat(this.resolveObjectPath(b, sortBy)))
        : data.sort((a, b) => parseFloat(this.resolveObjectPath(b, sortBy)) - parseFloat(this.resolveObjectPath(a, sortBy)));
    },
    /*
    *  Group array items by key values
    */
    groupBy (array, key) {
      return array.reduce((group, element) => {
        const keyValue = element[key];
        return {
          ...group, [keyValue]: [...(group[keyValue] ?? []), element],
        };
      }, {
      });
    },

    // ======================================
    // STYLING METHODS
    // ======================================
    /*
    *  Get image position set in the post, defaults to centre
    */
    getImagePosition (post) {
      return post.acf && post.acf.featured_image_position
        ? post.acf.featured_image_position
        : `center center`;
    },
    /*
    *  Convert hex colour to {r, g, b}
    */
    hexToRGB (hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
        : null;
    },
    /*
    *  Get text colour based on the background
    */
    getTextColour (backgroundClass) {
      return [`bg-grey200`, `bg-grey100`, `bg-white`].includes(backgroundClass) ? `c-black` : `c-white`;
    },
    getTextHoverColour (backgroundClass) {
      return [`bg-grey200`, `bg-grey100`, `bg-white`].includes(backgroundClass) ? `hover-c-primary` : `hover-c-grey200`;
    },

    // ======================================
    // DATE METHODS
    // ======================================
    /*
    *  Get date from date/time string or object
    */
    getDate (date, format = `Do MMMM`) {
      return this.$moment(date).format(format);
    },
    /*
    *  Get local time from date/time string or object
    */
    getLocalTime (date, format = `hh:mm A`) {
      return this.$moment(date).local()
        .format(format);
    },
    /*
    *  Get readable relative date in user's language e.g. '1 hour ago', 'last week'
    */
    relativeDate (toDate, fromDate = new Date()) {
      let duration = (toDate - fromDate) / 1000;

      for (let i = 0; i <= consts.DIVISIONS.length; i++) {
        const division = consts.DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
          return consts.RELATIVE_DATE_FORMATTER.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
      }
    },
    // ======================================
    // DOM METHODS
    // ======================================
    /*
    *  Query Selector
    */
    domQs (selector, parent = document) {
      return parent.querySelector(selector);
    },
    /*
    *  Query Selector All, converted from nodelist to array
    */
    domQsa (selector, parent = document) {
      return [...parent.querySelectorAll(selector)];
    },
    /*
    *  Get the current language name based on the slug
    */
    getLangName (slug) {
      const lang = this.$store.state.language.languages
        .find(language => language.slug === slug);
      return lang ? lang.name : false;
    },
    // ======================================
    // MISC. METHODS
    // ======================================
    /*
    *   Get flag SVG by country code, run function with no country code to get placeholder
    */
    getFlag (countryCode) {
      return countryCode
        ? `${process.env.flagUrls.square}/${countryCode}.svg`
        : `${process.env.flagUrls.round}/placeholder-flag.svg`;
    },
    /*
    *   Use with @error on flag images to use placeholder when flag isn't available
    */
    flagFallback (e) {
      e.target.src = this.getFlag();
    },
    /*
    *  Get taxonomy data; returns all data or single data by key
    */
    getTaxonomies (meta, key = false, single = false) {
      const taxonomies = window.PHPUnserialize.unserialize(meta.sotic_sailing[0]);
      if (key && single) {
        return taxonomies[key][0];
      }
      return key ? taxonomies[key] : taxonomies;
    },
    /*
    *  Run function after specific time using .sleep(500).then(function);
    */
    sleep (duration) {
      return new Promise(resolve => {
        setTimeout(resolve, duration);
      });
    },
    /*
    *  Output a group of console commands, useful for logging related data to console
    */
    consoleGroup (items = [], name = `Group`, type = `log`) {
      console.group(name);
      for (const item of items) {
        console[type](item);
      }
      console.groupEnd(name);
    },
  },
  mounted () {
    // Testing here
  },
};
