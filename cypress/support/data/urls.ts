// UI and API addresses for qa, dev, sandbox, and stage. QA is the default.

export const urls = {
  ui: {
    qa: 'https://www.saucedemo.com',
    dev: 'https://dev.saucedemo.com',
    sandbox: 'https://sandbox.saucedemo.com',
    stage: 'https://stage.saucedemo.com',
  },
  api: {
    qa: 'https://restful-booker.herokuapp.com',
    dev: 'https://dev.restful-booker.herokuapp.com',
    sandbox: 'https://sandbox.restful-booker.herokuapp.com',
    stage: 'https://stage.restful-booker.herokuapp.com',
  },
};

export type EnvironmentName = keyof typeof urls.ui;

export function resolveEnvironment(name: string | undefined): EnvironmentName {
  const selected = name || 'qa';

  if (!(selected in urls.ui) || !(selected in urls.api)) {
    throw new Error(`Unknown environment "${selected}". Use ${Object.keys(urls.ui).join(', ')}.`);
  }

  return selected as EnvironmentName;
}

export function environmentUrls(name: EnvironmentName): { ui: string; api: string } {
  return {
    ui: urls.ui[name],
    api: urls.api[name],
  };
}
