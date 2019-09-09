/*
 * adonis-drive
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IocContract } from '@adonisjs/fold';

import { StorageManager } from '@slynova/flydrive';

export default class DriveProvider {
  private $container: IocContract;

  public constructor(container: IocContract) {
    this.$container = container;
  }

  register() {
    this.$container.singleton('Drive', () => {
      const config = this.$container.use('Adonis/Src/Config').get('drive');
      const flyDriverInstance = new StorageManager(config);
      return flyDriverInstance;
    });
  }
}
