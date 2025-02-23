
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const samplePostSentiments = [
  {
    postId: 1,
    content: "Just launched my new project!",
    positive: 80,
    negative: 20,
  },
  {
    postId: 2,
    content: "Having a tough day at work...",
    positive: 30,
    negative: 70,
  },
  {
    postId: 3,
    content: "Amazing conference experience!",
    positive: 90,
    negative: 10,
  },
  {
    postId: 4,
    content: "Mixed feelings about the new update",
    positive: 50,
    negative: 50,
  },
];

const overallSentiment = {
  positive: 65,
  negative: 35,
};

const COLORS = ["#4ade80", "#f87171"];

const SentimentAnalysis = () => {
  const pieData = [
    { name: "Positive", value: overallSentiment.positive },
    { name: "Negative", value: overallSentiment.negative },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sentiment Analysis Dashboard
        </h1>

        {/* Overall Sentiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Overall Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Positive Sentiment</span>
                  <span className="text-green-600 font-bold">
                    {overallSentiment.positive}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${overallSentiment.positive}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Negative Sentiment</span>
                  <span className="text-red-600 font-bold">
                    {overallSentiment.negative}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${overallSentiment.negative}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post-wise Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Post-wise Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={samplePostSentiments}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="postId" label={{ value: 'Post ID', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Sentiment %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const post = samplePostSentiments.find(
                          (p) => p.postId === payload[0].payload.postId
                        );
                        return (
                          <div className="bg-white p-4 border rounded-lg shadow-lg">
                            <p className="font-medium">Post ID: {post?.postId}</p>
                            <p className="text-sm text-gray-600 mb-2">
                              "{post?.content}"
                            </p>
                            <p className="text-green-600">
                              Positive: {payload[0].value}%
                            </p>
                            <p className="text-red-600">
                              Negative: {payload[1].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="positive" fill="#4ade80" name="Positive" />
                  <Bar dataKey="negative" fill="#f87171" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
