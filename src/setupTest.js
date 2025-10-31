import '@testing-library/jest-dom';

// Optional: Extend Vitest expect dengan testing-library matchers
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);