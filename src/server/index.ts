
import express from 'express';
import cors from 'cors';
import { supabase } from '@/lib/supabase';
import expertRoutes from './routes/expertRoutes';
import topicRoutes from './routes/topicRoutes';
import connectionRoutes from './routes/connectionRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/experts', expertRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/connections', connectionRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Expert Knowledge Graph API Server' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong on the server'
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
