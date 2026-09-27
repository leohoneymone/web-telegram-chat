import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  hashed: false,
  token: {
    colorText: '#f0f0f0',
    colorPrimary: '#12202E',
    colorPrimaryBg: '#1E3045',
    boxShadowSecondary: '0 0 7px -1px #000000c4',
  },
  components: {
    Layout: {
      headerBg: 'var(--ant-color-primary)',
      siderBg: 'var(--ant-color-primary)',
      triggerBg: 'var(--ant-color-primary)',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'var(--ant-color-primary-bg)',
      itemSelectedColor: 'var(--ant-color-text)',
    },
    Input: {
      colorBgContainer: '#12202E',
      colorBorder: 'transparent',
      activeBg: '#162738',
      activeBorderColor: 'transparent',
      hoverBg: '#162738',
      colorTextPlaceholder: '#969696',
      colorIcon: '#969696',
    },
    Modal: {
      contentBg: 'var(--ant-color-primary-bg)',
      colorIcon: 'var(--ant-color-text)',
    },
    Message: {
      contentBg: 'var(--ant-color-primary-bg)',
    },
    Skeleton: {
      gradientFromColor: '#5C5C5C88',
      gradientToColor: '#78787888',
    },
  },
};
