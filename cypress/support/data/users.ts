// SauceDemo and Restful-Booker users for each environment. QA is real. The rest are made up.

type Credentials = {
  username: string;
  password: string;
};

type SauceDemoUsers = {
  standard: Credentials;
  lockedOut: Credentials;
  problem: Credentials;
  performanceGlitch: Credentials;
  error: Credentials;
  visual: Credentials;
};

export class EnvironmentUsers {
  readonly ui: Credentials;

  constructor(
    readonly sauceDemo: SauceDemoUsers,
    readonly api: Credentials,
  ) {
    this.ui = sauceDemo.standard;
  }
}

const qaPassword = 'secret_sauce';

export const users = {
  qa: new EnvironmentUsers(
    {
      standard: { username: 'standard_user', password: qaPassword },
      lockedOut: { username: 'locked_out_user', password: qaPassword },
      problem: { username: 'problem_user', password: qaPassword },
      performanceGlitch: { username: 'performance_glitch_user', password: qaPassword },
      error: { username: 'error_user', password: qaPassword },
      visual: { username: 'visual_user', password: qaPassword },
    },
    { username: 'admin', password: 'password123' },
  ),
  dev: new EnvironmentUsers(
    {
      standard: { username: 'dev_standard_user', password: 'secret_sauce_dev' },
      lockedOut: { username: 'dev_locked_out_user', password: 'secret_sauce_dev' },
      problem: { username: 'dev_problem_user', password: 'secret_sauce_dev' },
      performanceGlitch: { username: 'dev_performance_glitch_user', password: 'secret_sauce_dev' },
      error: { username: 'dev_error_user', password: 'secret_sauce_dev' },
      visual: { username: 'dev_visual_user', password: 'secret_sauce_dev' },
    },
    { username: 'dev_admin', password: 'password123_dev' },
  ),
  sandbox: new EnvironmentUsers(
    {
      standard: { username: 'sandbox_standard_user', password: 'secret_sauce_sandbox' },
      lockedOut: { username: 'sandbox_locked_out_user', password: 'secret_sauce_sandbox' },
      problem: { username: 'sandbox_problem_user', password: 'secret_sauce_sandbox' },
      performanceGlitch: { username: 'sandbox_performance_glitch_user', password: 'secret_sauce_sandbox' },
      error: { username: 'sandbox_error_user', password: 'secret_sauce_sandbox' },
      visual: { username: 'sandbox_visual_user', password: 'secret_sauce_sandbox' },
    },
    { username: 'sandbox_admin', password: 'password123_sandbox' },
  ),
  stage: new EnvironmentUsers(
    {
      standard: { username: 'stage_standard_user', password: 'secret_sauce_stage' },
      lockedOut: { username: 'stage_locked_out_user', password: 'secret_sauce_stage' },
      problem: { username: 'stage_problem_user', password: 'secret_sauce_stage' },
      performanceGlitch: { username: 'stage_performance_glitch_user', password: 'secret_sauce_stage' },
      error: { username: 'stage_error_user', password: 'secret_sauce_stage' },
      visual: { username: 'stage_visual_user', password: 'secret_sauce_stage' },
    },
    { username: 'stage_admin', password: 'password123_stage' },
  ),
};
