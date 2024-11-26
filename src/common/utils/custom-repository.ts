import { EntityName, Utils } from '@mikro-orm/core';

export const getRepositoryToken = <T>(entity: EntityName<T>) =>
  `${Utils.className(entity)}Repository`;
