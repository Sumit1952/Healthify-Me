"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { checkSymptoms, SymptomCheckResponse } from '@/ai/flows/symptom-checker-flow';
import { Loader, HeartPulse, Siren, Stethoscope, TestTube, Lightbulb, RefreshCcw } from 'lucide-react';

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please enter your symptoms.');
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await checkSymptoms({symptoms});
      setResult(response);
    } catch (err) {
      setError('An error occurred while analyzing symptoms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setResult(null);
    setError(null);
  };

  const getDangerColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'High':
        return 'text-red-600';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700/80 text-2xl md:text-3xl">
          <HeartPulse />
          Hii ! I'm Here
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Enter all your symptoms clearly (e.g., fever, headache, vomiting, body pain)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={8}
              disabled={loading}
              className="text-base md:text-lg"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-grow bg-accent text-black hover:bg-accent/90">
                {loading ? <Loader className="animate-spin" /> : 'Analyze Symptoms'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} disabled={loading}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            {result.emergencyAlert && (
              <Alert variant="destructive">
                <Siren className="h-4 w-4" />
                <AlertTitle>🚨 Emergency Alert!</AlertTitle>
                <AlertDescription>
                  Your symptoms seem dangerous. Please seek immediate medical attention at the nearest hospital or call emergency services.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Stethoscope />Possible Conditions</h3>
              <div className="space-y-4">
                {result.possibleConditions.map((condition, index) => (
                  <Card key={index} className="bg-background/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-primary">{condition.name}</h4>
                        <span className={`font-bold text-sm ${getDangerColor(condition.dangerLevel)}`}>
                          {condition.dangerLevel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{condition.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Lightbulb />Home Treatments & Precautions</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.homeTreatments}</p>
            </div>
            
            {result.doctorVisitRecommendation && (
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Stethoscope />Do you need to see a doctor?</h3>
                <p className="text-sm text-muted-foreground">{result.doctorVisitRecommendation}</p>
              </div>
            )}
            
            {result.recommendedTests && (
               <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><TestTube />Recommended Tests</h3>
                  <p className="text-sm text-muted-foreground">{result.recommendedTests}</p>
              </div>
            )}

          </div>
        )}
      </CardContent>
    </Card>
  );
}
