{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base", ":automergeMinor"],
  "kubernetes": {
    "fileMatch": ["\\.yaml$"]
  },
  "includeForks": true,
  "labels": ["dependencies"],
  "packageRules": [
    {
      "matchDatasources": ["docker"],
      "addLabels": ["docker"]
    },
    {
      "matchManagers": ["composer"],
      "addLabels": ["composer"]
    },
    {
      "matchUpdateTypes": ["major"],
      "addLabels": ["major"]
    },
    {
      "matchUpdateTypes": ["minor"],
      "addLabels": ["minor"]
    },
    {
      "matchUpdateTypes": ["patch"],
      "addLabels": ["patch"]
    }
  ],
  "js": {
    "addLabels": ["yarn"]
  }
}
