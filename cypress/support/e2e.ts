// Loads the reporter, Testing Library, and the custom commands before every spec.

import 'cypress-mochawesome-reporter/register';
import '@testing-library/cypress/add-commands';
import { configure } from '@testing-library/cypress';
import './commands';

configure({ testIdAttribute: 'data-test' });
