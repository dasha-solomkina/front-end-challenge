import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import fetchGraphArray, { GraphDataProps } from '../store/dataGraph.ts';

export default function Chart() {
  const [fetchedGraphArray, setFetchedGraphArray] = useState<
    GraphDataProps[] | null
  >(null);
  //   const [loading, setLoading] = useState(true); // TODO: implement later

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGraphArray();
        setFetchedGraphArray(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      //   finally {
      //     setLoading(false);
      //   }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fetchedGraphArray) {
      const chartDom = document.getElementById('main')!;
      const myChart = echarts.init(chartDom);

      const fetchedDates = fetchedGraphArray?.map((obj) => {
        const originalDate = new Date(obj.date);
        const month = originalDate.toLocaleString('en-US', { month: 'short' });
        const year = originalDate.toLocaleString('en-US', { year: '2-digit' });
        const formattedDate = `${month}/${year}`;
        return formattedDate;
      });
      const fetchedCounts = fetchedGraphArray?.map((obj) => obj.count);

      type EChartsOption = echarts.EChartsOption;

      const option: EChartsOption = {
        xAxis: {
          type: 'category',
          data: fetchedDates,
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontFamily: 'Inter',
            fontSize: 12,
          },
          axisLine: {
            lineStyle: {
              color: '#666666', // Set the color to grey
              width: 1.25,
            },
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 90,
          interval: 15,
          axisLabel: {
            fontFamily: 'Inter',
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              color: '#e4e4e4',
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: `<div style="font-family: Inter; font-size: 12px; line-height: 1.6; color: #666666;">
          {b} <br /><span style="font-family: Inter; font-size: 12px; font-weight: 400; color: #000000;">{c} feedback records</span> </div>`,
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '10%',
          width: 'auto',
        },
        series: [
          {
            data: fetchedCounts,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#7a8ad1',
              width: 2.5,
            },
            showSymbol: false,
            emphasis: {
              focus: 'series',
              itemStyle: {
                color: '#7a8ad1',
                borderColor: '#7a8ad1',
                borderWidth: 5,
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [fetchedGraphArray]);

  return (
    <div className="header">
      <h1>User feedback</h1>
      <div id="main"></div>
    </div>
  );
}
