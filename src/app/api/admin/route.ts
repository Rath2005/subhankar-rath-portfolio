import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // we will write this next
import * as db from '@/lib/db';

// Helper to check authentication for modifying requests
async function checkAuth(req: Request) {
  // If running locally in development and no MONGODB_URI is provided, we can bypass Auth to ease testing,
  // or enforce auth based on session. Let's check session.
  const session = await getServerSession(authOptions);
  
  // If no MongoDB URI, allow local updates in mock mode without strict security block,
  // making sandbox editing seamless.
  const isProd = process.env.NODE_ENV === 'production' || process.env.MONGODB_URI;
  if (isProd && !session) {
    throw new Error('Unauthorized');
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const module = searchParams.get('module');

    if (!module) {
      return NextResponse.json({ error: 'Module parameter is required' }, { status: 400 });
    }

    let data;
    switch (module) {
      case 'profile':
        data = await db.getProfile();
        break;
      case 'projects':
        data = await db.getProjects();
        break;
      case 'skills':
        data = await db.getSkills();
        break;
      case 'certificates':
        data = await db.getCertificates();
        break;
      case 'timeline':
        data = await db.getTimeline();
        break;
      case 'anime':
        data = await db.getAnime();
        break;
      case 'movies':
        data = await db.getMovies();
        break;
      case 'travel':
        data = await db.getTravelDestinations();
        break;
      case 'expenses':
        data = await db.getExpenses();
        break;
      case 'earnings':
        data = await db.getEarnings();
        break;
      case 'visitor':
        data = await db.getVisitorCount();
        break;
      default:
        return NextResponse.json({ error: `Unknown module: ${module}` }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    try {
      await checkAuth(req);
    } catch (authError) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const body = await req.json();
    const { module, action, data } = body;

    if (!module || !action || !data) {
      return NextResponse.json({ error: 'Missing required parameters: module, action, or data' }, { status: 400 });
    }

    let result;

    if (action === 'delete') {
      const id = data.id || data._id;
      if (!id) {
        return NextResponse.json({ error: 'Missing ID for delete operation' }, { status: 400 });
      }

      switch (module) {
        case 'projects':
          result = await db.deleteProject(id);
          break;
        case 'skills':
          result = await db.deleteSkill(id);
          break;
        case 'certificates':
          result = await db.deleteCertificate(id);
          break;
        case 'timeline':
          result = await db.deleteTimeline(id);
          break;
        case 'anime':
          result = await db.deleteAnime(id);
          break;
        case 'travel':
          result = await db.deleteTravelDestination(id);
          break;
        case 'expenses':
          result = await db.deleteExpense(id);
          break;
        case 'earnings':
          result = await db.deleteEarning(id);
          break;
        default:
          return NextResponse.json({ error: `Delete action not supported for module: ${module}` }, { status: 400 });
      }
      return NextResponse.json({ success: true, result });
    }

    // Save/Update Operations
    switch (module) {
      case 'profile':
        result = await db.updateProfile(data);
        break;
      case 'projects':
        result = await db.saveProject(data);
        break;
      case 'skills':
        result = await db.saveSkill(data);
        break;
      case 'certificates':
        result = await db.saveCertificate(data);
        break;
      case 'timeline':
        result = await db.saveTimeline(data);
        break;
      case 'anime':
        result = await db.saveAnime(data);
        break;
      case 'travel':
        result = await db.saveTravelDestination(data);
        break;
      case 'expenses':
        result = await db.saveExpense(data);
        break;
      case 'earnings':
        result = await db.saveEarning(data);
        break;
      default:
        return NextResponse.json({ error: `Save action not supported for module: ${module}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
