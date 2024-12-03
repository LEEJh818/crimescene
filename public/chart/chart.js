document.addEventListener('DOMContentLoaded', () => {
    // Apache ECharts로 그래프 생성
    var regionChart = echarts.init(document.getElementById('regionChart'));
    var crimeStatsChart = echarts.init(document.getElementById('crimeStatsChart'));
    var crimeByTimeChart = echarts.init(document.getElementById('crimeByTime'));
    var crimeByDayChart = echarts.init(document.getElementById('crimeByDay'));
    var crimeByYearChart = echarts.init(document.getElementById('crimeByYear'));
    var safetyScoreChart = echarts.init(document.getElementById('safetyScoreChart'));

    // 지역별 범죄 발생건수 및 인구수 데이터 설정
    var regionCrimeData = {
        '서울': 305909,
        '부산': 119267,
        '대구': 75707,
        '인천': 93347,
        '광주': 44102,
        '대전': 45047,
        '울산': 34128,
        '세종': 6095,
        '경기도': 385160,
        '강원': 34924,
        '충북': 35876,
        '충남': 51259,
        '전북': 43730,
        '전남': 37825,
        '경북': 64400,
        '경남': 89403,
        '제주': 27594
    };

    var regionPopulationData = {
        '서울': 9384325,
        '부산': 3290964,
        '대구': 2373844,
        '인천': 3000454,
        '광주': 1418241,
        '대전': 1441562,
        '울산': 1103402,
        '세종': 386944,
        '경기도': 13635250,
        '강원': 1526243,
        '충북': 1592155,
        '충남': 2130509,
        '전북': 1752921,
        '전남': 1802672,
        '경북': 2551370,
        '경남': 3248703,
        '제주': 674353
    };

    var regionSafetyScores = {
        '서울': 78.76129032,
        '부산': 76.60666667,
        '대구': 76.68,
        '인천': 76.09,
        '광주': 77.1,
        '대전': 77.71666667,
        '울산': 75.925,
        '세종': 76.9,
        '경기도': 77.82790698,
        '강원': 80.81176471,
        '충북': 80.45,
        '충남': 78.56666667,
        '전북': 81.56666667,
        '전남': 82.68571429,
        '경북': 81.375,
        '경남': 80.62173913,
        '제주': 81.1
    };

    // 범죄 종류별 통계 데이터 설정
    var crimeTypes = ['강력범죄', '절도범죄', '폭력범죄', '지능범죄', '풍속범죄', '특별경제범죄', '마약범죄', '보건범죄', '환경범죄', '교통범죄', '노동범죄', '안보범죄', '선거범죄', '병역범죄', '기타범죄'];
    var crimeIncidents = [11330, 44229, 105946, 257120, 11774, 22383, 2070, 2423, 646, 56082, 85, 56, 101, 2477, 55271];
    var crimeClearances = [10786, 29427, 92522, 131752, 9634, 17981, 1885, 2355, 606, 54051, 73, 49, 65, 1862, 47661];

    // 발생건수 대비 검거건수 비율 계산
    var clearanceRates = [];
    for (var i = 0; i < crimeIncidents.length; i++) {
        clearanceRates.push((crimeClearances[i] / crimeIncidents[i]) * 100);
    }

    // 시간대별 범죄 발생건수 데이터 설정
    var timeRanges = ['0:00 - 2:59', '3:00 - 5:59', '6:00 - 8:59', '9:00 - 11:59', '12:00 - 14:59', '15:00 - 17:59', '18:00 - 20:59', '21:00 - 23:59', '미상'];
    var crimeByTimeData = [94095, 86471, 88488, 183235, 169090, 172107, 175503, 204508, 438409];

    // 요일별 범죄 발생건수 데이터 설정
    var daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var crimeByDayData = [185520, 242481, 241591, 240590, 241974, 251352, 208398];

    // 연도별 전체 범죄 발생건수 데이터 설정
    var years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
    var crimeByYearData = [1997, 2069, 2098, 2003, 2054, 1964, 1867, 1916, 2012, 2015, 1774, 1943];

    // 그래프 옵션 설정
    var regionOption = {
        tooltip: {},
        legend: {
            data: ['범죄 발생건수', '인구수'],
            textStyle: {
                fontSize: 16
            }
        },
        xAxis: {
            data: Object.keys(regionCrimeData),
            axisLabel: {
                fontSize: 16
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '범죄 발생건수',
                axisLabel: {
                    fontSize: 16
                }
            },
            {
                type: 'value',
                name: '인구수',
                axisLabel: {
                    fontSize: 16
                }
            }
        ],
        series: [
            {
                name: '범죄 발생건수',
                type: 'bar',
                data: Object.values(regionCrimeData),
                label: {
                    show: false, // 숫자 숨기기
                    fontSize: 16
                }
            },
            {
                name: '인구수',
                type: 'line',
                yAxisIndex: 1,
                data: Object.values(regionPopulationData),
                label: {
                    show: false, // 숫자 숨기기
                    fontSize: 16
                }
            }
        ]
    };

    var crimeOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 16
            },
            formatter: function (params) {
                if (params[0].seriesName === '검거율') {
                    return params[0].name + '<br>' +
                        params[0].seriesName + ': ' + params[0].data.toFixed(2) + '%';
                } else {
                    return params[0].name + '<br>' +
                        params[0].seriesName + ': ' + params[0].data + '<br>' +
                        params[1].seriesName + ': ' + params[1].data;
                }
            }
        },
        legend: {
            data: ['범죄 발생건수', '검거건수', '검거율'],
            textStyle: {
                fontSize: 16
            }
        },
        xAxis: {
            type: 'category',
            data: crimeTypes,
            axisLabel: {
                fontSize: 16
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '건수',
                axisLabel: {
                    fontSize: 16
                }
            },
            {
                type: 'value',
                name: '비율 (%)',
                axisLabel: {
                    fontSize: 16
                }
            }
        ],
        series: [
            {
                name: '범죄 발생건수',
                type: 'bar',
                data: crimeIncidents,
                label: {
                    show: false, // 숫자 숨기기
                    fontSize: 16
                }
            },
            {
                name: '검거건수',
                type: 'bar',
                data: crimeClearances,
                label: {
                    show: false, // 숫자 숨기기
                    fontSize: 16
                }
            },
            {
                name: '검거율',
                type: 'line',
                yAxisIndex: 1,
                data: clearanceRates,
                label: {
                    show: false, // 숫자 숨기기
                    fontSize: 16
                }
            }
        ]
    };

    var crimeByTimeOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            textStyle: {
                fontSize: 16
            }
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: timeRanges,
            textStyle: {
                fontSize: 16
            }
        },
        series: [
            {
                name: 'Crime Incidents',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 94095, name: '0:00 - 2:59' },
                    { value: 86471, name: '3:00 - 5:59' },
                    { value: 88488, name: '6:00 - 8:59' },
                    { value: 183235, name: '9:00 - 11:59' },
                    { value: 169090, name: '12:00 - 14:59' },
                    { value: 172107, name: '15:00 - 17:59' },
                    { value: 175503, name: '18:00 - 20:59' },
                    { value: 204508, name: '21:00 - 23:59' },
                    { value: 438409, name: '미상' }
                ]
            }
        ]
    };

    var crimeByDayOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            textStyle: {
                fontSize: 16
            }
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: daysOfWeek,
            textStyle: {
                fontSize: 16
            }
        },
        series: [
            {
                name: 'Crime Incidents',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 30,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 185520, name: '일요일' },
                    { value: 242481, name: '월요일' },
                    { value: 241591, name: '화요일' },
                    { value: 240590, name: '수요일' },
                    { value: 241974, name: '목요일' },
                    { value: 251352, name: '금요일' },
                    { value: 208398, name: '토요일' }
                ]
            }
        ]
    };

    var crimeByYearOption = {
        tooltip: {
            trigger: 'axis',
            textStyle: {
                fontSize: 16
            }
        },
        xAxis: {
            type: 'category',
            data: years,
            axisLabel: {
                fontSize: 16
            }
        },
        yAxis: {
            type: 'value',
            name: '건/인구 십만 명당',
            axisLabel: {
                fontSize: 16
            }
        },
        series: [{
            data: crimeByYearData,
            type: 'line',
            label: {
                show: false, // 숫자 숨기기
                fontSize: 16
            }
        }]
    };

    var safetyScoreOption = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}',
            textStyle: {
                fontSize: 16
            }
        },
        xAxis: {
            type: 'category',
            data: Object.keys(regionSafetyScores),
            axisLabel: {
                interval: 0,
                rotate: -45,
                fontSize: 16
            }
        },
        yAxis: {
            type: 'value',
            name: '종합체감안전도 점수',
            axisLabel: {
                fontSize: 16
            }
        },
        series: [{
            type: 'bar',
            data: Object.values(regionSafetyScores),
            label: {
                show: false, // 숫자 숨기기
                fontSize: 16
            }
        }]
    };

    // 그래프에 옵션 적용
    regionChart.setOption(regionOption);
    crimeStatsChart.setOption(crimeOption);
    crimeByTimeChart.setOption(crimeByTimeOption);
    crimeByDayChart.setOption(crimeByDayOption);
    crimeByYearChart.setOption(crimeByYearOption);
    safetyScoreChart.setOption(safetyScoreOption);
});
