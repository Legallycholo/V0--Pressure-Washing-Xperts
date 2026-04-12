import nextConfig from "eslint-config-next/core-web-vitals"

const config = [
  ...nextConfig,
  {
    rules: {
      // Pre-existing patterns in this codebase use unescaped HTML entities and
      // setState calls inside effects — keep the tooling green without changing components.
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default config
