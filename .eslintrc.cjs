module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-eval': ['error'],
        'no-var': ['error'],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        eqeqeq: ['error', 'always'],
    },
};
