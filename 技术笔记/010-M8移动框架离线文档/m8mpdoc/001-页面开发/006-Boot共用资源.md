# Boot共用资源

## 前言

`boot` 是每一个业务模块入口中必须要引入的资源，其中引入了开发必须依赖的资源，不需要开发人员繁琐的一个个去进行引入

## 说明

`boot` 中根据打包命令及`config`配置，为开发人员预先引入了如下资源：

- `@build/resolution/mock/index.tool`

- 打包为H5端应用时，引入`src/static/lib/performance.js` 及 `src/static/lib/vconsole.min.js`