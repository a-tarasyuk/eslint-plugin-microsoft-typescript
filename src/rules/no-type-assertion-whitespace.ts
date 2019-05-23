import { TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils';

export default createRule({
  name: 'no-type-assertion-whitespace',
  meta: {
    docs: {
      description: ``,
      category: 'Stylistic Issues',
      recommended: 'error',
    },
    messages: {
      noTypeAssertionWhitespace: `Excess trailing whitespace found around type assertion`,
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],

  create: function (context) {
    const checkTypeAssertionWhitespace = (node: TSESTree.TSTypeAssertion) => {
      const leftSideWhitespaceStart = node.typeAnnotation.range[1] + 1;
      const rightSideWhitespaceEnd = node.expression.range[0];
      const startLine = node.loc.start.line;
      const endLine = node.loc.end.line;

      if (leftSideWhitespaceStart !== rightSideWhitespaceEnd) {
        context.report({
          messageId: 'noTypeAssertionWhitespace',
          node,
          loc: {
            start: { column: leftSideWhitespaceStart, line: startLine },
            end: { column: rightSideWhitespaceEnd, line: endLine },
          },
        });
      }
    }

    return {
      TSTypeAssertion: checkTypeAssertionWhitespace,
    };
  },
});
