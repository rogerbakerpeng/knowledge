# 组件使用

## qrcode 二维码

### 介绍

- 二维码组件。

### 代码演示

#### 基础用法

```html
<em-qrcode
  ref="qr1"
  canvas-id="qr1"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  @click="remake('qr1')"
  @complete="complete($event, 'qr1')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr1 = ref(null);

const remake = (refName) => {
  const ref = qr1.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 设置了边距、半透明蓝色背景和红色前景色的二维码

```html
<em-qrcode
  ref="qr3"
  canvas-id="qr3"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
        margin: 10,
        backgroundColor: 'rgba(25, 147, 227, 0.5)',
        foregroundColor: 'rgb(185, 0, 0)'
    }"
  @click="remake('qr3')"
  @complete="complete($event, 'qr3')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr3 = ref(null);

const remake = (refName) => {
  const ref = qr3.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 设置了定位角、分割图案、对齐图案、时序图案、暗块、版本信息颜色的二维码

```html
<em-qrcode
  ref="qr4"
  canvas-id="qr4"
  :value="`---------------------------${text}---------------------------`"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
        positionProbeBackgroundColor: 'rgba(105,126,255,0.28)',
        positionProbeForegroundColor: '#697eff',
        separatorColor: 'rgba(184,112,253,0.29)',
        positionAdjustBackgroundColor: 'rgba(255,122,140,0.28)',
        positionAdjustForegroundColor: '#ff7a8c',
        timingBbackgroundColor: 'rgba(252,219,135,0.21)',
        timingForegroundColor: '#fcdb87',
        darkBlockColor: '#0f47ff',
        typeNumberBackgroundColor: 'rgba(0,255,83,0.18)',
        typeNumberForegroundColor: '#00ff53'
    }"
  @click="remake('qr4')"
  @complete="complete($event, 'qr4')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr4 = ref(null);

const remake = (refName) => {
  const ref = qr4.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 设置了纠错等级为 M 的二维码

```html
<em-qrcode
  ref="qr5"
  canvas-id="qr5"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
        errorCorrectLevel: 'M'
    }"
  @click="remake('qr5')"
  @complete="complete($event, 'qr5')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr5 = ref(null);

const remake = (refName) => {
  const ref = qr5.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 带 logo 的二维码，logo 处于二维码中间

```html
<em-qrcode
  ref="qr6"
  canvas-id="qr6"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
        foregroundImageSrc: '../../../static/logo.jpg',
        foregroundImageWidth: size / 5,
        foregroundImageHeight: size / 5,
        queue: queue
    }"
  @click="remake('qr6')"
  @complete="complete($event, 'qr6')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr6 = ref(null);

const remake = (refName) => {
  const ref = qr6.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 带 logo 的二维码，logo 处于二维码右下角，与边距有一定距离

```html
<em-qrcode
  ref="qr7"
  canvas-id="qr7"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
                                foregroundImageSrc: '../../../static/logo.jpg',
                                foregroundImageWidth: size / 5,
                                foregroundImageHeight: size / 5,
                                foregroundImageX: size - 10 - size / 5, // 图片绘制的水平坐标，计算到靠右位置
                                foregroundImageY: size - 10 - size / 5, // 图片绘制的垂直坐标，计算到考下位置
                                queue: queue
                            }"
  @click="remake('qr7')"
  @complete="complete($event, 'qr7')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr7 = ref(null);

const remake = (refName) => {
  const ref = qr7.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 带背景图片的二维码，背景缩放 1.5 倍，且背景图片带有一定透明度

```html
<em-qrcode
  ref="qr8"
  canvas-id="qr8"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                backgroundImageSrc: '../../../static/logo.jpg',
                                backgroundImageWidth: size * 0.75, // 图片宽
                                backgroundImageHeight: size * 0.75, // 图片高
                                backgroundImageX: size / 2 - (size * 0.75) / 2, // 图片绘制的水平坐标，计算到居中位置
                                backgroundImageY: size / 2 - (size * 0.75) / 2, // 图片绘制的垂直坐标，计算到居中位置
                                backgroundImageAlpha: 0.88, // 透明度
                                foregroundColor: 'rgb(11, 34, 116)',
                                queue: queue
                            }"
  @click="remake('qr8')"
  @complete="complete($event, 'qr8')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr8 = ref(null);

const remake = (refName) => {
  const ref = qr8.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 背景图片来自网络资源的二维码，且背景铺满，前景色为白色，小程序下绘制网络图片需先配置 download 域名白名单才能生效

```html
<em-qrcode
  ref="qr9"
  canvas-id="qr9"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
                                backgroundImageSrc: 'https://img01.yzcdn.cn/vant/cat.jpeg',
                                backgroundImageWidth: size,
                                backgroundImageHeight: size,
                                backgroundImageAlpha: 1,
                                foregroundColor: '#f0f0f0',
                                margin: 10,
                                queue: queue
                            }"
  @click="remake('qr9')"
  @complete="complete($event, 'qr9')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr9 = ref(null);

