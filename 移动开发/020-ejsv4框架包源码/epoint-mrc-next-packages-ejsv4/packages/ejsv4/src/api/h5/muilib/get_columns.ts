import paddingWith0 from './paddingwith0';

let option: {
    minDate: Date;
    maxDate: Date;
} = {
    minDate: null,
    maxDate: null
};
let nowValue: Date;
let weekDay: string[];

function getMonthEndDay(year, month) {
    return 32 - new Date(year, month - 1, 32).getDate();
}

function times(n, iteratee) {
    var index = -1;
    var result = Array(n);

    while (++index < n) {
        result[index] = iteratee(index);
    }

    return result;
}

function formatDate(year, month, date) {
    const week = weekDay[new Date(year, month - 1, date).getDay()];

    return year + '-' + paddingWith0(month) + '-' + paddingWith0(date) + ' ' + week;
}

function getBoundary(type, value) {
    let _ref;

    const boundary = option[`${type}Date`];
    const year = boundary.getFullYear();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;
    let second = 0;

    if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
        second = 59;
    }

    if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
            date = boundary.getDate();

            if (value.getDate() === date) {
                hour = boundary.getHours();

                if (value.getHours() === hour) {
                    minute = boundary.getMinutes();

                    if (value.getMinutes() === minute) {
                        second = boundary.getSeconds();
                    }
                }
            }
        }
    }

    return (
        (_ref = {}),
        (_ref[`${type}Year`] = year),
        (_ref[`${type}Month`] = month),
        (_ref[`${type}Date`] = date),
        (_ref[`${type}Hour`] = hour),
        (_ref[`${type}Minute`] = minute),
        (_ref[`${type}Second`] = second),
        _ref
    );
}

function ranges() {
    var _this$getBoundary = getBoundary('max', nowValue),
        maxYear = _this$getBoundary.maxYear,
        maxDate = 31,
        maxMonth = 12,
        maxHour = _this$getBoundary.maxHour,
        maxMinute = _this$getBoundary.maxMinute,
        maxSecond = _this$getBoundary.maxSecond;

    var _this$getBoundary2 = getBoundary('min', nowValue),
        minYear = _this$getBoundary2.minYear,
        minDate = 1,
        minMonth = 1,
        minHour = _this$getBoundary2.minHour,
        minMinute = _this$getBoundary2.minMinute,
        minSecond = _this$getBoundary2.minSecond;

    var result = [
        {
            type: 'year',
            range: [minYear, maxYear]
        },
        {
            type: 'month',
            range: [minMonth, maxMonth]
        },
        {
            type: 'day',
            range: [minDate, maxDate]
        },
        {
            type: 'hour',
            range: [minHour, maxHour]
        },
        {
            type: 'minute',
            range: [minMinute, maxMinute]
        },
        {
            type: 'second',
            range: [minSecond, maxSecond]
        }
    ];

    return result;
}

function originColumns() {
    var rangesData = ranges();

    return rangesData.map(function (_ref) {
        var type = _ref.type,
            rangeArr = _ref.range;
        var values = times(rangeArr[1] - rangeArr[0] + 1, function (index) {
            var value = rangeArr[0] + index;

            return value;
        });

        return {
            type: type,
            values: values
        };
    });
}

function columns(isFull) {
    var originColumnsData = originColumns();
    var changeColumns = isFull ? originColumnsData.slice(-3) : originColumnsData.slice(-3, -1);
    var maxDate = option.maxDate.getDate(),
        maxMonth = option.maxDate.getMonth() + 1,
        maxYear = option.maxDate.getFullYear(),
        minDate = option.minDate.getDate(),
        minMonth = option.minDate.getMonth() + 1,
        minYear = option.minDate.getFullYear();
    var col1: string[] = [];

    originColumnsData[0].values.forEach(function (year) {
        originColumnsData[1].values.forEach(function (month) {
            if ((maxYear === year && month > maxMonth) || (minYear === year && month < minMonth)) {
                //
            } else {
                originColumnsData[2].values.forEach(function (date) {
                    if (
                        (maxYear === year && month === maxMonth && date > maxDate) ||
                        (minYear === year && month === minMonth && date < minDate) ||
                        date > getMonthEndDay(year, month)
                    ) {
                        //
                    } else {
                        col1.push(formatDate(year, month, date));
                    }
                });
            }
        });
    });

    changeColumns = [
        {
            type: 'day',
            values: col1
        }
    ].concat(changeColumns);

    return changeColumns.map(function (column) {
        var index = 0;

        if (column.type === 'day') {
            var now = formatDate(nowValue.getFullYear(), nowValue.getMonth() + 1, nowValue.getDate());

            index = column.values.indexOf(now);
        }

        if (column.type === 'hour') {
            index = column.values.indexOf(nowValue.getHours());
            column.values = column.values.map((ele) => paddingWith0(ele));
        }

        if (column.type === 'minute') {
            index = column.values.indexOf(nowValue.getMinutes());
            column.values = column.values.map((ele) => paddingWith0(ele));
        }

        if (column.type === 'second') {
            index = column.values.indexOf(nowValue.getSeconds());
            column.values = column.values.map((ele) => paddingWith0(ele));
        }

        return {
            values: column.values,
            defaultIndex: index
        };
    });
}

function getColumns(minDate, maxDate, innerValue, isFull) {
    const noop = (info) => info;
    const $t = (window.di18n && window.di18n.$t.bind(window.di18n)) || noop;
    weekDay = [$t('周日'), $t('周一'), $t('周二'), $t('周三'), $t('周四'), $t('周五'), $t('周六')];

    var min = minDate;
    var max = maxDate;

    min = Math.max(innerValue.getTime() - 6 * 30 * 24 * 60 * 60 * 1000, min.getTime());
    max = Math.min(innerValue.getTime() + 6 * 30 * 24 * 60 * 60 * 1000, max.getTime());

    option.minDate = new Date(min);
    option.maxDate = new Date(max);

    nowValue = innerValue;

    return columns(isFull);
}

export { getColumns, getMonthEndDay };
