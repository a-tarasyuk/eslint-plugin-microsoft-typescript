import { RuleTester } from '../support/RuleTester';
import rule from '../../src/rules/no-in-operator';

const ruleTester = new RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-in-operator', rule, {
  valid: [{
    code: `
      const prop = {};
      prop.hasProperty('a');
    `,
  }],

  invalid: [{
    code: `
      const prop = {};
      prop in 'a';
    `,
    errors: [{ messageId: 'noInOperatorError' }],
  }],
});
