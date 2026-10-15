import { afterEach, expect, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import App from '../src/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test('renders the replicated workspace and restores the selected brand', async () => {
  render(<App />);
  expect(await screen.findByRole('heading', { name: 'Umi Max 后台管理框架' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '常用功能' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '框架基础能力' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '使用与接入说明' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /查询性能记录/ })).toHaveAttribute(
    'href',
    '/monitoring/query',
  );

  fireEvent.click(screen.getByRole('button', { name: '切换品牌，当前品牌：KFC' }));
  fireEvent.click(await screen.findByRole('menuitem', { name: 'PH' }));
  expect(await screen.findByRole('button', { name: '切换品牌，当前品牌：PH' })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('framework:brand') || '{}').id).toBe('ph');

  cleanup();
  render(<App />);
  expect(await screen.findByRole('button', { name: '切换品牌，当前品牌：PH' })).toBeInTheDocument();
});
