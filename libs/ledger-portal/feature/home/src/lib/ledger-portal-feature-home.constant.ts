import { EChartsOption } from 'echarts';

export const reportsChartsConfig = {
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'IRANSansFANum',
  },
  tooltip: {
    trigger: 'item',
    textStyle: {
      align: 'right',
    },
  },
  legend: {
    orient: 'vertical',
    top: '75%',
    padding: 0,
    align: 'right',
    icon: 'circle',
    textStyle: {
      fontSize: 10,
    },
  },
} as EChartsOption;
