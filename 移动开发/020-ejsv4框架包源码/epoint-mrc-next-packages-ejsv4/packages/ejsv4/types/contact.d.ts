declare namespace EJSNamespace {
    interface person {
        /**
         * 用户唯一 id
         */
        userguid: string;
        /**
         * 用户姓名
         */
        username: string;
        [key: string]: any;
    }

    interface ou {
        /**
         * 部门名称
         */
        ouname: string;
        /**
         * 部门guid
         */
        ouguid: string;
        [key: string]: any;
    }

    interface role {
        /**
         * 角色名
         */
        roledisplayname: string;
        /**
         * 角色id
         */
        roleguid: string;
        [key: string]: any;
    }

    interface job {
        /**
         * 岗位名
         */
        name: string;
        /**
         * 岗位id
         */
        dataguid: string;
        /**
         * 岗位类型
         */
        datatype: string;
        /**
         * 是否有子元素
         */
        haschild: boolean;
        [key: string]: any;
    }

    interface special {
        /**
         * 特殊对象名
         */
        itemText: string;
        /**
         * 特殊对象值
         */
        itemValue: string;
        [key: string]: any;
    }

    interface resultType {
        /**
         * 返回状态码，一般是-1
         */
        resultCode?: number;
        /**
         * 返回选择人员的数组数据
         */
        resultData?: person[];
        /**
         * 返回选择部门的数组数据
         */
        ouData?: ou[];
        /**
         * `M8组件参数`，选择的角色列表
         */
        selectedRoles?: role[];
        /**
         * `M8组件参数`，选择的岗位列表
         */
        selectedJobs?: job[];
        /**
         * `M8组件参数`，选择的特殊对象列表
         */
        selectedSpecials?: special[];
    }

    interface homepageItem {
        /**
         * 配置项标识
         */
        value: string;
        /**
         * 配置项字段名
         */
        text?: string;
        /**
         * 配置项图标，可配置默认图标，也可配置自定义图标链接
         */
        icon?: string;
        /**
         * `custom`配置项生效，获取人员和部门列表的个性化接口完整地址，输入输出数据格式参考框架接口：`address_getoulistwithuser_v8`
         */
        url?: string;
        /**
         * `custom`配置项生效，选择人员时，也需要一个 个性化的获取部门下所有人员接口，否则无法通过选择部门来选择部门下所有人员，输入输出数据格式参考 `address_getalluserlist_v7`
         */
        getalluserurl?: string;
        /**
         * `custom`配置项生效，配置该字段且没有配置`custom`字段时，组件默认从组织架构中获取该节点下的选人树
         */
        ouguid?: string;
        /**
         * `custom`配置项生效，完整的选人树
         */
        custom?: customType;
    }

    interface user extends person {
        /**
         * 所在部门guid
         */
        ouguid: string;
        /**
         * 人员头像
         */
        photourl: string;
    }

    interface ouItem extends ou {
        /**
         * 父部门guid
         */
        parentouguid: string;
        /**
         * 是否存在子部门，'1'为有，'0'为没有
         */
        haschildou: string;
        /**
         * 是否存在人员，'1'为有，'0'为没有
         */
        haschilduser: string;
        /**
         * 人员列表
         */
        userlist?: user[];
        /**
         * 部门列表
         */
        oulist?: ouItem[];
    }

    interface customType {
        /**
         * 部门人员数量
         */
        ounum?: string | number;
        /**
         * 部门列表
         */
        oulist?: ouItem[];
        /**
         * 人员列表
         */
        userlist?: user[];
    }

    interface contactType {
        /**
         * 调用原生的通讯录选人功能
         *
         * **注意：** 不推荐使用此 API 未来版本可能会废弃此 API，推荐使用`ejs.contact.select`调用选人 API
         *
         * @support
         * | ejs（H5 应用) |   ejs（新点小程序）    |   H5   | 钉钉   | 微信小程序 | 支付宝小程序 |
         * | :------------ | :--------------------: | :----: | :----- | :--------- | :----------- |
         * | 支持          | 支持 (ejs-weex 不支持) | 不支持 | 不支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact)
         * @example ```typescript
         *    ejs.contact.choose({
         *        userguids: ['userguid01', 'userguid02'],
         *        success: function (result) {
         *            console.log('已选择的人员数组', result.resultData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        choose?: APIType<
            {
                /**
                 * 已选人员的用户 guid 列表
                 */
                userguids?: string[];
            },
            {
                /**
                 * 返回选择人员的数组数据
                 */
                resultData: person[];
            }
        >;
        /**
         * 选人功能 API，EJS 容器环境由原生组件 API 实现，其他环境由 H5 选人实现
         *
         * 从版本`4.2.0`开始，ejs 不再打包选人组件的代码，H5 端选人由各自框架的选人组件实现。
         *
         * 开发者仍然可以通过 ejs 调用各框架的选人组件，调用前请确保已正确引入对应框架的选人组件代码。
         *
         * M8 框架的 H5 选人组件传参与 M7 框架有差异，且在跨端框架中调用 H5 选人时，需要在页面上添加选人组件的节点，具体请参照对应框架选人组件的文档。
         *
         * 以下仅列出 M7 框架 H5 选人组件传参说明。
         *
         * 参数与 EJS 原生选人组件 API 一致
         *
         * @support
         * | ejs（H5 应用) | ejs（新点小程序） |  H5  | 钉钉 | 微信小程序 | 支付宝小程序 |
         * | :------------ | :---------------: | :--: | :--- | :--------- | :----------- |
         * | 支持(3.2.0)   |    支持(3.2.0)    | 支持 | 支持 | 不支持     | 不支持       |
         *
         * 文档: [http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact](http://app.epoint.com.cn/ejs4mpdoc/index/index.php#page=api_contact)
         * @example ```typescript
         *    ejs.contact.select({
         *        url: 'http://218.4.136.126:1443/oa9_v7/rest/oa9/',
         *        token: 'f3fc7dc48fccb6638bcab36ad513df88',
         *        selectedusers: [
         *            {
         *                username: '张三',
         *                userguid: '73bee7b8-068c-4b11-9d2a-b16fcbba5119'
         *            }
         *        ],
         *        unableselectusers: [
         *            {
         *                username: '李四',
         *                userguid: '3248760a-e4a3-430e-837e-11519d56090f'
         *            }
         *        ],
         *        issingle: '0',
         *        isgroupenable: '0',
         *        maxchoosecount: 500,
         *        success: function (result) {
         *            console.log('已选的人员列表', result.resultData);
         *            console.log('已选的部门列表', result.ouData);
         *        },
         *        error: function (error) {}
         *    });
         * ```
         */
        select: APIType<
            {
                /**
                 * h5 选人功能需要手动传入地址
                 */
                url?: string;
                /**
                 * `M7组件参数`，h5 选人功能可以手动传入 token
                 */
                token?: string;
                /**
                 * 已选人员数组，格式参考原生选人组件，只选部门模式下无效
                 */
                selectedusers?: person[];
                /**
                 * 禁选人员数组，格式参考原生选人组件，只选部门模式下无效
                 */
                unableselectusers?: person[];
                /**
                 * 已选部门数组，格式参考原生选人组件，只选部门和选择范围模式下生效
                 */
                selectedous?: ou[];
                /**
                 * 是否单选
                 *
                 * M7组件为字符串，'0'为多选，'1'为单选，默认为'0'
                 *
                 * M8组件为布尔值，默认 false
                 */
                issingle?: string | boolean;
                /**
                 * 是否只选部门
                 *
                 * M7组件为字符串，'0'为否，'1'为只选部门，默认为'0'
                 *
                 * M8组件为布尔值，默认 false
                 */
                isouonly?: string | boolean;
                /**
                 * `M7组件参数`，是否允许选择群组，'0'为不支持，'1'为支持，默认为'0'
                 *
                 * @support h5 不支持此功能
                 */
                isgroupenable?: string;
                /**
                 * 选择人数最大数量，默认为 500
                 */
                maxchoosecount?: number;
                /**
                 * `M7组件参数`，部门搜索接口完整地址，在 h5 环境下，若此参数不为空，则只选部门时，选人界面存在搜索框，可搜索部门
                 *
                 * @support h5环境支持，ejs >= v4.0.3-a
                 */
                searchOuUrl?: string;
                /**
                 * `M7组件参数`，选择范围，格式参考原生选人组件
                 */
                custom?: customType;
                /**
                 * `M7组件参数`，是否总是通过网络请求获取下一层级，设置为`true`时，点击部门不再判断 `haschildou` 和 `haschilduser`，而是直接去获取下一层级数据。H5 环境默认为`false`，ejs 环境默认为 `true`
                 *
                 * @support ejs >= 4.1.9
                 */
                alwaysUseNetData?: boolean;
                /**
                 * `M7组件参数`，用于添加`mui`资源所在的根路径，当 `mui` 资源不在框架默认路径中时，可通过该参数设置对应根路径
                 *
                 * @support ejs >= 4.1.9
                 */
                bizRootPath?: string;
                /**
                 * `M8组件参数`，已选角色
                 */
                selectedroles?: role[];
                /**
                 * `M8组件参数`，已选岗位
                 */
                selectedjobs?: job[];
                /**
                 * `M8组件参数`，已选特殊对象
                 */
                selectedspecials?: special[];
                /**
                 * `M8组件参数`，父级只有一项时，是否直接进入该项子级，默认为 true
                 */
                ismoveup?: boolean;
                /**
                 * `M8组件参数`，首页配置
                 *
                 * 选择人员时默认：`['0', '1', '2', '5']`，只选部门时默认：`['0', '1']`
                 *
                 * 各配置项对应的默认字段名及图标名：
                 * | value           |    text    |    icon     |
                 * | :-------------- | :--------: | :---------: |
                 * | `'0'`           |  组织架构  | `structure` |
                 * | `'1'`           |  我的单位  |  `myunit`   |
                 * | `'2'`           |  我的部门  |   `myou`    |
                 * | `'3'`           |  公共分组  |   `group`   |
                 * | `'4'`           |  我的分组  |  `mygroup`  |
                 * | `'5'`           |  我的常用  |  `common`   |
                 * | `'6'`           | 星标联系人 |   `star`    |
                 * | `'7'` `v8.2.19` |    部门    |    `ous`    |
                 * | `'8'` `v8.2.19` |    角色    |   `role`    |
                 * | `'9'` `v8.2.19` |    岗位    |    `job`    |
                 * | `'custom'`      |  选择范围  |  `custom`   |
                 *
                 * @tips 注意：`我的分组`、`星标联系人`是`我的常用`的子级，若首页配置了`我的常用`，则`我的分组`、`星标联系人`都会默认展示在下一层级。
                 */
                homepage?: (string | homepageItem)[];
                /**
                 * `M8组件参数`，是否是多维组织架构，为`true`时表示使用多维组织架构，接口请求`v8`接口，否则切换为`v7`接口
                 *
                 * 默认为 true
                 */
                isdimension?: boolean;
                /**
                 * `M8组件参数`，是否展示最近联系人，仅在`ejs`环境中且鉴权之后有效
                 *
                 * 默认为 true
                 */
                showRecent?: boolean;
                /**
                 * `M8组件参数`，是否展示特殊对象
                 *
                 * 默认为 false
                 */
                showSpecial?: boolean;
                /**
                 * `M8组件参数`，将搜索范围限定在某个节点内，该属性为该节点的`ouguid`
                 */
                searchouguid?: string;
                /**
                 * `M8组件参数`，个性化搜索接口完整地址，输入输出数据格式参考框架接口：`address_searchouoruserbycondition_dimension_v8`
                 */
                searchurl?: string;
                /**
                 * `M8组件参数`，是否开启即时通讯权限检查，开启后无法选择没有即时通讯权限的人员
                 *
                 * 默认为 false
                 */
                ismsgonly?: boolean;
            },
            resultType
        >;
    }
}
