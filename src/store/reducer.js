import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as editorReducer } from '../pages/edit/store';
import { reducer as messageReducer } from '../pages/message/store';

export default combineReducers ({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer,
    editor:editorReducer,
    message: messageReducer
});

