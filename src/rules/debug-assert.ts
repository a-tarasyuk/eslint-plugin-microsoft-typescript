import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils';

export default createRule({
  name: 'debug-assert',
  meta: {
    docs: {
      description: ``,
      category: 'Possible Errors',
      recommended: 'error',
    },
    messages: {
      secondArgumentDebugAssertError: `Second argument to 'Debug.assert' should be a string literal`,
      thirdArgumentDebugAssertError: `Third argument to 'Debug.assert' should be a string literal or arrow function`,
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],

  create: function (context) {
    const isString = (node: TSESTree.Node): boolean => node.type === AST_NODE_TYPES.Literal && typeof node.value === 'string';

    const isDebugAssert = (node: TSESTree.MemberExpression): boolean => (
      node.object.type === AST_NODE_TYPES.Identifier
        && node.object.name === 'Debug'
        && node.property.type === AST_NODE_TYPES.Identifier
        && node.property.name === 'assert'
    );

    const checkDebugAssert = (node: TSESTree.CallExpression) => {
      const args = node.arguments;
      const argsLen = args.length;
      if (!(node.callee.type == AST_NODE_TYPES.MemberExpression && isDebugAssert(node.callee)) || argsLen < 2) {
        return;
      }

      const message1Node = args[1];
      if (message1Node && !isString(message1Node)) {
        context.report({ messageId: 'secondArgumentDebugAssertError', node: message1Node });
      }

      if (argsLen < 3) {
        return;
      }

      const message2Node = args[2];
      if (message2Node && (!isString(message2Node) && message2Node.type !== AST_NODE_TYPES.ArrowFunctionExpression)) {
        context.report({ messageId: 'thirdArgumentDebugAssertError', node: message2Node });
      }
    };

    return {
      CallExpression: checkDebugAssert,
    };
  },
});
