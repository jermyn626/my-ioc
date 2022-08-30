import 'reflect-metadata';

export const MODULE_METADATA_KEY = 'module_meta_data';

export function module(moduleMetadata: any): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MODULE_METADATA_KEY, moduleMetadata, target);
  };
}
