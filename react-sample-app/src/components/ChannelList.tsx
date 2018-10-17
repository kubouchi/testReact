import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react'; // UI用
import { Link, NavLink } from 'react-router-dom'; // URL変更を伴うメニューの実装用

const channels = ['general', 'random', 'test', 'hoge'];

export const ChannelList = () => {
  return (
    <Menu inverted vertical fixed={'left'}>
      <Menu.Item as={Link} to={'/'}>
        Home
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item>
        Channels
        <Icon name='list' />
        <Menu.Menu>
          {channels.map(channel =>
            <Menu.Item
              key={channel}
              name={channel}
              as={NavLink}
              to={{ pathname: `/channels/${channel}` }}>
              {channel}
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};
