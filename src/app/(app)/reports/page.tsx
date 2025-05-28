"use client";

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
// ShadCN chart components (example - will need data and config)
// import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-2 sm:py-8">
      <PageHeader
        title="Reports"
        description="Analytics and insights into your team's productivity and project progress."
      />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rate</CardTitle>
            <CardDescription>Tasks completed per sprint or month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer> */}
            <div className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 mb-2" />
              <p>Chart data and visualization coming soon.</p>
            </div>
          </CardContent>
        </Card>

        {/* Add more report cards here */}
        <Card>
          <CardHeader>
            <CardTitle>Bug Resolution Time</CardTitle>
            <CardDescription>Average time taken to resolve reported bugs.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
             <div className="text-center text-muted-foreground">
              <BarChart3 className="mx-auto h-12 w-12 mb-2" />
              <p>Chart data and visualization coming soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
