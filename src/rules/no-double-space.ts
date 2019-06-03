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

    const checkDoubleSpaceInComment = (comment: string, token: TSESTree.Token | TSESTree.Comment) => {
      const firstNonSpace = /\S/.exec(comment);
      if (!firstNonSpace) {
        return;
      }

      const rgx = /[^/*. ]  [^-!/= ]/g;
      rgx.lastIndex = firstNonSpace.index;
      const doubleSpace = rgx.exec(comment);

      if (doubleSpace && !comment.includes(PARAM)) {
        context.report({
          messageId: 'noDoubleSpaceError',
          node: token,
          loc: { line: token.loc.start.line, column: doubleSpace.index + 1 },
        });
      }
    };

    const checkDoubleSpace = () => {
      tokensAndComments.forEach((leftToken, leftIndex) => {
        if (isComment(leftToken)) {
          const [start, end] = leftToken.range;

          sourceCodeText.slice(start, end).split('\n')
            .forEach(comment => checkDoubleSpaceInComment(comment, leftToken));

          return;
        }

        const rightToken = tokensAndComments[leftIndex + 1];
        if (shouldSkipToken(leftToken, leftIndex) || isComment(rightToken) || leftToken.loc.start.line < rightToken.loc.end.line) {
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
      Program: checkDoubleSpace,
    };
  },
});
