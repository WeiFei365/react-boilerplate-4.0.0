import React, { useMemo } from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';

import SIcon from 'components/SIcon';

import getMenus from 'configs/page/rp_index/routes';

import * as appSelectors from 'models/app/selectors';

import useMenuMatch from 'hooks/useMenuMatch';

import css from './style.css';

const { SubMenu } = Menu;

function SiderMenu({ permissions }) {
  const location = useLocation();
  const menus = useMemo(() => getMenus(permissions.value), [permissions]);
  const [selectedKeys, openKeys, setOpenKeys] = useMenuMatch(
    menus,
    location.pathname,
  );

  return (
    <Menu
      theme="dark"
      mode="inline"
      className={classes(css.menu, 'antd-menu')}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      selectedKeys={selectedKeys}
    >
      {menus.map(({ name, key, Icon, children }) =>
        children ? (
          <SubMenu
            key={key}
            title={
              <span>
                <SIcon margin="" verticalAlign="0" Component={Icon} />
                <span>{name}</span>
              </span>
            }
          >
            {children.map(d => (
              <Menu.Item key={d.key}>
                <Link to={d.key}>{d.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={key}>
            <Link to={key}>
              <SIcon margin="" verticalAlign="0" Component={Icon} />
              <span>{name}</span>
            </Link>
          </Menu.Item>
        ),
      )}
    </Menu>
  );
}

SiderMenu.propTypes = {
  permissions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  permissions: appSelectors.makeSelectPermissions(),
});

export default connect(mapStateToProps)(SiderMenu);
