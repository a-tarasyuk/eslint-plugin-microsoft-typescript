import objectLiteralSurroundingSpace from './object-literal-surrounding-space';
import noTypeAssertionWhitespace from './no-type-assertion-whitespace';
import typeOperatorSpacing from './type-operator-spacing';
import onlyArrowFunctions from './only-arrow-functions';
import booleanTrivia from './boolean-trivia';
import noDoubleSpace from './no-double-space';
import noInOperator from './no-in-operator';
import debugAssert from './debug-assert';
import noKeywords from './no-keywords';

export default {
  'object-literal-surrounding-space': objectLiteralSurroundingSpace,
  'no-type-assertion-whitespace': noTypeAssertionWhitespace,
  'type-operator-spacing': typeOperatorSpacing,
  'only-arrow-functions': onlyArrowFunctions,
  'no-double-space': noDoubleSpace,
  'boolean-trivia': booleanTrivia,
  'no-in-operator': noInOperator,
  'debug-assert': debugAssert,
  'no-keywords': noKeywords,
};
