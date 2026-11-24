export default function (opt, cb) {
    if (opt.path === 'workplatform.provider.openNewPage' && opt.dataMap.method === 'goSelectPerson') {
        const pickedUsers = [];

        // 已选人员
        if (opt.dataMap.selectedusers && opt.dataMap.selectedusers.length > 0) {
            const selectedusers = opt.dataMap.selectedusers;

            selectedusers.forEach((element) => {
                pickedUsers.push(element.userguid);
            });
        }
        let issingle;

        // eslint-disable-next-line eqeqeq
        if (opt.dataMap.issingle == 0) {
            issingle = true;
        } else {
            issingle = false;
        }

        const corpId = localStorage.getItem('corpId');

        dd.biz.contact.complexPicker({
            title: '选择页面', // 标题
            corpId, // 企业的corpId
            multiple: issingle, // 是否多选
            limitTips: '', // 超过限定人数返回提示
            maxUsers: opt.dataMap.maxchoosecount || 1000, // 最大可选人数
            pickedUsers: pickedUsers || [], // 已选用户
            pickedDepartments: [], // 已选部门
            disabledUsers: [], // 不可选用户
            disabledDepartments: [], // 不可选部门
            requiredUsers: [], // 必选用户（不可取消选中状态）
            requiredDepartments: [], // 必选部门（不可取消选中状态）
            appId: opt.dataMap.appId || '288560694', // 微应用的Id
            responseUserOnly: false, // 返回人，或者返回人和部门
            startWithDepartmentId: 0, // 仅支持0和-1
            onSuccess(result) {
                const tmpUserInfo = result.users;

                const resultUser = [];

                if (tmpUserInfo.length > 0) {
                    tmpUserInfo.forEach((element) => {
                        resultUser.push({
                            username: element.name || '',
                            loginid: '',
                            sequenceid: '',
                            photourl: element.avatar || '',
                            displayname: element.name || '',
                            title: '',
                            baseouname: '',
                            ccworksequenceid: '',
                            userguid: element.emplId || '',
                            ordernumber: ''
                        });
                    });
                }

                cb &&
                    cb({
                        resultData: resultUser,
                        grouipData: [],
                        talkData: []
                    });
            },
            onFail(err) {
                console.log(err);
            }
        });
    }
}
