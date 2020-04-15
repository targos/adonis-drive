import { isAbsolute } from 'path';

import { IocContract } from '@adonisjs/fold';
import {
  StorageManager,
  StorageManagerConfig,
  LocalFileSystemConfig,
} from '@slynova/flydrive';

export default class DriveProvider {
  private $container: IocContract;

  public constructor(container: IocContract) {
    this.$container = container;
  }

  register() {
    this.$container.singleton('Drive', () => {
      const Application = this.$container.use('Adonis/Core/Application');
      const config: StorageManagerConfig = this.$container
        .use('Adonis/Core/Config')
        .get('drive');
      if (config.disks) {
        for (const configElement of Object.values(config.disks)) {
          if (configElement.driver === 'local') {
            // @ts-ignore
            const configElementLocal = configElement as LocalFileSystemConfig;
            configElementLocal.root = isAbsolute(configElementLocal.root)
              ? configElementLocal.root
              : Application.makePathFromCwd(configElementLocal.root);
          }
        }
      }
      const flyDriverInstance = new StorageManager(config);
      return flyDriverInstance;
    });
  }
}
