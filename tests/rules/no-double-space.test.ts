import { RuleTester } from '../support/RuleTester';
import rule from '../../src/rules/no-double-space';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {},
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-double-space', rule, {
  valid: [{
    code: `const a = {};`,
  }, {
    code: `function fn() {}`,
  }, {
    code: `class Cl {}`,
  }, {
    code: `// comment `,
  }, {
    code: `/* comment */`,
  }, {
    code: `"  string  ";`,
  }, {
    code: `/  regexp  /g;`,
  }, {
    code: `const rgx = /  regexp  /g;`,
  }, {
    code: 'const str = ` string template`;',
  }, {
    code: `  // comment`,
  }, {
    code: `   /* comment */`,
  }, {
    code: `
const a =
  1;
    `,
  }, {
    code: `
/**
 * comment
 */
    `,
  }],

  invalid: [{
    code: `const  a  = {};`,
    errors: [{ messageId: 'noDoubleSpaceError' }, { messageId: 'noDoubleSpaceError' }],
  }, {
    code: `function   fn() {}`,
    errors: [{ messageId: 'noDoubleSpaceError' }],
  }, {
    code: `class   Cl  {}`,
    errors: [{ messageId: 'noDoubleSpaceError' }, { messageId: 'noDoubleSpaceError' }],
  }, {
    code: 'const str =  ` string template`;',
    errors: [{ messageId: 'noDoubleSpaceError' }],
  }, {
    code: `const rgx  = /  regexp  /g;`,
    errors: [{ messageId: 'noDoubleSpaceError' }],
  }, {
    code: `/** comment  */`,
    errors: [{ messageId: 'noDoubleSpaceError' }],
  }, {
    code: `/** comment  with   many spaces   */`,
    errors: [{ messageId: 'noDoubleSpaceError' }],
  }],
});
