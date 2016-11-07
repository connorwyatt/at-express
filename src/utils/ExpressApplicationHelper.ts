import {Application} from '@types/express';
import * as Express from 'express';
import {Router} from 'express';
import {IRequestHandlerConfig} from '../interfaces/IRequestHandlerConfig';
import {IRouterConfig} from '../interfaces/IRouterConfig';

let expressApplicationHelperInstance: ExpressApplicationHelper;

export class ExpressApplicationHelper {
  public get expressApplication(): Application {
    return this._expressApplication;
  }

  constructor(private _expressApplication: Application) {}

  public static getInstance(): ExpressApplicationHelper {
    if (expressApplicationHelperInstance) {
      return expressApplicationHelperInstance;
    }

    return expressApplicationHelperInstance = new ExpressApplicationHelper(Express());
  }

  public createAndMountRouterFromConfig(config: IRouterConfig): void {
    const router = Router();

    config.requestHandlerConfigs.forEach((requestHandlerConfig) => {
      this.assignRequestHandlerToRouter(router, requestHandlerConfig);
    });

    this._expressApplication.use(config.path, router);
  }

  private assignRequestHandlerToRouter(router: Router, config: IRequestHandlerConfig): void {
    router.get(config.path, config.fn);
  }
}
