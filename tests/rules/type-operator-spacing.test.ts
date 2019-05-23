import { RuleTester } from '../support/RuleTester';
import rule from '../../src/rules/type-operator-spacing';

const ruleTester = new RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  parser: '@typescript-eslint/parser',
});

ruleTester.run('type-operator-spacing', rule, {
  valid: [{
    code: `type T = string | number`,
  }, {
    code: `type T = string & number`,
  }, {
    code: `function fn(): string | number {}`,
  }, {
    code: `function fn(): string & number {}`,
  }],

  invalid: [{
    code: `type T = string|number`,
    errors: [{ messageId: 'typeOperatorSpacingError' }],
  }, {
    code: `type T = string&number`,
    errors: [{ messageId: 'typeOperatorSpacingError' }],
  }, {
    code: `function fn(): string|number {}`,
    errors: [{ messageId: 'typeOperatorSpacingError' }],
  }, {
    code: `function fn(): string&number {}`,
    errors: [{ messageId: 'typeOperatorSpacingError' }],
  }],
});
