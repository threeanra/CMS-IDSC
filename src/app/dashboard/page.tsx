"use client";
import React from "react";
import CardCount from "../components/cardcount/cardcount";
import {
  faChartBar,
  faClinicMedical,
  faFile,
  faKitMedical,
  faSubscript,
  faUserCheck,
  faUserDoctor,
  faUsers,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header/header";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const state = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgba(15, 15, 53, 1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 81, 56],
      },
      {
        label: "Outcome",
        backgroundColor: "rgba(6, 99, 236,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 81, 56],
      },
    ],
  };

  return (
    <>
      <Header title="Dashboard" icon={faChartBar} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
        <CardCount icon={faUsers} total={10} title={"Total Register"} />
        <CardCount icon={faUserCheck} total={10} title={"Total Activated"} />
        <CardCount icon={faSubscript} total={10} title={"Total Subcribe"} />
        <CardCount icon={faKitMedical} total={10} title={"Total Apotek"} />
        <CardCount icon={faClinicMedical} total={10} title={"Total Klinik"} />
        <CardCount icon={faUserDoctor} total={10} title={"Total Dr.Praktek"} />
        <CardCount icon={faUserTimes} total={10} title={"Total Unsubscribe"} />
        <CardCount icon={faFile} total={10} title={"Total On Review"} />
      </div>
      <div className="mt-10 shadow-2xl">
        <div className="card shadow">
          <div className="card-body">
            <h1>Diagram 12 Month latest Subscribe - Unsubscribe</h1>
            <div>
              <Bar data={state} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
