# Divider 分割线

区隔内容的分割线。

### 基础用法

对不同段落的文本进行分割。


```html
<div>
    <span> 今天早晨，我坐在窗前，世界像一个路人一样停下来片刻，向我点头然后离去。 </span>
    <e-divider-m />
    <span> 那里，小小的念头就像树叶的沙沙声；它们在我的心灵中轻声细语，传递着喜悦。 </span>
  </div>
```

## 设置文案

可以在分割线上自定义文本内容。

```html
<div>
    <span>你所看到的不是你自己，而是你的影子。</span>
    <e-divider-m content-position="left">拉宾德拉纳特·泰戈尔</e-divider-m>
    <span>我的愿望是傻瓜，它们在你的歌声中呼喊，我的大师。让我只是倾听。</span>
    <e-divider-m>
      <e-icon><star-filled /></e-icon>
    </e-divider-m>
    <span>我不能选择最好的。最好的选择了我。</span>
    <e-divider-m content-position="right">拉宾德拉纳特·泰戈尔</e-divider-m>
  </div>
```

#### 虚线

您可以设置分隔符的样式。

```html
<div>
    <span>大海，你使用的是什么语言？</span>
    <e-divider-m border-style="dashed" />
    <span>永恒问题的语言。</span>
  </div>
  <e-divider-m border-style="dotted" />
  <span>天空，你的答案是什么语言？</span>
  <e-divider-m border-style="double" />
  <span>永恒沉默的语言。</span>
```

#### 垂直分隔线

```html
<div>
    <span>雨</span>
    <e-divider-m direction="vertical" />
    <span>首页</span>
    <e-divider-m direction="vertical" border-style="dashed" />
    <span>草</span>
  </div>
```

## API

### Attributes

| 属性名       | 描述                                      | 类型            | 默认值     |
| ------------ | ----------------------------------------- | --------------- | ---------- |
| direction	         | 设置分割线方向	| `'horizontal'`、 `'vertical' `     | horizontal          |
| border-style	          | 设置分隔符样式| `'none' \|'hidden' \|'dotted' \|'dashed' \| 'solid' \| 'double' \|'groove' \|'ridge' \|'inset' \|'outset' \|`| solid   |
| content-position	        | 自定义分隔线内容的位置	                      | `'left' \| 'right'\| 'center'`| center|

### Slots

| 属性名  | 描述           |
| ------- | -------------- |
| default | 设置分割线文案的内容 |
