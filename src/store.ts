import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './modules/root'

const epicMiddleware = createEpicMiddleware();

export default function configureStore(initState = {}) {
    const store = createStore(
        rootReducer,
        initState,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpic)

    return store;
}
