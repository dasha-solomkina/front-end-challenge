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

      const fetchedDates = fetchedGraphArray?.map((obj) => obj.date);
      const fetchedCounts = fetchedGraphArray?.map((obj) => obj.count);

      const option = {
        xAxis: {
          type: 'category',
          data: fetchedDates,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: fetchedCounts,
            type: 'line',
            smooth: true,
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