const remake = (refName) => {
  const ref = qr9.value; // 这里需要在模板中使用
  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### logo 来自网络资源的二维码，且带有边距填充和阴影，小程序下绘制网络图片需先配置 download 域名白名单才能生效

```html
<em-qrcode
  ref="qr10"
  canvas-id="qr10"
  :value="text"
  :size="size"
  :start="true"
  :auto="true"
  :options="{
                                foregroundImageSrc: 'https://img01.yzcdn.cn/vant/cat.jpeg',
                                foregroundImageWidth: size * 0.25,
                                foregroundImageHeight: size * 0.25,
                                foregroundImagePadding: 4,
                                foregroundImageBorderRadius: 4,
                                foregroundImageShadowBlur: 50,
                                foregroundImageShadowColor: 'rgba(0, 0, 0, 0.68)',
                                queue: queue
                            }"
  @click="remake('qr10')"
  @complete="complete($event, 'qr10')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr10 = ref(null);

const remake = (refName) => {
  const ref = qr10.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 批量生成的二维码

```html
<view class="qrcode-box" v-for="(item, index) in 5" :key="index">
  <view class="qrcode">
    <em-qrcode
      ref="qr"
      :canvas-id="`qr_${index}`"
      :value="`qr_${index}`"
      :size="size"
      :start="true"
      :auto="false"
      @click="remake(index)"
      @complete="complete($event, `qr_${index}`)"
    ></em-qrcode>
  </view>
</view>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(index) {
      var ref = this.$refs.qr;
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[index].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr = ref(null);

const remake = (index) => {
  const ref = qr.value; // 这里需要在模板中使用
  /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

  if (Array.isArray(ref)) {
    ref[index].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 异步生成的二维码——示例 1

```html
<em-qrcode
  ref="qrsync1"
  canvas-id="qrsync1"
  :value="textSync"
  :size="size"
  :start="false"
  :auto="true"
  @click="remake('qrsync1')"
  @complete="complete($event, 'qrsync1')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      textSync: "",
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  onLoad() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          text: "uQRCode Sync",
        });
      }, 3000);
    }).then((res) => {
      this.textSync = res.text;
    });
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const textSync = ref("");
const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qrsync1 = ref(null);

onLoad(() => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        text: "uQRCode Sync",
      });
    }, 3000);
  }).then((res) => {
    textSync.value = res.text;
  });
});

const remake = (refName) => {
  const ref = qrsync1.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 异步生成的二维码——示例 2

```html
<em-qrcode
  ref="qrsync1"
  canvas-id="qrsync1"
  :value="textSync"
  :size="size"
  :start="false"
  :auto="true"
  @click="remake('qrsync1')"
  @complete="complete($event, 'qrsync1')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      textSync2: "",
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  onReady() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          text: "uQRCode Sync",
        });
      }, 3000);
    }).then((res) => {
      this.textSync2 = res.text;
      this.make("qrsync2");
    });
  },
  methods: {
    make(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].make();
      } else {
        ref.make();
      }
    },
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";

const textSync2 = ref("");
const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qrsync1 = ref(null);

onReady(() => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        text: "uQRCode Sync",
      });
    }, 3000);
  }).then((res) => {
    textSync2.value = res.text;
    make("qrsync2");
  });
});

const make = (refName) => {
  const ref = qrsync1.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].make();
  } else {
    ref.make();
  }
};

const remake = (refName) => {
  const ref = qrsync1.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};
```

::: endif

#### 弹层——示例 1

```html
<em-popup ref="popup1" v-model="showPopup1">
  <view class="qrcode-box" style="margin-top: 30px">
    <view class="qrcode">
      <em-qrcode
        ref="qrpopup1"
        canvas-id="qrpopup1"
        :value="text"
        :size="size"
        :start="false"
        @click="remake('qrpopup1')"
        @complete="complete($event, 'qrpopup1')"
      ></em-qrcode>
    </view>
    <span class="msg">
      弹层测试，第一种写法，默认二维码组件加载完毕暂不生成，通过弹层组件的change事件去调用二维码组件的make方法去触发生成
    </span>
    <view class="btns">
      <em-button class="btn" type="primary" @click="showPopup1 = false"
        >关闭</em-button
      >
    </view>
  </view>
