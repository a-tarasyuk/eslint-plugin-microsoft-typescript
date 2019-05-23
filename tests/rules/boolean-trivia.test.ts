import { RuleTester, TS_CONFIG_PATH } from '../support/RuleTester';
import rule from '../../src/rules/boolean-trivia';

const ruleTester = new RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {},
    ecmaVersion: 6,
    sourceType: 'module',
    project: TS_CONFIG_PATH,
  },
  parser: '@typescript-eslint/parser',
});

ruleTester.run('boolean-trivia', rule, {
  valid: [{
    code: `
      const fn = (prop: boolean) => {};
      fn(/* boolean prop */ true);
    `,
  }, {
    code: `
      const fn = (prop: null) => {};
      fn(/* null prop */ null);
    `,
  }, {
    code: `
      const fn = (prop: null) => {};
      fn(/*null prop*/ null);
    `,
  }, {
    code: `
      const fn = (prop: boolean) => {};
      fn(/* comment */
        false
      );
    `,
  }, {
    code: `
      const fn = (prop: boolean) => {};
      fn.apply(null, true);
    `,
  }],

  invalid: [{
    code: `
      const fn = (prop: null) => {};
      fn(null);
    `,
    errors: [{ messageId: 'booleanTriviaArgumentError' }],
  }, {
    code: `
      const fn = (prop: boolean) => {};
      fn(false);
    `,
    errors: [{ messageId: 'booleanTriviaArgumentError' }],
  }, {
    code: `
      const fn = (prop: boolean) => {};
      fn(/* boolean arg */false);
    `,
    errors: [{ messageId: 'booleanTriviaArgumentSpaceError' }],
  }, {
    code: `
      const fn = (prop: boolean) => {};
      fn(/* first comment */ /* second comment */ false);
    `,
    errors: [{ messageId: 'booleanTriviaArgumentError' }],
  }],
});
