
import * as ss from 'simple-statistics';

// Analyze data using statistical methods
export async function analyzeStatistics(data: number[]) {
  try {
    // Basic statistics
    const result = {
      count: data.length,
      sum: ss.sum(data),
      mean: ss.mean(data),
      median: ss.median(data),
      mode: ss.mode(data),
      min: ss.min(data),
      max: ss.max(data),
      range: ss.max(data) - ss.min(data),
    };
    
    // Add more advanced statistics if we have enough data points
    if (data.length > 1) {
      Object.assign(result, {
        variance: ss.variance(data),
        standardDeviation: ss.standardDeviation(data),
        coefficientOfVariation: ss.standardDeviation(data) / ss.mean(data),
      });
    }
    
    // Add percentiles and quantiles
    if (data.length > 3) {
      Object.assign(result, {
        quantiles: {
          q1: ss.quantile(data, 0.25),
          q2: ss.quantile(data, 0.5), // Same as median
          q3: ss.quantile(data, 0.75)
        },
        iqr: ss.quantile(data, 0.75) - ss.quantile(data, 0.25),
        percentiles: {
          p10: ss.quantile(data, 0.1),
          p25: ss.quantile(data, 0.25),
          p50: ss.quantile(data, 0.5),
          p75: ss.quantile(data, 0.75),
          p90: ss.quantile(data, 0.9),
        }
      });
    }
    
    // Add outlier detection
    if (data.length > 5) {
      const q1 = ss.quantile(data, 0.25);
      const q3 = ss.quantile(data, 0.75);
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      const outliers = data.filter(val => val < lowerBound || val > upperBound);
      
      Object.assign(result, {
        outliers: {
          count: outliers.length,
          values: outliers,
          lowerBound,
          upperBound
        }
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error analyzing statistics:', error);
    return { error: 'Failed to analyze data' };
  }
}

export default {
  analyzeStatistics
};
