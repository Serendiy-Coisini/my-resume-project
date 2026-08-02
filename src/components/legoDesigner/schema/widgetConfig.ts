import type { IWidgetTab } from '@/types/lego';

export const WIDGET_CONFIG_LIST: IWidgetTab[] = [
  {
    title: '文本组件',
    category: 'text',
    icon: 'Type',
    dataSource: { text: '点击双击修改文本' },
    list: [
      {
        id: '',
        componentName: 'hj-text-1',
        title: '基础标题/正文',
        description: '通用文本块',
        css: {
          left: 100,
          top: 100,
          width: 240,
          height: 36,
          zIndex: 2,
          fontColor: '#1e293b',
          fontSize: 16,
          fontWeight: 'normal',
          textAlign: 'left',
          lineHeight: 1.5
        },
        dataSource: { text: '这是一段示范文本内容' }
      },
      {
        id: '',
        componentName: 'hj-text-1',
        title: '大标题块',
        description: '加粗突出的标题',
        css: {
          left: 100,
          top: 100,
          width: 320,
          height: 48,
          zIndex: 2,
          fontColor: '#0f172a',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'left'
        },
        dataSource: { text: '模块大标题示例' }
      }
    ]
  },
  {
    title: '形状与背景',
    category: 'shape',
    icon: 'Square',
    dataSource: {},
    list: [
      {
        id: '',
        componentName: 'hj-rectangle',
        title: '矩形色块',
        description: '作为底色或分割框',
        css: {
          left: 100,
          top: 100,
          width: 200,
          height: 80,
          zIndex: 1,
          backgroundColor: '#eff6ff',
          borderColor: '#3b82f6',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 8
        },
        dataSource: {}
      },
      {
        id: '',
        componentName: 'hj-circle',
        title: '圆形色块',
        description: '圆形装饰物',
        css: {
          left: 100,
          top: 100,
          width: 60,
          height: 60,
          zIndex: 1,
          backgroundColor: '#3b82f6',
          borderRadius: '50%'
        },
        dataSource: {}
      }
    ]
  },
  {
    title: '头像与图片',
    category: 'avatar',
    icon: 'Image',
    dataSource: { avatarSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
    list: [
      {
        id: '',
        componentName: 'hj-avatar-1',
        title: '正方形头像',
        description: '直角/圆角头像',
        css: {
          left: 100,
          top: 100,
          width: 100,
          height: 120,
          zIndex: 2,
          backgroundColor: '#f1f5f9',
          borderWidth: 2,
          borderColor: '#cbd5e1',
          borderStyle: 'solid',
          borderRadius: 8
        },
        dataSource: { avatarSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }
      },
      {
        id: '',
        componentName: 'hj-avatar-2',
        title: '圆形头像',
        description: '纯圆框头像',
        css: {
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          zIndex: 2,
          backgroundColor: '#f1f5f9',
          borderWidth: 2,
          borderColor: '#3b82f6',
          borderStyle: 'solid',
          borderRadius: '50%'
        },
        dataSource: { avatarSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' }
      }
    ]
  }
];
