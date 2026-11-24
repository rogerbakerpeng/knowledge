### 说明

API按照模块区分开来，便于维护管理


API模块是依赖与core模块的


注意，默认如果是在ejs环境下，而且没有实现runcode，而且ejs._callProxy存在
会默认使用这个方式(减少重复代码)