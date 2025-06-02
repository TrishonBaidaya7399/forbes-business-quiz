"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface SurveySubmission {
  name: string;
  email: string;
  company: string;
  position: string;
  responses: Record<number, string>;
  averageScore: number;
  submittedAt: string;
}

interface SurveyStats {
  totalSubmissions: number;
  averageScore: number;
  submissionsByCompany: Array<{ company: string; count: number }>;
}

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<SurveySubmission[]>([]);
  const [stats, setStats] = useState<SurveyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [submissionsResponse, statsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey-submissions`, {
          headers,
        }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/survey-stats`, {
          headers,
        }),
      ]);

      if (!submissionsResponse.ok || !statsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const submissionsData = await submissionsResponse.json();
      const statsData = await statsResponse.json();

      setSubmissions(submissionsData.data || []);
      setStats(statsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // If unauthorized, redirect to login
      if (error instanceof Error && error.message.includes("401")) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Company",
      "Position",
      "Average Score",
      "Submitted At",
      "Responses",
    ];
    const csvData = submissions.map((submission) => [
      submission.name,
      submission.email,
      submission.company,
      submission.position,
      submission.averageScore,
      new Date(submission.submittedAt).toLocaleString(),
      JSON.stringify(submission.responses),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forbes-survey-results-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-3xl font-bold">
            Forbes Survey Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Total Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400">
                  {stats.totalSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400">
                  {stats.averageScore.toFixed(2)}/5
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.submissionsByCompany
                    .slice(0, 3)
                    .map((company, index) => (
                      <div key={index} className="text-white text-sm">
                        {company.company}: {company.count}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Button */}
        <div className="mb-6">
          <Button
            onClick={exportToCSV}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Export to CSV
          </Button>
        </div>

        {/* Submissions Table */}
        <Card className="bg-black/40 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Company</th>
                    <th className="text-left p-2">Position</th>
                    <th className="text-left p-2">Score</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="p-2">{submission.name}</td>
                      <td className="p-2">{submission.email}</td>
                      <td className="p-2">{submission.company}</td>
                      <td className="p-2">{submission.position}</td>
                      <td className="p-2">{submission.averageScore}/5</td>
                      <td className="p-2">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
