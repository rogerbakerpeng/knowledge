let pickdateStyle = document.createElement('style');

pickdateStyle.textContent = `
    .ejs-ui-pickdate .van-picker{
        padding: 52px 0 70px;
    }
    
    .ejs-ui-pickdate .van-picker .van-picker__toolbar{
        position: absolute;
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        bottom: 0;
        padding: 10px 20px 20px;
    }

    .ejs-ui-pickdate .van-picker .van-picker__toolbar button{
        width: calc(50% - 14px);
        border-radius: 22px;
        font-size: 15px;
    }

    .ejs-ui-pickdate .van-picker .van-picker__toolbar .van-picker__cancel{
        border: 1px solid #969799;
        color: #2e3033;
    }

    .ejs-ui-pickdate .van-picker .van-picker__toolbar .van-picker__confirm{
        background-color: #2463e0;
        color: #fff;
    }
    
    .ejs-ui-pickdate .van-picker .van-picker__title{
        position: absolute;
        top: -300px;
    }
    
    .ejs-ui-pickdate .van-picker .van-picker__columns{
        height: 264px !important;
        color: #2E3033;
        border-top: 1px solid #ebedf0;
        padding: 0 20px;
    }
    `;
pickdateStyle.id = 'pickdateStyle';

let pickdatetimeStyle = document.createElement('style');

pickdatetimeStyle.textContent = `
    #ejs-ui-pickDateTime .van-picker .van-picker-column:nth-child(1){
        flex: 2;
    }
`;
pickdatetimeStyle.id = 'pickdatetimeStyle';

let selectStyle = document.createElement('style');

selectStyle.textContent = `
    .ejs-ui-select .van-cell-group{
        max-height: 376px;
        overflow: scroll;
    }
    .ejs-ui-select .van-cell-group::after{
        border: none;
    }
    .ejs-ui-select .van-cell-group .van-cell{
        padding: 10px 20px;
        font-size: 16px;
        color: #2e3033;
    }
    .ejs-ui-select .van-cell-group .van-cell::after{
        border-bottom: none;
    }
    .ejs-ui-select .van-cell-group .van-cell .van-radio__icon .van-icon{
        border: none;
    }
    .ejs-ui-select .van-popup__close-icon{
        color: #2e3033;
    }
    .ejs-ui-select .van-checkbox__icon--checked .van-icon,
    .ejs-ui-select .van-radio__icon--checked .van-icon{
        background-color: #2463e0;
    }
    .ejs-ui-select .van-cell-group .fontActive{
        color: #2463e0;
    }
`;
selectStyle.id = 'selectStyle';

let dialogStyle = document.createElement('style');

dialogStyle.textContent = `
    .van-dialog{
        border-radius: 1px;
    }
    .van-dialog__header{
        font-size: 18px;
        color: #2e3033;
        font-weight: bold;
    }
    .van-dialog__footer{
        padding: 8px 22px 16px;
    }
    .van-dialog__footer .van-button{
        border-radius: 18px;
        height: 36px;
    }
    .van-dialog__footer .van-dialog__cancel{
        border: 1px solid #ebedf0;
        margin-right: 16px;
        background: #fff;
        color: #2e3033;
    }
    .van-dialog__footer .van-dialog__confirm{
        background-color: rgb(36, 99, 224);
        color: #fff;
    }
    .van-dialog__footer .van-button__text{
        font-size: 14px;
    }
    .van-dialog__message{
        padding-top: 29px;
        padding-bottom: 13px;
        font-size: 18px;
        color: #2e3033;
        line-height: 24px;
    }
    .van-dialog__message--has-title{
        padding-top: 4.267vw;
        font-size: 16px;
    }
    .van-dialog__content .van-field{
        padding: 30px 36px 38px;
    }
    .van-dialog__content .van-radio-group{
        padding: 20px 20px 28px;
    }
    .van-hairline--top::after{
        border-top-width: 0 !important;
    }
    .van-hairline--left::after{
        border-left-width: 0;
    }
    [class*=van-hairline]::after{
        border: none;
    }
    input.van-field__control{
        border: none;
        margin: 0;
        padding: 0;
        height: 24px;
    }
`;
dialogStyle.id = 'dialogStyle';

let skinStyle = document.createElement('style');

skinStyle.textContent = `
    .ejs-ui-btn-custom {
        background-color: #2463e0;
        background-color: var(--baseBlue, #2463e0);
        color: #fff;
        color: var(--baseFontWithe, #fff);
    }
  
    .ejs-ui-waiting {
        background-color: #000;
        background-color: var(--baseBgBlack, #000);
    }

    @keyframes wave {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            opacity: 0.3;
        }
    }
`;
skinStyle.id = 'skinStyle';

export { pickdateStyle, pickdatetimeStyle, selectStyle, dialogStyle, skinStyle };
