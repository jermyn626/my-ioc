import 'reflect-metadata';
import { MODULE_METADATA_KEY } from './decorators/module';

const container = new Map<string, any>();

function resolveInstance(cls: any) {
  if (container.has(cls.name)) {
    return container.get(cls.name);
  }

  let dependencies: any[] = [];
  const params = Reflect.getMetadata('design:paramtypes', cls);
  if (params) {
    // console.log(`design:paramtypes for ${cls.name}:`, params);
    dependencies = params.map((cls: any) => resolveInstance(cls));
  }
  const ins = new cls(...dependencies);
  container.set(cls.name, ins);
  return ins;
}

export function bootstrap(module: any) {
  const moduleMetadata = Reflect.getMetadata(MODULE_METADATA_KEY, module);
  let service, controller;
  if (moduleMetadata?.service) {
    service = resolveInstance(moduleMetadata.service);
  }
  if (moduleMetadata?.controller) {
    controller = resolveInstance(moduleMetadata.controller);
  }

  console.log('\nafter bootstrap:', service, controller, container);
}
