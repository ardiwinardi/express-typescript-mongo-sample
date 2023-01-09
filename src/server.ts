import App from '@/app';
import AuthRoute from './features/auth/presentation/auth.route';
import UserRoute from './features/user/presentation/user.route';

import IndexRoute from './features/index/presentation/index.route';
import validateEnv from './shared/utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UserRoute(), new AuthRoute()]);

app.listen();
