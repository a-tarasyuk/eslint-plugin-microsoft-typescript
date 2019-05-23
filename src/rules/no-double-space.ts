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
    const sourceCodeText = sourceCode.getText();
    const tokensAndComments = sourceCode.tokensAndComments;
    const tokensAndCommentsLen = tokensAndComments.length;
    const DOUBLE_SPACE = '  ';
    const PARAM = '@param';
    const isComment = (token: TSESTree.Token | TSESTree.Comment) => token.type === AST_TOKEN_TYPES.Block || token.type === AST_TOKEN_TYPES.Line;

    const shouldSkipToken = (token: TSESTree.Token | TSESTree.Comment, leftIndex: number) => (
      leftIndex === tokensAndCommentsLen - 1
        || token.type === AST_TOKEN_TYPES.RegularExpression
        || token.type === AST_TOKEN_TYPES.Template
        || token.type === AST_TOKEN_TYPES.String
    );

    const checkSoubleSpace = () => {
      tokensAndComments.forEach((leftToken, leftIndex) => {
        if (isComment(leftToken)) {
          const [start, end] = leftToken.range;
          const comment = sourceCodeText.slice(start, end);

          if (comment.includes(PARAM)) {
            return;
          }

          const column = comment.indexOf(DOUBLE_SPACE);
          if (column >= 0) {
            context.report({
              messageId: 'noDoubleSpaceError',
              node: leftToken,
              loc: { line: leftToken.loc.start.line, column },
            });
          }

          return;
        }

        const rightToken = tokensAndComments[leftIndex + 1];
        if (shouldSkipToken(leftToken, leftIndex) || leftToken.loc.start.line < rightToken.loc.end.line) {
          return;
        }

        const tokenText = sourceCodeText.slice(leftToken.range[1], rightToken.range[0]);
        if (tokenText.includes(DOUBLE_SPACE)) {
          context.report({
            messageId: 'noDoubleSpaceError',
            node: rightToken,
            loc: { column: rightToken.loc.start.column - 1, line: rightToken.loc.start.line },
          });
        }
      });
    };

    return {
      Program: checkSoubleSpace,
    };
  },
});
