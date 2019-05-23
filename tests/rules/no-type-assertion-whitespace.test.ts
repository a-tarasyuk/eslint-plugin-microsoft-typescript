import { RuleTester } from '../support/RuleTester';
import rule from '../../src/rules/no-type-assertion-whitespace';

const ruleTester = new RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-type-assertion-whitespace', rule, {
  valid: [{
    code: `const a = <number>1`,
  }],

  invalid: [{
    code: `const a = <number> 1`,
    errors: [{ messageId: 'noTypeAssertionWhitespace' }],
  }, {
    code: `const a = <number>  1`,
    errors: [{ messageId: 'noTypeAssertionWhitespace' }],
  }, {
    code: `const a = <number>                1`,
    errors: [{ messageId: 'noTypeAssertionWhitespace' }],
  }],
});
