import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { CircularProgress } from "@mui/material";

const Charts = ({ myKey }) => {
  const Status = Object.freeze({
    Error: -1,
    Loading: 0,
    Done: 1,
  });

  const [toggle, setToggle] = useState(Status.Loading)
  
  useEffect(() => {
    if (toggle !== Status.Done) return;

    window.Apex = {
      chart: {
        foreColor: "#ccc",
        toolbar: { show: false },
      },
      stroke: { width: 3 },
      dataLabels: { enabled: false },
      tooltip: { theme: "dark" },
      grid: {
        borderColor: "#535A6C",
        xaxis: { lines: { show: true } },
      },
    };

    const charts = [
      {
        id: "spark1",
        series: [{ data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21] }],
      },
      {
        id: "spark2",
        series: [{ data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69] }],
      },
      {
        id: "spark3",
        series: [{ data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19] }],
      },
      {
        id: "spark4",
        series: [{ data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61] }],
      },
    ];

    charts.forEach(({ id, series }) => {
      new ApexCharts(document.querySelector(`#${id}`), {
        chart: {
          id,
          group: "sparks",
          type: "line",
          height: 80,
          sparkline: { enabled: true },
          dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 },
        },
        series,
        stroke: { curve: "smooth" },
        markers: { size: 0 },
        grid: { padding: { top: 20, bottom: 10, left: 20 } },
        colors: ["#fff"],
        tooltip: { x: { show: false }, y: { title: { formatter: () => "" } } },
      }).render();
    });

    new ApexCharts(document.querySelector("#line-adwords"), {
      chart: { height: 300, type: "line", zoom: { enabled: false }},
      stroke: { curve: "smooth", width: 2 },
      series: [
        { name: "Music", data: [1, 15, 26, 20, 33, 27] },
        { name: "Photos", data: [3, 33, 21, 42, 19, 32] },
        { name: "Files", data: [0, 39, 52, 11, 29, 43] },
      ],
      title: { text: "Media", align: "left", offsetY: 25, offsetX: 20 },
      subtitle: { text: "Statistics", offsetY: 55, offsetX: 20 },
      xaxis: { tooltip: { enabled: false } },
    }).render();

    new ApexCharts(document.querySelector("#radialBarBottom"), {
      chart: { type: "radialBar", height: 300, width: 300},
      plotOptions: {
        radialBar: {
          hollow: { margin: 5, size: "48%", background: "transparent" },
          track: { show: false },
          startAngle: -180,
          endAngle: 180,
        },
      },
      stroke: { lineCap: "round" },
      series: [71, 63, 77],
      labels: ["June", "May", "April"],
    }).render();

    new ApexCharts(document.querySelector("#barchart"), {
      chart: { height: 300, type: "bar", stacked: true },
      plotOptions: { bar: { columnWidth: "30%", horizontal: false } },
      series: [
        { name: "PRODUCT A", data: [14, 25, 21, 17, 12, 13, 11, 19] },
        { name: "PRODUCT B", data: [13, 23, 20, 8, 13, 27, 33, 12] },
        { name: "PRODUCT C", data: [11, 17, 15, 15, 21, 14, 15, 13] },
      ],
      xaxis: { categories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2", "2012 Q3", "2012 Q4"] },
    }).render();

    new ApexCharts(document.querySelector("#areachart"), {
      chart: { height: 300, type: "area", stacked: false},
      stroke: { curve: "straight" },
      series: [
        { name: "Music", data: [11, 15, 26, 20, 33, 27] },
        { name: "Photos", data: [32, 33, 21, 42, 19, 32] },
        { name: "Files", data: [20, 39, 52, 11, 29, 43] },
      ],
      xaxis: { categories: ["2011 Q1", "2011 Q2", "2011 Q3", "2011 Q4", "2012 Q1", "2012 Q2"] },
      tooltip: { followCursor: true },
    }).render();
  }, [toggle]);


  useEffect(() => {
    setTimeout(() => {
      // console.log(myKey)
      if (myKey > 4) setToggle(Status.Error)
      else setToggle(Status.Done)
    }, 4000); 
  }, [])
  

  return (
    <div className="flex flex-col self-start min-w-72 bg-[#343E59] py-5 px-1 sm:p-7 gap-5 rounded-b-4xl rounded-tr-4xl md:ml-5 border-stone-500 border-1">
      {toggle === Status.Loading && (
        <div className="self-center">
          <CircularProgress />
        </div>
      )}

      {toggle === Status.Error && <ErrorComponent></ErrorComponent>} 
      
      {toggle === Status.Done && (
      <>
        <div className="flex flex-wrap justify-evenly items-center gap-7">
              <div className="flex p-3 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600">
              <div className="flex flex-col items-center justify-end text-white">
              <h2 className="font-bold text-2xl font-mono">1213</h2>
              <h3 className="font-bold mt-2 font-mono">CLICKS</h3>
              </div>
              <div className="max-w-40" id="spark1"></div>
              </div>
              
              <div className="flex p-3 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500">
              <div className="flex flex-col items-center justify-end text-white">
              <h2 className="font-bold text-2xl font-mono">422</h2>
              <h3 className="font-bold mt-2 font-mono">VIEWS</h3>
              </div>
              <div className="max-w-40" id="spark2"></div>
              </div>
              
              <div className="flex p-3 rounded-2xl bg-gradient-to-r from-orange-300 to-pink-400">
              <div className="flex flex-col items-center justify-end text-white">
              <h2 className="font-bold text-2xl font-mono">311</h2>
              <h3 className="font-bold mt-2 font-mono">LEADS</h3>
              </div>
              <div className="max-w-40" id="spark3"></div>
              </div>
              
              <div className="flex p-3 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-500">
              <div className="flex flex-col items-center justify-end text-white">
              <h2 className="font-bold text-2xl font-mono">22</h2>
              <h3 className="font-bold mt-2 font-mono">SALES</h3>
            </div>
            <div className="max-w-40" id="spark4"></div>
            </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <div id="line-adwords" className="col-span-2 bg-[#2B2D3E] rounded-xl hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]"></div>
          <div id="radialBarBottom" className="bg-[#2B2D3E] py-1.5 rounded-xl hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]"></div>
          <div id="barchart" className="bg-[#2B2D3E] rounded-xl hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]"></div>
          <div id="areachart" className="bg-[#2B2D3E] rounded-xl hover:shadow-[2px_2px_10px_rgba(255,255,255,0.6)]"></div>
        </div>
      </>
      )}
    </div>
  );
};

const ErrorComponent = () => {
  return (
    <div className="flex flex-col justify-center items-start rounded-2xl sm:w-80 bg-pink-950 text-white p-6 shadow-lg">
      <h2 className="text-lg sm:text-xl font-bold w-full">Error</h2>
      <p className="mt-2">Something when wrong!</p>
    </div>
  );
};

export default Charts;