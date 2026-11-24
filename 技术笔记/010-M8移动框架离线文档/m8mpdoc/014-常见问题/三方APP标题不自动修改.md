# 三方APP标题跳转不自动修改

## 问题描述

项目反馈，苏服办APP的导航栏标题在页面跳转时不会自动修改。

## 问题分析

苏服办APP的导航栏标题在页面跳转时不会自动修改，是因为苏服办APP的导航栏标题是在页面加载时设置的，加载页面后修改的`document.title`不会触发，所以导航栏标题不会自动修改。

M8.2下时，修改`document.title`是在vuerouter的页面跳转前进行修改的，可以正常被苏服办APP响应触发修改标题。

M8.3下时，uniapp在页面加载完成onShow生命周期后触发的`document.title`，是在页面url变化之后修改的，导致苏服办APP不响应标题修改。

目前尝试在M8.3下，无法在页面跳转之前获取下一个页面的标题。

## 解决方案

 - 针对此类APP不实时响应`document.title`的，暂时通过在main.js中，统一混入onReady页面生命周期，调用对应三方APP的JSSDK修改导航栏：

    ```js
    Vue.mixin({
        onReady() {
            const title = document.title;
            // api.xxx();
        }
    });
    ```

 - 或固定模块下所有页面使用同一个标题。