module.exports = {
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    },
  },

  "extends": ["ryym/base-react"],

  "plugins": ["react"],

  "globals": {
    // Replaced by webpack.
    "$$API_ROOT": true,
  },

  "rules": {
    "new-cap": [0, {
      // Exclude Immutable library objects.
      "capIsNewExceptions": [
        "List", "Stack",
        "Map", "OrderedMap",
        "Set", "OrderedSet",
        "Record", "Seq", "Collection",
      ]
    }],

    "no-unused-vars": [2, {
      "ignoreRestSiblings": true,
    }],
  }
}
