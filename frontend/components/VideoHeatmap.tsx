import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import file from "./ExTranscript.json";

Chart.register(...registerables)

const randomWatchCount = (min: any, max: any) => {
    let prob = Math.random();
    let mid = Math.floor((min + max)/2)

    if (prob > 0.9) {
        return Math.floor(Math.random() * (max - mid + 1)) + mid;
    } else {
        return Math.floor(Math.random() * (mid - min + 1)) + min;
    }
}

const audioData = file.contents.map(item => {
    return {
        ...item,
        watchCount: randomWatchCount(400, 700)
    };
});

const dialogueSegments = file.labels.filter(item => item.type === "dialogue-segment");

const getTopicForIndex = (index: any) => {
    for (let topic of dialogueSegments) {
        if (index >= topic.span[0] && index <= topic.span[1]) {
            return topic.data?.subheading;
        }
    }
    return null;
};

const data = {
    labels: audioData.map(item => item.timestamp),
    datasets: [{
        label: 'Watch Count',
        data: audioData.map(item => item.watchCount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5, // curvature
    }]
};

const options = {
    responsive: true,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
        title: {
            display: true,
            text: 'Heatmap',
            font: {
                size: 20
            }
        },
        tooltip: {
            callbacks: {
                afterBody: function(context: any) {
                    const index = context[0].dataIndex;
                    const topic = getTopicForIndex(index);
                    const utterance = 'Words: ' + audioData[index].utterance;
                    return topic ? [`Topic: ${topic}`, utterance] : [utterance];
                }
            }
        },
        legend: {
            display: false
        }
    }
  };


const AudioHeatmap = () => {
    return <Line data={data} options={options} />;
};

export default AudioHeatmap;