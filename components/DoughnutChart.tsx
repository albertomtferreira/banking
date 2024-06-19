"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend)


const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountsNames = accounts.map(account => account.name)
  const accountsBalances = accounts.map(account => account.currentBalance)
  const data = {
    datasets: [
      {
        label: "Banks",
        data: accountsBalances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"]
      }
    ],
    labels: accountsNames
  }
  return (
    <div>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default DoughnutChart