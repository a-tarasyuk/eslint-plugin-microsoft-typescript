import { RuleTester } from '../support/RuleTester';
import rule from '../../src/rules/no-keywords';

const ruleTester = new RuleTester({
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-keywords', rule, {
  valid: [{
    code: `const a = {};`,
  }, {
    code: `function a() {};`,
  }, {
    code: `const x = function string() {};`,
  }, {
    code: `const y = function () {};`,
  }, {
    code: `const y = () => {};`,
  }, {
    code: `
      class A {
        b = () => {}
        a() {}
        number() {}
      }
    `,
  }, {
    code: `
      interface A {
        b(): void;
      }
    `,
  }, {
    code: `
      const obj = {
        a: null,
        b() {},
        c: function (c: number) {},
        string: function d (d: string) {},
        e: () => {},
      };
    `,
  }],

  invalid: [{
    code: `const number = 1;`,
    errors: [{ messageId: 'noKeywordsError' }],
  }, {
    code: `function x(number: number) {};`,
    errors: [{ messageId: 'noKeywordsError' }],
  }, {
    code: `const y = function (number: number) {};`,
    errors: [{ messageId: 'noKeywordsError' }],
  }, {
    code: `const y = (number: number) => {};`,
    errors: [{ messageId: 'noKeywordsError' }],
  }, {
    code: `
      class A {
        b = function (any: any) {};
        a(number: number) {}
      }
    `,
    errors: [{ messageId: 'noKeywordsError' }, { messageId: 'noKeywordsError' }],
  }, {
    code: `
      interface A {
        a(number: number): void;
        b: (any: any) => void;
      }
    `,
    errors: [{ messageId: 'noKeywordsError' }, { messageId: 'noKeywordsError' }],
  }],
});
