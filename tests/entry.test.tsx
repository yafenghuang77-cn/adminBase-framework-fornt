import { expect, rs, test } from '@rstest/core';
import { act, screen } from '@testing-library/react';

rs.mock('../src/App', () => ({
  default: function BrokenApp() {
    throw new Error('Simulated application initialization error');
  },
}));

test('shows a recovery page when the application fails before its providers mount', async () => {
  const container = document.createElement('div');
  container.id = 'root';
  document.body.append(container);
  const errorLog = rs.spyOn(console, 'error').mockImplementation(() => {});

  try {
    await act(async () => {
      await import('../src/index');
    });

    expect(screen.getByRole('alert')).toHaveTextContent('页面出现异常');
    expect(screen.getByRole('button', { name: '刷新页面' })).toBeInTheDocument();
  } finally {
    errorLog.mockRestore();
    container.remove();
  }
});
