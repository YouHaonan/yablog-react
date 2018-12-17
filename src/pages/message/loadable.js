import React from 'react';
import Loadable from 'react-loadable';
function Loading(props) {
  if (props.pastDelay) {
    return <div>正在加载</div>;
  } else {
    return null;
  }
}

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading:Loading,
  delay: 300
});

export default () => <LoadableComponent/>