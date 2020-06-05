/*
 * @adonisjs/drive
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IocContract } from '@adonisjs/fold'
import { StorageManager } from '@slynova/flydrive'

/**
 * Provider to bind drive to the container
 */
export default class DriveProvider {
	constructor(protected container: IocContract) {}

	/**
	 * Register the drive binding
	 */
	public register() {
		this.container.singleton('Adonis/Addons/Drive', () => {
			const config = this.container.use('Adonis/Core/Config').get('drive', {})
			return new StorageManager(config)
		})
	}
}
