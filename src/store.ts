import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './redux/root';
import { configureStore as configureStores } from '@reduxjs/toolkit';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = configureStores({
        reducer: rootReducer,
        middleware: [epicMiddleware],
    });

    epicMiddleware.run(rootEpic);

    return store;
}
