/*
 * @adonisjs/drive
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isAbsolute } from 'path'

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { StorageManager, StorageManagerConfig, LocalFileSystemStorageConfig } from '@slynova/flydrive'

/**
 * Provider to bind drive to the container
 */
export default class DriveProvider {
	constructor(protected app: ApplicationContract) {}

	/**
	 * Register the drive binding
	 */
	public register() {
		this.app.container.singleton('Adonis/Addons/Drive', () => {
			const config: StorageManagerConfig = this.app.config.get('drive', {})
			if (config.disks) {
				for (const configElement of Object.values(config.disks)) {
					if (configElement.driver === 'local') {
						const configElementLocal = configElement.config as LocalFileSystemStorageConfig
						configElementLocal.root = isAbsolute(configElementLocal.root)
							? configElementLocal.root
							: this.app.makePath(configElementLocal.root)
					}
				}
			}
			return new StorageManager(config)
		})
	}
}
