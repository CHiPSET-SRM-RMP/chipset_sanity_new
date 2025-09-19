import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { 
  insertRecruitmentData, 
  createRecruitmentTable,
  getDbConnection,
  RecruitmentFormData 
} from '../database';

export const recruitmentRouter = Router();

// Validation middleware
const validateRecruitment = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('year').notEmpty().withMessage('Year is required'),
  body('regNo').notEmpty().trim().withMessage('Registration number is required'),
  body('department').notEmpty().trim().withMessage('Department is required'),
  body('contactNo').notEmpty().trim().withMessage('Contact number is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid personal email is required'),
  body('srmEmail').isEmail().normalizeEmail().withMessage('Valid SRM email is required'),
  body('linkedinProfile').isURL().withMessage('Valid LinkedIn URL is required'),
  body('githubProfile').optional({ checkFalsy: true }).custom((value) => {
    if (value && value.trim() !== '' && !value.includes('github.com')) {
      throw new Error('GitHub URL must contain github.com');
    }
    return true;
  }),
  body('otherLinks').optional({ checkFalsy: true }).custom((value) => {
    if (value && value.trim() !== '') {
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error('Other links must be valid URLs if provided');
      }
    }
    return true;
  }),
  body('domain').notEmpty().withMessage('Domain is required'),
  body('priorActivities').notEmpty().trim().withMessage('Prior activities description is required'),
  body('resumeLink').isURL().withMessage('Valid resume link is required')
    .custom((value) => {
      if (!value.includes('drive.google.com')) {
        throw new Error('Resume link must be a Google Drive link');
      }
      return true;
    })
];

// POST /api/recruitment - Submit recruitment application
recruitmentRouter.post('/', validateRecruitment, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const body = req.body;

    // Additional validation for LinkedIn URL
    if (!body.linkedinProfile.includes('linkedin.com')) {
      return res.status(400).json({
        error: 'Invalid LinkedIn profile URL'
      });
    }

    // Additional validation for GitHub URL if provided
    if (body.githubProfile && !body.githubProfile.includes('github.com')) {
      return res.status(400).json({
        error: 'Invalid GitHub profile URL'
      });
    }

    // Prepare data for database insertion
    const recruitmentData: RecruitmentFormData = {
      name: body.name.trim(),
      year: body.year,
      regNo: body.regNo.trim(),
      department: body.department.trim(),
      specialization: body.specialization?.trim() || '',
      contactNo: body.contactNo.trim(),
      email: body.email.trim().toLowerCase(),
      srmEmail: body.srmEmail.trim().toLowerCase(),
      linkedinProfile: body.linkedinProfile.trim(),
      githubProfile: body.githubProfile?.trim() || '',
      otherLinks: body.otherLinks?.trim() || '',
      domain: body.domain,
      priorActivities: body.priorActivities.trim(),
      resumeLink: body.resumeLink.trim(),
      timestamp: new Date()
    };

    // Ensure the table exists
    await createRecruitmentTable();

    // Insert the data into the database
    const success = await insertRecruitmentData(recruitmentData);

    if (success) {
      console.log(`✅ New recruitment application: ${recruitmentData.name} (${recruitmentData.email})`);
      
      return res.status(201).json({
        message: 'Recruitment application submitted successfully',
        success: true,
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(500).json({
        error: 'Failed to save recruitment application'
      });
    }

  } catch (error) {
    console.error('❌ Recruitment API Error:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('Connection')) {
        return res.status(503).json({
          error: 'Database connection failed. Please try again later.'
        });
      }
      
      if (error.message.includes('duplicate') || error.message.includes('UNIQUE')) {
        return res.status(409).json({
          error: 'This registration number or email has already been used.'
        });
      }
    }

    return res.status(500).json({
      error: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/recruitment/stats - Get basic stats (optional endpoint)
recruitmentRouter.get('/stats', async (req: Request, res: Response) => {
  try {
    // You can add stats functionality here if needed
    res.json({
      message: 'Stats endpoint - implement as needed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/recruitment/view - View all applications
recruitmentRouter.get('/view', async (req: Request, res: Response) => {
  try {
    const connection = await getDbConnection();
    
    const query = `
      SELECT 
        id, name, year, reg_no, department, specialization, 
        contact_no, email, srm_email, linkedin_profile, 
        github_profile, other_links, domain, prior_activities, 
        resume_link, submission_timestamp, created_at
      FROM recruitment_applications 
      ORDER BY created_at DESC
    `;
    
    const result = await connection.request().query(query);
    
    res.json({
      success: true,
      total: result.recordset.length,
      applications: result.recordset,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('View applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// GET /api/recruitment/view - View all applications (ADMIN ONLY - add auth later)
recruitmentRouter.get('/view', async (req: Request, res: Response) => {
  try {
    const connection = await getDbConnection();
    
    const query = `
      SELECT 
        id, name, year, reg_no, department, specialization, 
        contact_no, email, srm_email, linkedin_profile, 
        github_profile, other_links, domain, prior_activities, 
        resume_link, submission_timestamp, created_at
      FROM recruitment_applications 
      ORDER BY created_at DESC
    `;
    
    const result = await connection.request().query(query);
    
    res.json({
      success: true,
      total: result.recordset.length,
      applications: result.recordset,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('View applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});