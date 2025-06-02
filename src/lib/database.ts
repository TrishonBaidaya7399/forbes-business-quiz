import mongoose from "mongoose";

// Extend the global type to include mongoose property
declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// MongoDB connection
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ltpfdm.mongodb.net/forbes-survey?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Global variable to store the cached connection
const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Survey Submission Schema
const surveySubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    responses: {
      type: Map,
      of: String,
      required: true,
    },
    averageScore: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
surveySubmissionSchema.index({ email: 1 });
surveySubmissionSchema.index({ submittedAt: -1 });
surveySubmissionSchema.index({ company: 1 });

export interface SurveySubmission {
  name: string;
  email: string;
  company: string;
  position: string;
  responses: Record<number, string>;
  averageScore: number;
  submittedAt?: Date;
}

// Create or get the model
const SurveySubmissionModel =
  mongoose.models.SurveySubmission ||
  mongoose.model("SurveySubmission", surveySubmissionSchema);

export async function saveSurveySubmission(
  data: SurveySubmission
): Promise<{ success: boolean; id?: string }> {
  try {
    await connectToDatabase();

    const submission = new SurveySubmissionModel({
      name: data.name,
      email: data.email,
      company: data.company,
      position: data.position,
      responses: data.responses,
      averageScore: data.averageScore,
      submittedAt: data.submittedAt || new Date(),
    });

    const savedSubmission = await submission.save();

    return { success: true, id: savedSubmission._id.toString() };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false };
  }
}

export async function getSurveySubmissions(
  limit = 100
): Promise<SurveySubmission[]> {
  try {
    await connectToDatabase();

    const submissions = await SurveySubmissionModel.find({})
      .sort({ submittedAt: -1 })
      .limit(limit)
      .lean();

    return submissions.map((submission) => ({
      name: submission.name,
      email: submission.email,
      company: submission.company,
      position: submission.position,
      responses: Object.fromEntries(submission.responses as Map<number, string>),
      averageScore: submission.averageScore,
      submittedAt: submission.submittedAt,
    }));
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export async function getSurveySubmissionByEmail(
  email: string
): Promise<SurveySubmission | null> {
  try {
    await connectToDatabase();

    const submission = await SurveySubmissionModel.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (!submission) {
      return null;
    }

    return {
      name: submission.name,
      email: submission.email,
      company: submission.company,
      position: submission.position,
      responses: Object.fromEntries(submission.responses),
      averageScore: submission.averageScore,
      submittedAt: submission.submittedAt,
    };
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function getSurveyStats(): Promise<{
  totalSubmissions: number;
  averageScore: number;
  submissionsByCompany: Array<{ company: string; count: number }>;
}> {
  try {
    await connectToDatabase();

    const totalSubmissions = await SurveySubmissionModel.countDocuments();

    const avgResult = await SurveySubmissionModel.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$averageScore" },
        },
      },
    ]);

    const companyStats = await SurveySubmissionModel.aggregate([
      {
        $group: {
          _id: "$company",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          company: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    return {
      totalSubmissions,
      averageScore: avgResult[0]?.averageScore || 0,
      submissionsByCompany: companyStats,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      totalSubmissions: 0,
      averageScore: 0,
      submissionsByCompany: [],
    };
  }
}
