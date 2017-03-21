module.exports = {
  "parserOptions": {
    "ecmaVersion": 2017
  },

  "extends": ["ryym/base-react"],

  "plugins": ["react"],

  "rules": {
    "new-cap": [0, {
      // Exclude Immutable library objects.
      "capIsNewExceptions": [
        "List", "Stack",
        "Map", "OrderedMap",
        "Set", "OrderedSet",
        "Record", "Seq", "Collection",
      ]
    }]
  }
}
