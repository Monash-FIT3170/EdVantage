import { Box, Card, CardBody, Stack, Heading } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { name: 'AI', mentions: 30 },
    { name: 'ML', mentions: 20 },
    { name: 'DL', mentions: 10 },
];

const visualizationData = [
    { start: 0, end: 60, type: 'word-cloud', data: {} },
    // { start: 5, end: 30, type: 'venn', data: { /* Venn diagram data */ } },
    // { start: 31, end: 60, type: 'word-cloud', data: { /* Word cloud data */ } },
    { start: 61, end: 90, type: 'bar', data: { /* Bar graph data */ } },
    { start: 91, end: 120, type: 'timeline', data: { /* Timeline data */ } },
    { start: 121, end: 150, type: 'pie', data: { /* Pie chart data */ } },
    { start: 151, end: 180, type: 'image', data: { /* Image URLs */ } },
];

type VisualizationPaneProps = {
    currentTime: number;
};

const VisualizationPane = ({ currentTime }: VisualizationPaneProps) => {

    const activeVisualization = visualizationData.find(item => item.start <= currentTime && item.end >= currentTime);

    let visualizationDisplay = (
        <Stack spacing="5">
            <Heading size="md">Topic Mentions</Heading>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar type="monotone" dataKey="mentions" barSize={30} fill="#413ea0" />
            </BarChart>
        </Stack>
    )

    if (activeVisualization) {
        switch (activeVisualization.type) {
            case 'venn':
                // visualizationDisplay = <VennDiagram data={activeVisualization.data} />;
            case 'word-cloud':
                // visualizationDisplay = <WordCloudComponent currentTime={currentTime} />;
            case 'bar':
                // visualizationDisplay = <BarGraph data={activeVisualization.data} />;
            case 'timeline':
                // visualizationDisplay = <Timeline data={activeVisualization.data} />;
            case 'pie':
                // visualizationDisplay = <PieChartVisual data={activeVisualization.data} />;
            case 'image':
                // visualizationDisplay = <ImageViewer data={activeVisualization.data} />;
            default:
                break;
        }
    }


    return (
        <Box>
            <Card variant={'outline'}>
                <CardBody>
                    {visualizationDisplay}
                </CardBody>
            </Card>
        </Box>
    );
};

export default VisualizationPane;
