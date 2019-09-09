declare module '@ioc:Drive' {
  import { StorageManager, StorageManagerConfig } from '@slynova/flydrive';

  export { StorageManagerConfig as DriveConfig };

  const manager: StorageManager;
  export default manager;
}
