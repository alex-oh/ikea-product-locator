// workaround for `axios_1.default.create does not exist`
// Source: https://github.com/facebook/create-react-app/pull/12021#issuecomment-1108426483
module.exports = {
    webpack: function (config, env) {
      config.module.rules = config.module.rules.map(rule => {
        if (rule.oneOf instanceof Array) {
          rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
        }
        return rule;
      });
      return config;
    },
  }