</em-popup>
<em-button class="btn" type="primary" @click="onClickPopup1()"
  >弹层测试一</em-button
>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      showPopup1: false,
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
    onClickPopup1() {
      this.showPopup1 = true;
      setTimeout(() => {
        this.$refs.qrpopup1.make();
      }, 150);
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const showPopup1 = ref(false);
const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const popup1 = ref(null);
const qrpupup1 = ref(null);

const remake = (refName) => {
  const ref = qrpupup1.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};

const onClickPopup1 = () => {
  showPopup1.value = true;
  setTimeout(() => {
    qrpupup1.value.make();
  }, 150);
};
```

::: endif

#### 弹层——示例 2

```html
<em-popup ref="popup2" v-model="showPopup2">
  <view class="qrcode-box" style="margin-top: 30px">
    <view class="qrcode">
      <em-qrcode
        ref="qrpopup2"
        canvas-id="qrpopup2"
        :value="text"
        :size="size"
        :start="true"
        @click="remake('qrpopup2')"
        @complete="complete($event, 'qrpopup2')"
      ></em-qrcode>
    </view>
    <span class="msg">
      弹层测试，第二种写法，默认二维码组件加载完毕立马生成，在某些设备弹层时canvas组件未在第一时间渲染完毕，可能会生成失败。优化方式，在弹层组件的change事件里延时150毫秒左右调用二维码组件的remake方法即可
    </span>
    <view class="btns">
      <em-button class="btn" type="primary" @click="showPopup2 = false"
        >关闭</em-button
      >
    </view>
  </view>
</em-popup>
<em-button class="btn" type="primary" @click="onClickPopup2()"
  >弹层测试二</em-button
>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      textSync: "",
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
    onClickPopup2() {
      this.showPopup2 = true;
      setTimeout(() => {
        this.$refs.qrpopup2.make();
      }, 150);
    },
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const showPopup2 = ref(false);
const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const popup2 = ref(null);
const qrpupup2 = ref(null);

const remake = (refName) => {
  const ref = qrpupup2.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};

const onClickPopup2 = () => {
  showPopup2.value = true;
  setTimeout(() => {
    qrpupup2.value.make();
  }, 150);
};
```

::: endif

#### 这是在 EJS 容器内部可使用 EJS API 截图的二维码

```html
<em-button class="emButton" @click="onClickScreenShot">点击截屏</em-button>
<em-qrcode
  ref="qr11"
  :size="200"
  :value="'https://example.com'"
  :options="{
                                foregroundImageSrc: '/static/logo.jpg',
                                foregroundImageWidth: size / 5,
                                foregroundImageHeight: size / 5,
                                foregroundImageX: size - 10 - size / 5,
                                foregroundImageY: size - 10 - size / 5
                            }"
  @click="remake('qr11')"
  @complete="complete($event, 'qr11')"
></em-qrcode>
```

::: ifdef M83

```js
export default {
  name: "Qrcode",
  data() {
    return {
      text: "//app.epoint.com.cn/m8fedoc/",
      size: 200,
    };
  },
  methods: {
    remake(refName) {
      var ref = this.$refs[refName];
      /* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */

      if (Array.isArray(ref)) {
        ref[0].remake();
      } else {
        ref.remake();
      }
    },
    complete(e, refName) {
      if (e.success) {
        console.log(refName + "生成成功");
      } else {
        console.log(refName + "生成失败");
      }
    },
  },
  onClickScreenShot() {
    ejs.io.screenShot({
      captureType: 1,
      success: function (result) {
        ejs.ui.toast("success");
      },
      error: function (error) {},
    });
  },
};
```

::: endif
::: ifdef M84

```js
import { ref } from "vue";

const text = ref("//app.epoint.com.cn/m8fedoc/");
const size = ref(200);
const qr11 = ref(null);

const remake = (refName) => {
  const ref = qr11.value; // 这里需要在模板中使用

  // ref通过v-for遍历后会自动包裹在数组里，所以要判断一下
  if (Array.isArray(ref)) {
    ref[0].remake();
  } else {
    ref.remake();
  }
};

const complete = (e, refName) => {
  if (e.success) {
    console.log(refName + "生成成功");
  } else {
    console.log(refName + "生成失败");
  }
};

