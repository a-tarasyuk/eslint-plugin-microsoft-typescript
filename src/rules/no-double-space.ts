import { AST_TOKEN_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils';

export default createRule({
  name: 'no-double-space',
  meta: {
    docs: {
      description: ``,
      category: 'Stylistic Issues',
      recommended: 'error',
    },
    messages: {
      noDoubleSpaceError: `Use only one space`,
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],

  create: function (context) {
    const sourceCode = context.getSourceCode();
    const tokensAndComments = sourceCode.tokensAndComments;
    const lines = sourceCode.getLines();
    const validTokens = tokensAndComments.filter(token => (
      token.type === AST_TOKEN_TYPES.RegularExpression || token.type === AST_TOKEN_TYPES.Template || token.type === AST_TOKEN_TYPES.String
    ));
    const hasError = (pos: number) => !validTokens.some(token => token.range[0] <= pos && token.range[1] > pos);

    const checkDoubleSpace = (node: TSESTree.Node) => {
      lines.forEach((line, index) => {
        const firstNonSpace = /\S/.exec(line);
        if (!firstNonSpace || line.includes('@param')) {
          return;
        }

        // Allow common uses of double spaces
        // * To align `=` or `!=` signs
        // * To align comments at the end of lines
        // * To indent inside a comment
        // * To use two spaces after a period
        // * To include aligned `->` in a comment
        const rgx =  /[^/*. ] {2,}[^-!/= ]/g;
        rgx.lastIndex = firstNonSpace.index;
        const doubleSpace = rgx.exec(line);

        if (!doubleSpace) {
          return;
        }

        const pos = lines.slice(0, index)
          .reduce((len, line) => len + 1 + line.length, 0) + doubleSpace.index;

        if (hasError(pos)) {
          context.report({ messageId: 'noDoubleSpaceError', node, loc: { line: index + 1, column: doubleSpace.index + 1 } });
        }
      });
    };

    return {
      Program: checkDoubleSpace,
    };
  },
});
