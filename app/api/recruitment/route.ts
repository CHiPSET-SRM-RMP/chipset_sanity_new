import { NextRequest, NextResponse } from 'next/server';
import { 
  getDbConnection, 
  insertRecruitmentData, 
  createRecruitmentTable,
  RecruitmentFormData 
} from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'name', 'year', 'regNo', 'department', 'contactNo', 
      'email', 'srmEmail', 'linkedinProfile', 'domain', 
      'priorActivities', 'resumeLink'
    ];
    
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid personal email format' },
        { status: 400 }
      );
    }
    
    if (!emailRegex.test(body.srmEmail)) {
      return NextResponse.json(
        { error: 'Invalid SRM email format' },
        { status: 400 }
      );
    }

    // Validate resume link (should be Google Drive)
    if (!body.resumeLink.includes('drive.google.com')) {
      return NextResponse.json(
        { error: 'Resume link must be a Google Drive link' },
        { status: 400 }
      );
    }

    // Validate LinkedIn URL
    if (!body.linkedinProfile.includes('linkedin.com')) {
      return NextResponse.json(
        { error: 'Invalid LinkedIn profile URL' },
        { status: 400 }
      );
    }

    // Validate GitHub URL if provided
    if (body.githubProfile && !body.githubProfile.includes('github.com')) {
      return NextResponse.json(
        { error: 'Invalid GitHub profile URL' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { 
          message: 'Recruitment application submitted successfully',
          success: true 
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to save recruitment application' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('Connection')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please try again later.' },
          { status: 503 }
        );
      }
      
      if (error.message.includes('duplicate') || error.message.includes('UNIQUE')) {
        return NextResponse.json(
          { error: 'This registration number or email has already been used.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}