const onClickScreenShot = (e, refName) => {
  ejs.io.screenShot({
    captureType: 1,
    success: function (result) {
      ejs.ui.toast("success");
    },
    error: function (error) {},
  });
};
```

::: endif

### API

#### Props

| 参数      |               说明               | 类型            | 默认值   |
| :-------- | :------------------------------: | :-------------- | :------- |
| size      |         生成二维码的尺寸         | number / string | `200`    |
| canvas-id |          canvas 组件 id          | string          | -        |
| value     |            二维码内容            | number / string | - `必填` |
| fileType  | 导出的文件类型，支持 `jpg` `png` | string          | `png`    |
| start     |    是否初始化组件后就开始生成    | boolean         | `true`   |
| auto      |     是否数据发生改变自动重绘     | boolean         | `false`  |
| hide      |          是否隐藏该组件          | boolean         | `false`  |
| options   |        二维码配置项，见下        | object          | -        |

### options 配置项

| 参数                          |                                                  说明                                                   | 类型    |
| :---------------------------- | :-----------------------------------------------------------------------------------------------------: | :------ |
| backgroundColor               |                                              二维码背景色                                               | string  |
| foregroundColor               |                                              二维码颗粒色                                               | string  |
| margin                        |                                            较上下左右的边距                                             | number  |
| positionProbeBackgroundColor  |                                              定位角背景色                                               | string  |
| positionProbeForegroundColor  |                                              定位角颗粒色                                               | string  |
| separatorColor                |                                            定位角内里分割色                                             | string  |
| positionAdjustBackgroundColor |                                             对齐图案背景色                                              | string  |
| positionAdjustForegroundColor |                                             对齐图案颗粒色                                              | string  |
| timingBbackgroundColor        |                                             时序图案背景色                                              | string  |
| timingForegroundColor         |                                            时序图案角颗粒色                                             | string  |
| darkBlockColor                |                                               暗块背景色                                                | string  |
| typeNumberBackgroundColor     |                                             版本信息背景色                                              | string  |
| typeNumberForegroundColor     |                                             版本信息颗粒色                                              | string  |
| errorCorrectLevel             | 纠错等级(容错率),即值越高被遮挡的地方有点多也能被识别;默认`H`,可选择值为 `L:7%` `M:15%` `Q:25%` `H:30%` | string  |
| foregroundImageSrc            |                                         二维码 logo 的 img 地址                                         | string  |
| foregroundImageWidth          |                                            二维码 logo 的宽                                             | number  |
| foregroundImageHeight         |                                            二维码 logo 的高                                             | number  |
| foregroundImageX              |                                   图片绘制的水平坐标，计算到靠右位置                                    | number  |
| foregroundImageY              |                                   图片绘制的垂直坐标，计算到靠下位置                                    | number  |
| queue                         |                             所有需要加载图片的项都需要将 queue 设置为 true                              | boolean |
| backgroundImageSrc            |                                           二维码背景图片地址                                            | string  |
| backgroundImageWidth          |                                            二维码背景图片宽                                             | number  |
| backgroundImageHeight         |                                            二维码背景图片高                                             | number  |
| backgroundImageX              |                                   图片绘制的水平坐标，计算到居中位置                                    | number  |
| backgroundImageY              |                                   图片绘制的垂直坐标，计算到居中位置                                    | number  |
| backgroundImageAlpha          |                                         二维码背景图片的透明度                                          | number  |
| foregroundImagePadding        |                                          二维码 logo 边距填充                                           | number  |
| foregroundImageBorderRadius   |                                         二维码 logo 四周的圆角                                          | number  |
| foregroundImageShadowBlur     |                                       二维码 logo 的阴影发散的值                                        | number  |
| foregroundImageShadowColor    |                                         二维码 logo 的阴影颜色                                          | string  |

#### qrcode 方法

通过 `ref` 可以获取到 `qrcode` 实例并调用实例方法，详见组件实例方法

| 方法名 |      说明      | 参数 | 返回值 |
| :----- | :------------: | :--- | :----- |
| make   |   生成二维码   | -    | -      |
| remake | 重新生成二维码 | -    | -      |

#### Events

| 事件名    |      说明      | 回调参数 |
| :-------- | :------------: | :------- |
| complete  | 二维码加载成功 | -        |
| click     |   点击二维码   | -        |
| longpress |   长按二维码   | -        |

::: ifdef M83

<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/index.html#/modules/m8showcase/examples/em-qrcode"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif
::: ifdef M84
<iframe
 src="//app.epoint.com.cn/m8mpdoc/showcase/m8.4/index.html#/modules/m8showcase/examples/em-qrcode"
 frameborder=0
 allowfullscreen class="ui-showcase-iframe">
  </iframe>
::: endif

 <style>
 .ui-showcase-iframe {
    position: fixed;
    right: 3.5vw;
    top: 17%;
    width: 375px;
    height: 75vh;
    box-shadow: 0 0 12px 6px #eee;
    border-radius: 15px;
 }
 .main .markdown-body {
    padding: 45px;
    width: calc(97vw - 661px);
}
 </style>
