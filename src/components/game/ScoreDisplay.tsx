"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <Card className="w-full text-center shadow-lg bg-accent">
      <CardHeader className="p-2 sm:p-4">
        <CardTitle className="text-sm sm:text-lg text-accent-foreground">SCORE</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <p className="text-2xl sm:text-4xl font-bold text-accent-foreground">{score}</p>
      </CardContent>
    </Card>
  );
};

export default ScoreDisplay;
