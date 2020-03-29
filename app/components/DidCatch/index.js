import React from 'react';
import PropTypes from 'prop-types';

import ErrorSend from 'components/Error/ErrorSend';

const defaultRender = error => <ErrorSend error={error} />;

export default class DidCatch extends React.PureComponent {
  state = {
    // 错误边界
    error: null,
  };

  componentDidCatch(error, info) {
    error.stack = info.componentStack; // eslint-disable-line no-param-reassign
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children, errorRender } = this.props;

    console.log('---DidCatch - render'); // eslint-disable-line no-console

    return error ? errorRender(error) : children;
  }
}

DidCatch.propTypes = {
  children: PropTypes.node.isRequired,
  // ⚠️⚠️⚠️注意，该参数禁止使用动态 Function，必须保证每次 render 时 errorRender 的值是一直不变的；
  // 可以定义在：
  // ✅1、this 实例上；
  // ✅2、组件外部（类似 defaultRender）；
  // ✅3、使用 useCallback 缓存；
  errorRender: PropTypes.func,
};
DidCatch.defaultProps = {
  errorRender: defaultRender,
};
