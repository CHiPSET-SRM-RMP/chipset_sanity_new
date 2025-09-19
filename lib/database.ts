import sql from 'mssql';

// Database configuration
const config: sql.config = {
  server: 'ledgerlegends.database.windows.net',
  port: 1433,
  database: 'reecruitments',
  user: 'ledgerlegends',
  password: 'Chakra*2006',
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: false, // Don't trust self-signed certificates
    enableArithAbort: true
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Create a connection pool
let pool: sql.ConnectionPool | null = null;

export async function getDbConnection(): Promise<sql.ConnectionPool> {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    pool = new sql.ConnectionPool(config);
    await pool.connect();
    
    console.log('Connected to SQL Server database');
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function closeDbConnection(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Database connection closed');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}

// Interface for recruitment form data
export interface RecruitmentFormData {
  name: string;
  year: string;
  regNo: string;
  department: string;
  specialization?: string;
  contactNo: string;
  email: string;
  srmEmail: string;
  linkedinProfile: string;
  githubProfile?: string;
  otherLinks?: string;
  domain: string;
  priorActivities: string;
  resumeLink: string;
  timestamp?: Date;
}

// Function to insert recruitment data
export async function insertRecruitmentData(data: RecruitmentFormData): Promise<boolean> {
  try {
    const connection = await getDbConnection();
    
    const request = connection.request();
    
    // Add parameters to prevent SQL injection
    request.input('name', sql.NVarChar(255), data.name);
    request.input('year', sql.NVarChar(10), data.year);
    request.input('regNo', sql.NVarChar(50), data.regNo);
    request.input('department', sql.NVarChar(255), data.department);
    request.input('specialization', sql.NVarChar(255), data.specialization || '');
    request.input('contactNo', sql.NVarChar(20), data.contactNo);
    request.input('email', sql.NVarChar(255), data.email);
    request.input('srmEmail', sql.NVarChar(255), data.srmEmail);
    request.input('linkedinProfile', sql.NVarChar(500), data.linkedinProfile);
    request.input('githubProfile', sql.NVarChar(500), data.githubProfile || '');
    request.input('otherLinks', sql.NVarChar(500), data.otherLinks || '');
    request.input('domain', sql.NVarChar(100), data.domain);
    request.input('priorActivities', sql.NText, data.priorActivities);
    request.input('resumeLink', sql.NVarChar(500), data.resumeLink);
    request.input('timestamp', sql.DateTime, data.timestamp || new Date());

    // SQL query to insert data
    const query = `
      INSERT INTO recruitment_applications (
        name, year, reg_no, department, specialization, contact_no, 
        email, srm_email, linkedin_profile, github_profile, other_links, 
        domain, prior_activities, resume_link, submission_timestamp
      ) VALUES (
        @name, @year, @regNo, @department, @specialization, @contactNo,
        @email, @srmEmail, @linkedinProfile, @githubProfile, @otherLinks,
        @domain, @priorActivities, @resumeLink, @timestamp
      )
    `;

    const result = await request.query(query);
    
    return result.rowsAffected[0] > 0;
  } catch (error) {
    console.error('Error inserting recruitment data:', error);
    throw error;
  }
}

// Function to create table if it doesn't exist
export async function createRecruitmentTable(): Promise<void> {
  try {
    const connection = await getDbConnection();
    
    const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='recruitment_applications' AND xtype='U')
      CREATE TABLE recruitment_applications (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        year NVARCHAR(10) NOT NULL,
        reg_no NVARCHAR(50) NOT NULL,
        department NVARCHAR(255) NOT NULL,
        specialization NVARCHAR(255),
        contact_no NVARCHAR(20) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        srm_email NVARCHAR(255) NOT NULL,
        linkedin_profile NVARCHAR(500) NOT NULL,
        github_profile NVARCHAR(500),
        other_links NVARCHAR(500),
        domain NVARCHAR(100) NOT NULL,
        prior_activities NTEXT NOT NULL,
        resume_link NVARCHAR(500) NOT NULL,
        submission_timestamp DATETIME DEFAULT GETDATE(),
        created_at DATETIME DEFAULT GETDATE()
      )
    `;

    await connection.request().query(createTableQuery);
    console.log('Recruitment table ensured to exist');
  } catch (error) {
    console.error('Error creating recruitment table:', error);
    throw error;
  }
}