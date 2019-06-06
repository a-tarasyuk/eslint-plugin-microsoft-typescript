import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils';

type MessageId = 'onlyArrowFunctionsError';
type Options = [{
  allowNamedFunctions?: boolean;
  allowDeclarations?: boolean;
}];

export default createRule<Options, MessageId>({
  name: 'only-arrow-functions',
  meta: {
    docs: {
      description: `Disallows traditional (non-arrow) function expressions.`,
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      onlyArrowFunctionsError: 'non-arrow functions are forbidden',
    },
    schema: [{
      additionalProperties: false,
      properties: {
        allowNamedFunctions: { type: 'boolean' },
        allowDeclarations: { type: 'boolean' },
      },
      type: 'object',
    }],
    type: 'suggestion',
  },
  defaultOptions: [{
    allowNamedFunctions: false,
    allowDeclarations: false,
  }],

  create: function (context, [{ allowNamedFunctions, allowDeclarations }]) {

    const isThisParameter = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => (
      node.params.length && !!node.params.find(param => param.type === AST_NODE_TYPES.Identifier && param.name === 'this')
    );

    const shouldIgnore = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => {
      const parent = node.parent;
      if (!parent) {
        return false;
      }

      return node.type === AST_NODE_TYPES.FunctionExpression
        && (parent.type === AST_NODE_TYPES.Property || parent.type === AST_NODE_TYPES.MethodDefinition);
    }

    const stack: boolean[] = [];
    const enterFunction = () => {
      stack.push(false);
    };

    const markThisUsed = () => {
      if (stack.length) {
        stack[stack.length - 1] = true;
      }
    };

    const exitFunction = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => {
      const methodUsesThis = stack.pop();

      if (node.type === AST_NODE_TYPES.FunctionDeclaration && allowDeclarations) {
        return;
      }

      if ((allowNamedFunctions && node.id !== null) || shouldIgnore(node)) {
        return;
      }

      if (!(node.generator || methodUsesThis || isThisParameter(node))) {
        context.report({ messageId: 'onlyArrowFunctionsError', node });
      }
    };

    return {
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      ThisExpression: markThisUsed,
    }
  },
});
