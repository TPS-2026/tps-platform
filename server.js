import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write JSON file
async function writeJsonFile(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============ JOBS API ============

// Helper function to get translated content
function getTranslatedContent(job, locale = 'fr') {
  if (!job.translations) {
    // Old format - return as is
    return {
      title: job.title || '',
      description: job.description || '',
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      benefits: job.benefits || []
    }
  }
  
  const translation = job.translations[locale] || job.translations.fr || job.translations.en || {}
  return {
    title: translation.title || '',
    description: translation.description || '',
    requirements: translation.requirements || [],
    responsibilities: translation.responsibilities || [],
    benefits: translation.benefits || []
  }
}

// GET /api/jobs - Get all jobs with optional filters
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await readJsonFile(JOBS_FILE);
    const locale = req.query.locale || 'fr';
    let filteredJobs = [...jobs];

    // Apply filters
    if (req.query.sector) {
      const sectorValue = typeof req.query.sector === 'string' ? req.query.sector : req.query.sector.value || req.query.sector;
      filteredJobs = filteredJobs.filter(job => {
        const jobSector = typeof job.sector === 'string' ? job.sector : job.sector?.value || job.sector;
        return jobSector === sectorValue;
      });
    }
    if (req.query.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location?.toLowerCase().includes(req.query.location.toLowerCase())
      );
    }
    if (req.query.contractType) {
      const contractValue = typeof req.query.contractType === 'string' ? req.query.contractType : req.query.contractType.value || req.query.contractType;
      filteredJobs = filteredJobs.filter(job => {
        const jobContract = typeof job.contractType === 'string' ? job.contractType : job.contractType?.value || job.contractType;
        return jobContract === contractValue;
      });
    }
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => {
        const translated = getTranslatedContent(job, locale);
        return translated.title?.toLowerCase().includes(searchTerm) ||
               translated.description?.toLowerCase().includes(searchTerm);
      });
    }

    // Map jobs to include translated content
    const mappedJobs = filteredJobs.map(job => {
      const translated = getTranslatedContent(job, locale);
      return {
        ...job,
        title: translated.title,
        description: translated.description,
        requirements: translated.requirements,
        responsibilities: translated.responsibilities,
        benefits: translated.benefits,
        sector: typeof job.sector === 'string' ? job.sector : job.sector?.value || job.sector,
        contractType: typeof job.contractType === 'string' ? job.contractType : job.contractType?.value || job.contractType
      }
    });

    res.json(mappedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/jobs/:id - Get a single job
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const jobs = await readJsonFile(JOBS_FILE);
    const job = jobs.find(j => j.id === req.params.id);
    const locale = req.query.locale || 'fr';
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const translated = getTranslatedContent(job, locale);
    const mappedJob = {
      ...job,
      title: translated.title,
      description: translated.description,
      requirements: translated.requirements,
      responsibilities: translated.responsibilities,
      benefits: translated.benefits,
      sector: typeof job.sector === 'string' ? job.sector : job.sector?.value || job.sector,
      contractType: typeof job.contractType === 'string' ? job.contractType : job.contractType?.value || job.contractType
    };
    
    res.json(mappedJob);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// POST /api/jobs - Create a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const jobs = await readJsonFile(JOBS_FILE);
    const newJob = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    jobs.push(newJob);
    await writeJsonFile(JOBS_FILE, jobs);
    
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT /api/jobs/:id - Update a job
app.put('/api/jobs/:id', async (req, res) => {
  try {
    const jobs = await readJsonFile(JOBS_FILE);
    const index = jobs.findIndex(j => j.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    jobs[index] = {
      ...jobs[index],
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    
    await writeJsonFile(JOBS_FILE, jobs);
    res.json(jobs[index]);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE /api/jobs/:id - Delete a job
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const jobs = await readJsonFile(JOBS_FILE);
    const filteredJobs = jobs.filter(j => j.id !== req.params.id);
    
    if (jobs.length === filteredJobs.length) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    await writeJsonFile(JOBS_FILE, filteredJobs);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// ============ NEWS API ============

// GET /api/news - Get all news with pagination
app.get('/api/news', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_FILE);
    // Filter only published articles for frontend (unless admin query)
    const publishedOnly = req.query.admin !== 'true';
    const filteredNews = publishedOnly 
      ? news.filter(article => article.published === true)
      : news;
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    res.json({
      items: paginatedNews,
      total: filteredNews.length,
      page,
      pageSize
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// GET /api/news/:id - Get a single article
app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_FILE);
    const article = news.find(a => a.id === req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Filter unpublished articles for frontend (unless admin query)
    if (req.query.admin !== 'true' && article.published !== true) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST /api/news - Create a new article
app.post('/api/news', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_FILE);
    const newArticle = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: req.body.published ? new Date().toISOString() : null
    };
    
    news.unshift(newArticle); // Add to beginning
    await writeJsonFile(NEWS_FILE, news);
    
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// PUT /api/news/:id - Update an article
app.put('/api/news/:id', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_FILE);
    const index = news.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    const existingArticle = news[index];
    news[index] = {
      ...existingArticle,
      ...req.body,
      id: req.params.id,
      updatedAt: new Date().toISOString(),
      publishedAt: req.body.published && !existingArticle.publishedAt 
        ? new Date().toISOString() 
        : existingArticle.publishedAt
    };
    
    await writeJsonFile(NEWS_FILE, news);
    res.json(news[index]);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// DELETE /api/news/:id - Delete an article
app.delete('/api/news/:id', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_FILE);
    const filteredNews = news.filter(a => a.id !== req.params.id);
    
    if (news.length === filteredNews.length) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    await writeJsonFile(NEWS_FILE, filteredNews);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

