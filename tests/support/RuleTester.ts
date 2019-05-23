import * as path from 'path';
import { RuleTester as ESLintRuleTester } from 'eslint';
import { TSESLint } from '@typescript-eslint/experimental-utils';

export const RuleTester: TSESLint.RuleTester = ESLintRuleTester as any;
export const TS_CONFIG_PATH = path.join(process.cwd(), 'tests/support/tsconfig.json');