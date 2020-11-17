/*
 * @adonisjs/drive
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// @ts-ignore
import { ServiceProvider } from '@adonisjs/fold'
import { StorageManager } from '@slynova/flydrive'

/**
 * Provider to bind drive to the container
 */
class DriveProvider {
	constructor(protected app: any) {}

	/**
	 * Register the drive binding
	 */
	public register() {
		this.app.singleton('Adonis/Addons/Drive', () => {
			const Config = this.app.use('Adonis/Src/Config')
			const config = Config.get('drive', {})
			return new StorageManager(config)
		})
	}
}

export = DriveProvider
