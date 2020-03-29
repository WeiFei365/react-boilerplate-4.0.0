import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Layout } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import IconFont from 'components/SIcon/IconFont';

import css from './style.css';

const { Content } = Layout;

export default function HomePage() {
  console.log('***HomePage - render'); // eslint-disable-line no-console
  const [count, setCount] = useState(0);

  return (
    <Content className={css.homePage}>
      <h1>This is the HomePage container!</h1>
      <p>
        <HomeOutlined rotate={45} />
      </p>
      <p>
        <LoadingOutlined spin />
      </p>
      <p>
        <IconFont type="icon-leimu-o" spin rotate={45} />
      </p>
      <p>
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Antd
        </Button>
      </p>
      <p>
        <Link to={{ search: `?count=${count}` }}>Push</Link>
      </p>
      <h3>{count}</h3>
    </Content>
  );
}
