import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "./",
  false,
  /[A-Z]\w+\.(vue|js)$/,
  "lazy"
);

requireComponent.keys().forEach((fileName) => {
  requireComponent(fileName).then((componentConfig) => {
    const componentName = upperFirst(
      camelCase(
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
      )
    );

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
});
