import * as jestDomMatchers from '@testing-library/jest-dom/matchers'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(jestDomMatchers)
expect.extend(toHaveNoViolations)
