/*
 * @adonisjs/drive
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isAbsolute } from 'path'

import { IocContract } from '@adonisjs/fold'
import { StorageManager, StorageManagerConfig, LocalFileSystemStorageConfig } from '@slynova/flydrive'

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
			const Application = this.container.use('Adonis/Core/Application')
			const config: StorageManagerConfig = this.container.use('Adonis/Core/Config').get('drive', {})
			if (config.disks) {
				for (const configElement of Object.values(config.disks)) {
					if (configElement.driver === 'local') {
						const configElementLocal = configElement.config as LocalFileSystemStorageConfig
						configElementLocal.root = isAbsolute(configElementLocal.root)
							? configElementLocal.root
							: Application.makePathFromCwd(configElementLocal.root)
					}
				}
			}
			return new StorageManager(config)
		})
	}
}
