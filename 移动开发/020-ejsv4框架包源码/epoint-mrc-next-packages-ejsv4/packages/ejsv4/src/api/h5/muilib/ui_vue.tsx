/// <reference types="vue-tsx-support/options/allow-unknown-props" />
/* eslint-disable no-unused-vars */
import Vue, { VNode } from 'vue';
import {
    Dialog,
    ActionSheet,
    DatetimePicker,
    Popup,
    Picker,
    Field,
    Cell,
    CellGroup,
    RadioGroup,
    Radio,
    Checkbox,
    CheckboxGroup,
    Col,
    Row
} from 'vant';
import { pickdateStyle, selectStyle, pickdatetimeStyle, dialogStyle, skinStyle } from './format_ui';
import paddingWith0 from './paddingwith0';
import { getColumns } from './get_columns';

const head = document.getElementsByTagName('head')[0];

if (!document.querySelector('#skinStyle')) {
    head.appendChild(skinStyle);
}

function insertFormatCSS() {
    if (!document.querySelector('#pickdateStyle')) {
        head.appendChild(pickdateStyle);
    }
}

function formatDialog(cancelable) {
    if (!document.querySelector('#dialogStyle')) {
        head.appendChild(dialogStyle);
    }

    let style = document.querySelector('#dialogStyle') as Element;

    if (!cancelable) {
        style.textContent = (style.textContent || '').replace(
            /.van-dialog__footer\{([\s]+?)padding: 0 24px 20px;/g,
            '.van-dialog__footer{\n padding: 0 20% 20px;'
        );
    } else {
        style.textContent = (style.textContent || '').replace(
            /.van-dialog__footer\{([\s]+?)padding: 0 20% 20px;/g,
            '.van-dialog__footer{\n padding: 0 24px 20px;'
        );
    }
}

let vueData = {
    type: '',
    timer: null,
    confirm: {
        show: false,
        title: '',
        message: '',
        buttonLabels: ['取消', '确定'],
        cancelable: true
    },
    alert: {
        show: false,
        title: '',
        message: '',
        buttonName: '',
        cancelable: true
    },
    prompt: {
        show: false,
        message: '',
        value: '',
        title: '',
        buttonLabels: '',
        hint: '',
        maxlength: '',
        autosize: {} as { maxHeight: number; minHeight: number },
        cancelable: true
    },
    actionSheet: {
        show: false,
        actions: [],
        cancelable: true
    },
    pickDate: {
        show: false,
        type: '',
        value: null,
        title: '',
        minDate: {} as Date,
        maxDate: {} as Date,
        innerValue: null,
        columns: null
    },
    pickTime: {
        show: false,
        value: null,
        title: '',
        minHour: '',
        maxHour: '',
        minMinute: '',
        maxMinute: ''
    },
    pickDateTime: {
        show: false,
        value: null,
        title: '',
        showSecond: false,
        minDate: {} as Date,
        maxDate: {} as Date,
        innerValue: null,
        columns: [] as { values: any[]; defaultIndex: number; }[]
    },
    popPicker: {
        show: false,
        columns: []
    },
    showWaiting: {
        show: false,
        message: '',
        padlock: true
    },
    select: {
        title: '',
        items: [],
        choiceState: [],
        // 由以前的true和false替换为了1和0
        isMultiSelect: 1,
        // 样式类型，默认为0。 0：单列表样式；1：九宫格样式(目前只支持单选)
        type: '',
        columns: 2,
        // 可取消
        cancelable: true,
        isShowSelectAll: false,
        show: false,
        value: [] as any[]
    }
};

export default function uiVue(args, method, os) {
    const options = args[0];
    const resolve = args[1];
    const noop = (info) => info;
    const $t = (window.di18n && window.di18n.$t.bind(window.di18n)) || noop;

    let datetime = options.datetime;
    let minDate = options.minDate;
    let maxDate = options.maxDate;

    if (method === 'pickDate' || method === 'pickDateTime' || method === 'pickMonth') {
        insertFormatCSS();

        if (!datetime) {
            // 如果不存在，默认为当前时间
            datetime = new Date();
        } else {
            if (os && os.ios && method === 'pickMonth' && datetime.length <= 7) {
                // ios环境下，new Date('2021/12')是非法的，需要改为new Date('2021/12/1')
                datetime = datetime + '-01';
            }
            datetime = new Date(datetime.replace(/-/g, '/'));
        }

        if (!minDate) {
            // 如果不传，默认从1900开始
            minDate = 1900;
            minDate += '/01/01';
        } else if (os && os.ios && method === 'pickMonth' && minDate.length <= 7) {
            minDate = minDate + '-01';
        }

        if (!maxDate) {
            maxDate = new Date().getFullYear() + 10;
            maxDate += '/12/31';
        } else if (os && os.ios && method === 'pickMonth' && maxDate.length <= 7) {
            maxDate += '-01';
        }
    }

    switch (method) {
        default:
            break;
        case 'confirm':
            vueData.type = 'confirm';
            vueData.confirm.title = options.title;
            vueData.confirm.message = options.message;
            vueData.confirm.buttonLabels = options.buttonLabels;
            vueData.confirm.cancelable = options.cancelable === 1;
            formatDialog(true);
            break;
        case 'alert':
            vueData.type = 'alert';
            vueData.alert.title = options.title;
            vueData.alert.message = options.message;
            vueData.alert.buttonName = options.buttonName;
            vueData.alert.cancelable = options.cancelable === 1;
            formatDialog(false);
            break;
        case 'prompt':
            vueData.type = 'prompt';
            vueData.prompt.message = options.message;
            vueData.prompt.value = options.text;
            vueData.prompt.title = options.title;
            vueData.prompt.buttonLabels = options.buttonLabels;
            vueData.prompt.hint = options.hint;
            vueData.prompt.maxlength = options.maxLength;
            vueData.prompt.cancelable = options.cancelable === 1;
            vueData.prompt.autosize = {
                // 一行的高度是24px
                maxHeight: options.lines * 24,
                minHeight: 24
            };
            formatDialog(true);
            break;
        case 'actionSheet':
            vueData.type = 'actionSheet';
            options.items = options.items.map((element) => ({ name: element }));
            vueData.actionSheet.actions = options.items;
            vueData.actionSheet.cancelable = options.cancelable === 1;
            break;
        case 'pickDate':
            vueData.type = 'pickDate';
            vueData.pickDate.type = 'date';
            setTimeout(() => {
                vueData.pickDate.value = datetime;
            }, 20);
            vueData.pickDate.title = options.title;
            vueData.pickDate.minDate = new Date(minDate.replace(/-/g, '/'));
            vueData.pickDate.maxDate = new Date(maxDate.replace(/-/g, '/'));
            break;
        case 'pickMonth':
            vueData.type = 'pickDate';
            vueData.pickDate.type = 'year-month';
            setTimeout(() => {
                vueData.pickDate.value = datetime;
            }, 20);
            vueData.pickDate.title = options.title;
            vueData.pickDate.minDate = new Date(minDate.replace(/-/g, '/'));
            vueData.pickDate.maxDate = new Date(maxDate.replace(/-/g, '/'));
            break;
        case 'pickTime':
            insertFormatCSS();
            var _datetime = options.datetime;

            if (!_datetime) {
                // 如果不存在，默认为当前时间
                const dateNow = new Date();
                const hours = paddingWith0(dateNow.getHours());
                const minutes = paddingWith0(dateNow.getMinutes());

                _datetime = `${hours}:${minutes}`;
            }
            vueData.type = 'pickTime';
            vueData.pickTime.value = _datetime;
            vueData.pickTime.title = options.title;
            vueData.pickTime.minHour = options.minHour;
            vueData.pickTime.maxHour = options.maxHour;
            vueData.pickTime.minMinute = options.minMinute;
            vueData.pickTime.maxMinute = options.maxMinute;
            break;
        case 'pickDateTime':
            vueData.type = 'pickDateTime';
            if (!document.querySelector('pickdatetimeStyle')) {
                head.appendChild(pickdatetimeStyle);
            }

            vueData.pickDateTime.minDate = new Date(minDate.replace(/-/g, '/'));
            vueData.pickDateTime.maxDate = new Date(maxDate.replace(/-/g, '/'));
            vueData.pickDateTime.value = datetime;
            vueData.pickDateTime.title = options.title;
            vueData.pickDateTime.showSecond = options.showSecond;
            vueData.pickDateTime.innerValue = datetime;
            vueData.pickDateTime.columns = getColumns(
                vueData.pickDateTime.minDate,
                vueData.pickDateTime.maxDate,
                datetime,
                options.showSecond
            );
            break;
        case 'popPicker':
            vueData.type = 'popPicker';
            if (JSON.stringify(vueData.popPicker.columns) !== JSON.stringify(options.data)) {
                vueData.popPicker.columns = options.data;
            }
            break;
        case 'showWaiting':
            vueData.type = 'showWaiting';
            vueData.showWaiting.message = options.message;
            vueData.showWaiting.padlock = options.padlock;
            break;
        case 'select':
            var setValue: any = '';
            var _type = '';

            if (options.type === 0 && options.isMultiSelect === 1) {
                // 多选
                _type = 'selectMulti';
                setValue = [];
                options.choiceState.forEach((item, index) => {
                    if (item === '1') {
                        setValue.push(options.items[index]);
                    }
                });
            } else if (options.type === 0 && options.isMultiSelect === 0) {
                // 单选
                _type = 'select';
            } else if (options.type === 1) {
                // 九宫格单选
                _type = 'selectSingleSP';
                formatDialog(true);
            }

            if (options.type === 0 && !document.querySelector('#selectStyle')) {
                head.appendChild(selectStyle);
            }
            vueData.type = 'select';
            vueData.select.title = options.title;
            vueData.select.items = options.items;
            vueData.select.choiceState = options.choiceState;
            vueData.select.isMultiSelect = options.isMultiSelect;
            vueData.select.type = _type;
            vueData.select.columns = options.columns;
            vueData.select.cancelable = options.cancelable === 1;
            vueData.select.isShowSelectAll = options.isShowSelectAll === 1;
            vueData.select.value = setValue;
            break;
    }

    if (options.success) {
        vueData[vueData.type].success = options.success;
    }

    if (resolve) {
        vueData[vueData.type].resolve = resolve;
    }

    const createPickDate = () => {
        const vnode = new Vue({
            data() {
                return vueData;
            },
            render(): VNode {
                const self = this;
                let innerDOM;

                switch (self.type) {
                    default:
                        break;
                    case 'confirm':
                        innerDOM = (
                            <Dialog.Component
                                id="ejs-ui-confirm"
                                propsValue={self.confirm.show}
                                propsWidth={295}
                                propsTitle={self.confirm.title}
                                propsMessage={self.confirm.message}
                                propsClose-on-click-overlay={self.confirm.cancelable}
                                propsShow-cancel-button={true}
                                propsConfirm-button-text={self.confirm.buttonLabels[1]}
                                propsCancel-button-text={self.confirm.buttonLabels[0]}
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                onConfirm={self.conConfirm}
                                onCancel={self.conCancel}
                                onClick-overlay={self.dialogCancel}
                            ></Dialog.Component>
                        );
                        break;
                    case 'alert':
                        innerDOM = (
                            <Dialog.Component
                                id="ejs-ui-alert"
                                propsWidth={295}
                                propsValue={self.alert.show}
                                propsTitle={self.alert.title}
                                propsMessage={self.alert.message}
                                propsClose-on-click-overlay={self.alert.cancelable}
                                propsShow-cancel-button={false}
                                propsConfirm-button-text={self.alert.buttonName}
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                onConfirm={self.alertConfirm}
                                onCancel={self.alertConfirm}
                                onClick-overlay={self.dialogCancel}
                            ></Dialog.Component>
                        );
                        break;
                    case 'prompt':
                        innerDOM = (
                            <Dialog.Component
                                id="ejs-ui-prompt"
                                propsValue={self.prompt.show}
                                propsWidth={295}
                                propsTitle={self.prompt.title}
                                propsClose-on-click-overlay={self.prompt.cancelable}
                                propsShow-cancel-button={true}
                                propsConfirm-button-text={self.prompt.buttonLabels[1]}
                                propsCancel-button-text={self.prompt.buttonLabels[0]}
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                onConfirm={self.promptConfirm}
                                onCancel={self.promptCancel}
                                onClick-overlay={self.dialogCancel}
                            >
                                <Field
                                    propsValue={self.prompt.value}
                                    propsType={self.prompt.autosize.maxHeight / 24 === 1 ? 'text' : 'textarea'}
                                    propsAutosize={self.prompt.autosize}
                                    propsPlaceholder={self.prompt.hint}
                                    propsMaxlength={self.prompt.maxlength}
                                    onInput={self.promptInput}
                                />
                            </Dialog.Component>
                        );
                        break;
                    case 'actionSheet':
                        innerDOM = (
                            <ActionSheet
                                id="ejs-ui-actionSheet"
                                propsValue={self.actionSheet.show}
                                propsActions={self.actionSheet.actions}
                                propsCancelText={$t('取消')}
                                propsClose-on-click-overlay={self.actionSheet.cancelable}
                                onSelect={self.actionSheetSelect}
                                onCancel={self.actionSheetSelect}
                                onClick-overlay={self.dialogCancel}
                            />
                        );
                        break;
                    case 'pickDate':
                        innerDOM = (
                            <Popup
                                propsValue={self.pickDate.show}
                                propsPosition="bottom"
                                propsClose-on-click-overlay={false}
                                id={`ejs-ui-${self.type}`}
                                class="ejs-ui-pickdate"
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                onClick-overlay={self.cancel}
                            >
                                <DatetimePicker
                                    propsValue={self.pickDate.value}
                                    propsType={self.pickDate.type}
                                    propsTitle={self.pickDate.title}
                                    propsMinDate={self.pickDate.minDate}
                                    propsMaxDate={self.pickDate.maxDate}
                                    propsSwipe-duration={500}
                                    propsConfirm-button-text={$t('确定')}
                                    propsCancel-button-text={$t('取消')}
                                    onConfirm={self.pickDateConfirm}
                                    onCancel={self.cancel}
                                />
                            </Popup>
                        );
                        break;
                    case 'pickTime':
                        innerDOM = (
                            <Popup
                                propsValue={self.pickTime.show}
                                propsPosition="bottom"
                                propsClose-on-click-overlay={false}
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                id="ejs-ui-pickTime"
                                class="ejs-ui-pickdate"
                                onClick-overlay={self.cancel}
                            >
                                <DatetimePicker
                                    propsValue={self.pickTime.value}
                                    propsType="time"
                                    propsTitle={self.pickTime.title}
                                    propsMin-hour={self.pickTime.minHour}
                                    propsMax-hour={self.pickTime.maxHour}
                                    propsMin-minute={self.pickTime.minMinute}
                                    propsMax-minute={self.pickTime.maxMinute}
                                    propsSwipe-duration={500}
                                    propsConfirm-button-text={$t('确定')}
                                    propsCancel-button-text={$t('取消')}
                                    onConfirm={self.pickTimeConfirm}
                                    onCancel={self.cancel}
                                />
                            </Popup>
                        );
                        break;
                    case 'pickDateTime':
                        innerDOM = (
                            <Popup
                                propsValue={self.pickDateTime.show}
                                propsPosition="bottom"
                                propsClose-on-click-overlay={false}
                                id={`ejs-ui-${self.type}`}
                                class="ejs-ui-pickdate"
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                onClick-overlay={self.cancel}
                            >
                                <Picker
                                    propsTitle={self.pickDateTime.title}
                                    propsSwipe-duration={500}
                                    propsShow-toolbar
                                    propsColumns={self.pickDateTime.columns}
                                    propsConfirm-button-text={$t('确定')}
                                    propsCancel-button-text={$t('取消')}
                                    onConfirm={
                                        self.pickDateTime.showSecond
                                            ? self.pickDateFullTimeConfirm
                                            : self.pickDateTimeConfirm
                                    }
                                    onCancel={self.cancel}
                                    onChange={
                                        self.pickDateTime.showSecond
                                            ? self.pickDateFullTimeChange
                                            : self.pickDateTimeChange
                                    }
                                />
                            </Popup>
                        );
                        break;
                    case 'popPicker':
                        innerDOM = (
                            <Popup
                                propsValue={self.popPicker.show}
                                propsPosition="bottom"
                                propsClose-on-click-overlay={false}
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                id="ejs-ui-popPicker"
                                onClick-overlay={self.cancel}
                            >
                                <Picker
                                    propsShow-toolbar
                                    propsSwipe-duration={500}
                                    propsColumns={self.popPicker.columns}
                                    propsConfirm-button-text={$t('确定')}
                                    propsCancel-button-text={$t('取消')}
                                    onConfirm={self.popPickerConfirm}
                                    onCancel={self.cancel}
                                />
                            </Popup>
                        );
                        break;
                    case 'showWaiting':
                        innerDOM = (
                            <Popup
                                propsValue={self.showWaiting.show}
                                id="ejs-ui-showWaiting"
                                propsClose-on-click-overlay={false}
                                onClick-overlay={self.cancel}
                                onClick={!self.showWaiting.padlock ? self.cancel : () => { }}
                                overlay={false}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'transparent',
                                    zIndex: '10001'
                                }}
                                class="ejs-ui-waiting"
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-57.5px',
                                        marginLeft: '-70px',
                                        width: '140px',
                                        height: '115px',
                                        backgroundColor: '#000',
                                        opacity: '0.7',
                                        borderRadius: '10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            width: '100%',
                                            height: '100%',
                                            padding: '30px 0 20px',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                margin: '0 auto 24px',
                                                width: '36px',
                                                height: '14px'
                                            }}
                                        >
                                            {[1, 2, 3].map((item, index) => {
                                                return (
                                                    <span
                                                        style={{
                                                            backgroundColor: '#fff',
                                                            height: '100%',
                                                            width: '3px',
                                                            transform: 'skewX(-15deg)',
                                                            animationFillMode: 'forwards',
                                                            animation: 'wave 0.6s 0s infinite linear',
                                                            animationDelay:
                                                                index === 0 ? '0' : index === 1 ? '0.2s' : '0.4s'
                                                        }}
                                                    ></span>
                                                );
                                            })}
                                        </div>
                                        <div style={{ color: '#fff', fontSize: '15px' }}>
                                            {self.showWaiting.message}
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        );
                        break;
                    case 'select':
                        var _innerSelect: VNode | string = '';

                        if (self.select.type === 'select') {
                            // 单选
                            _innerSelect = (
                                <RadioGroup propsValue={self.select.value}>
                                    <CellGroup>
                                        {self.select.items.map((item) => {
                                            const clickEvent = () => {
                                                self.select.value = item;
                                                self.selectConfirm();
                                            };

                                            return (
                                                <Cell
                                                    propsTitle={item}
                                                    propsClickable
                                                    onClick={clickEvent}
                                                    class={{ fontActive: self.select.value === item }}
                                                >
                                                    <Radio name={item} slot="right-icon" />
                                                </Cell>
                                            );
                                        })}
                                    </CellGroup>
                                </RadioGroup>
                            );
                        } else if (self.select.type === 'selectMulti') {
                            // 多选
                            var _innerCell: VNode;

                            if (self.select.isShowSelectAll) {
                                const selectAll = () => {
                                    if (self.select.value.length === self.select.items.length) {
                                        self.select.value = [];
                                    } else {
                                        self.select.value = self.select.items.slice(0);
                                    }
                                };

                                // 展示全选
                                _innerCell = (
                                    <Cell
                                        propsTitle="全选"
                                        propsClickable
                                        onClick={selectAll}
                                        class={{
                                            fontActive: self.select.value.length === self.select.items.length
                                        }}
                                    >
                                        <Checkbox
                                            propsValue={self.select.value.length === self.select.items.length}
                                            propsName="all"
                                            slot="right-icon"
                                            propsShape="square"
                                            propsBindGroup={false}
                                        />
                                    </Cell>
                                );
                            }
                            _innerSelect = (
                                <div>
                                    <CheckboxGroup propsValue={self.select.value}>
                                        <CellGroup style={{ maxHeight: '292px' }}>
                                            {_innerCell}
                                            {self.select.items.map((item) => {
                                                const clickEvent = () => {
                                                    const k = self.select.value.indexOf(item);

                                                    if (k > -1) {
                                                        self.select.value.splice(k, 1);
                                                    } else {
                                                        self.select.value.push(item);
                                                    }
                                                };

                                                return (
                                                    <Cell
                                                        propsTitle={item}
                                                        propsClickable
                                                        onClick={clickEvent}
                                                        class={{
                                                            fontActive: self.select.value.indexOf(item) > -1
                                                        }}
                                                    >
                                                        <Checkbox
                                                            propsName={item}
                                                            slot="right-icon"
                                                            propsShape="square"
                                                        />
                                                    </Cell>
                                                );
                                            })}
                                        </CellGroup>
                                    </CheckboxGroup>
                                    <div style={{ padding: '10px 20px' }}>
                                        <div
                                            style={{
                                                height: '44px',
                                                width: '100%',
                                                lineHeight: '44px',
                                                fontSize: '16px',
                                                textAlign: 'center',
                                                borderRadius: '22px'
                                            }}
                                            class="ejs-ui-btn-custom"
                                            onClick={self.selectConfirm}
                                        >
                                            {$t('确定')}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        innerDOM = (
                            <Popup
                                propsValue={self.select.show}
                                propsPosition="bottom"
                                propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                propsClose-on-click-overlay={self.select.cancelable}
                                id={`ejs-ui-${self.select.type}`}
                                class="ejs-ui-select"
                                propsCloseable={true}
                                onClick-overlay={self.cancel}
                                onClick={self.clickPop}
                            >
                                <h5
                                    style={{
                                        color: '#2e3033',
                                        fontSize: '16px',
                                        paddingLeft: '20px',
                                        height: '44px',
                                        lineHeight: '44px',
                                        borderBottom: '0.5px solid #ebedf0',
                                        marginBottom: '10px'
                                    }}
                                >
                                    {self.select.title}
                                </h5>
                                {_innerSelect}
                            </Popup>
                        );

                        if (self.select.type === 'selectSingleSP') {
                            // 九宫格
                            let items = [[]];
                            let i = 0;

                            self.select.items.forEach((item) => {
                                if (items[i].length >= self.select.columns) {
                                    i += 1;
                                    items.push([]);
                                }
                                items[i].push(item);
                            });

                            _innerSelect = (
                                <RadioGroup propsValue={self.select.value}>
                                    <CellGroup>
                                        {items.map((item) => (
                                            <Row>
                                                {item.map((ele) => {
                                                    const clickEvent = () => {
                                                        self.select.value = ele;
                                                    };

                                                    return (
                                                        <Col propsSpan={24 / self.select.columns}>
                                                            <Cell propsTitle={ele} propsClickable onClick={clickEvent}>
                                                                <Radio
                                                                    name={ele}
                                                                    propsChecked-color="rgb(36, 99, 224)"
                                                                    slot="right-icon"
                                                                />
                                                            </Cell>
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                        ))}
                                    </CellGroup>
                                </RadioGroup>
                            );

                            innerDOM = (
                                <Dialog.Component
                                    id={`ejs-ui-${self.select.type}`}
                                    propsValue={self.select.show}
                                    propsTitle={self.select.title}
                                    propsClose-on-click-overlay={self.select.cancelable}
                                    propsShow-cancel-button={true}
                                    propsOverlay-style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                                    propsConfirm-button-text={$t('确定')}
                                    propsCancel-button-text={$t('取消')}
                                    onConfirm={self.selectConfirm}
                                    onCancel={self.cancel}
                                    onClick-overlay={self.dialogCancel}
                                >
                                    {_innerSelect}
                                </Dialog.Component>
                            );
                        }
                        break;
                }

                return <div id="ejs-ui">{innerDOM}</div>;
            },
            watch: {
                'pickDateTime.innerValue'(val, oldVal) {
                    this.pickDateTime.columns = getColumns(
                        this.pickDateTime.minDate,
                        this.pickDateTime.maxDate,
                        val,
                        this.pickDateTime.showSecond
                    );
                }
            },
            methods: {
                // 校验时间值
                correctValue(value) {
                    // date type
                    value = new Date(Math.max(value.getTime(), this.pickDateTime.minDate.getTime()));
                    value = new Date(Math.min(value.getTime(), this.pickDateTime.maxDate.getTime()));

                    return value;
                },
                conConfirm() {
                    let self = this;
                    const result = {
                        which: 1
                    };
                    clearTimeout(this.timer);
                    this.confirm.show = false;
                    this.timer = setTimeout(() => {
                        self.success(result);
                    }, 300);
                },
                conCancel() {
                    let self = this;
                    const result = {
                        which: 0
                    };
                    clearTimeout(this.timer);
                    this.confirm.show = false;
                    this.timer = setTimeout(() => {
                        self.success(result);
                    }, 300);
                },
                dialogCancel() {
                    let type = this.type;

                    if (this[type].cancelable) {
                        this[type].show = false;
                    }
                },
                alertConfirm() {
                    this.alert.show = false;
                    this.success({});
                },
                promptConfirm() {
                    const result = {
                        which: 1,
                        content: this.prompt.value
                    };

                    this.prompt.show = false;
                    this.success(result);
                },
                promptCancel() {
                    const result = {
                        which: 0,
                        content: this.prompt.value
                    };

                    this.prompt.show = false;
                    this.success(result);
                },
                promptInput(value) {
                    this.prompt.value = value;
                },
                actionSheetSelect(item) {
                    let result = {};
                    if (item) {
                        const index = this.actionSheet.actions.indexOf(item);
                        result = {
                            which: index,
                            content: item.name
                        };
                    } else {
                        result = {
                            which: -1,
                            content: ''
                        };
                    }

                    this.actionSheet.show = false;
                    this.success(result);
                },
                pickDateFullTimeConfirm(value) {
                    let nyr = value[0].substring(0, 10);
                    let week = value[0].substring(11, 13);
                    let result = {
                        datetime: `${nyr} ${value[1]}:${value[2]}:${value[3]}`,
                        week: week
                    };

                    this.pickDateTime.show = false;
                    this.success(result);
                },
                pickDateConfirm(value) {
                    let result = {};
                    const date = new Date(value);
                    const year = date.getFullYear();
                    const month = paddingWith0(date.getMonth() + 1);
                    const day = paddingWith0(date.getDate());

                    if (this.pickDate.type === 'date') {
                        result = {
                            date: `${year}-${month}-${day}`
                        };
                    } else {
                        result = {
                            month: `${year}-${month}`
                        };
                    }
                    this.pickDate.show = false;
                    this.success(result);
                },
                pickDateTimeConfirm(value) {
                    let nyr = value[0].substring(0, 10);
                    let week = value[0].substring(11, 13);
                    let result = {
                        datetime: `${nyr} ${value[1]}:${value[2]}`,
                        week: week
                    };

                    this.pickDateTime.show = false;
                    this.success(result);
                },
                pickDateTimeChange(v) {
                    let val = v.getValues();

                    val = `${val[0].substring(0, 10)} ${val[1]}:${val[2]}`;
                    this.pickDateTime.innerValue = this.correctValue(new Date(val.replace(/-/g, '/')));
                },
                pickDateFullTimeChange(v) {
                    let val = v.getValues();

                    val = `${val[0].substring(0, 10)} ${val[1]}:${val[2]}:${val[3]}`;

                    this.pickDateTime.innerValue = this.correctValue(new Date(val.replace(/-/g, '/')));
                },
                pickTimeConfirm(value) {
                    const result = {
                        time: value
                    };

                    this.pickTime.show = false;
                    this.success(result);
                },
                popPickerConfirm(item, values) {
                    let res = item;

                    if (Array.isArray(item)) {
                        res = this.QueryPickerData(this.popPicker.columns, values);
                    } else {
                        res = [item];
                    }
                    const result = {
                        items: res
                    };

                    this.popPicker.show = false;
                    this.success(result);
                },
                QueryPickerData(data, values) {
                    const self = this;
                    let arr = [
                        {
                            text: data[values[0]].text,
                            value: data[values[0]].value
                        }
                    ];

                    if (values.length > 1) {
                        return arr.concat(
                            self.QueryPickerData(data[values[0]].children, values.slice(1, values.length))
                        );
                    } else {
                        return arr;
                    }
                },
                selectConfirm() {
                    let result = {};
                    const self = this;

                    if (Array.isArray(self.select.value)) {
                        const choiceState = self.select.items.map((item) => {
                            if (self.select.value.indexOf(item) > -1) {
                                return '1';
                            }

                            return '0';
                        });

                        result = {
                            choiceState,
                            choiceContent: this.select.value
                        };
                    } else {
                        const index = self.select.items.indexOf(this.select.value);

                        result = {
                            which: index,
                            content: this.select.value
                        };
                    }

                    this.select.show = false;

                    this.success(result);
                },
                clickPop(e) {
                    if (e.target.classList.contains('van-popup__close-icon')) {
                        this.select.show = false;
                    }
                },
                cancel() {
                    let type = this.type;

                    this[type].show = false;
                },
                success(result) {
                    this[this.type].success && this[this.type].success(result);
                    this[this.type].resolve && this[this.type].resolve(result);
                }
            },
            mounted() {
                var _this = this;
                let type = this.type;

                setTimeout(() => {
                    _this[type].show = true;
                }, 300);

                // 路由变化时，关闭弹窗
                window.addEventListener(
                    'popstate',
                    () => {
                        Object.keys(vueData).forEach((k) => {
                            if (k !== 'type') {
                                this[k].show = false;
                            }
                        });
                    },
                    false
                );
            }
        }).$mount();

        document.body.appendChild(vnode.$el);

        return vnode;
    };

    if (!document.querySelector('#ejs-ui')) {
        Vue.prototype.$ejsUI = createPickDate();
    } else {
        let type = vueData.type;

        setTimeout(() => {
            // 优化组件间切换过渡
            Vue.prototype.$ejsUI[type].show = true;
        }, 10);
    }

    if (method === 'showWaiting') {
        options.success && options.success();
        resolve && resolve();
    }
}
