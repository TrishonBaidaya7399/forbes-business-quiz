"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SurveySubmission {
  name: string;
  email: string;
  company: string;
  position: string;
  responses: Record<number, string>;
  averageScore: number;
  termAndCondition: boolean;
  submittedAt: string;
}

interface SurveyStats {
  totalSubmissions: number;
  averageScore: number;
  submissionsByCompany: Array<{ company: string; count: number }>;
}

interface Filters {
  name: string;
  email: string;
  company: string;
  position: string;
  dateFrom: string;
  dateTo: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<SurveySubmission[]>([]);
  const [stats, setStats] = useState<SurveyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    email: "",
    company: "",
    position: "",
    dateFrom: "",
    dateTo: "",
  });

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

  // Filter submissions based on current filters
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesName = submission.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesEmail = submission.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());
      const matchesCompany = submission.company
        .toLowerCase()
        .includes(filters.company.toLowerCase());
      const matchesPosition = submission.position
        .toLowerCase()
        .includes(filters.position.toLowerCase());

      const submissionDate = new Date(submission.submittedAt);
      const matchesDateFrom =
        !filters.dateFrom || submissionDate >= new Date(filters.dateFrom);
      const matchesDateTo =
        !filters.dateTo ||
        submissionDate <= new Date(filters.dateTo + "T23:59:59");

      return (
        matchesName &&
        matchesEmail &&
        matchesCompany &&
        matchesPosition &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [submissions, filters]);

  // Paginate filtered submissions
  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSubmissions.slice(startIndex, startIndex + pageSize);
  }, [filteredSubmissions, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredSubmissions.length / pageSize);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
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
      "Terms Accepted",
      "Submitted At",
      "Responses",
    ];
    const csvData = filteredSubmissions.map((submission) => [
      submission.name,
      submission.email,
      submission.company,
      submission.position,
      submission.averageScore,
      submission.termAndCondition ? "Yes" : "No",
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">
            Forbes Survey Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm sm:text-base">
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                  {stats.totalSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm sm:text-base">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                  {stats.averageScore.toFixed(2)}/5
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-white/20 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm sm:text-base">
                  Top Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {stats.submissionsByCompany
                    .slice(0, 3)
                    .map((company, index) => (
                      <div
                        key={index}
                        className="text-white text-xs sm:text-sm"
                      >
                        {company.company}: {company.count}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button
            onClick={exportToCSV}
            className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-black/40 backdrop-blur-sm border-white/20 mb-4">
            <CardHeader>
              <CardTitle className="text-white text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Name</label>
                  <Input
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <Input
                    placeholder="Search by email..."
                    value={filters.email}
                    onChange={(e) =>
                      handleFilterChange("email", e.target.value)
                    }
                    className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Company
                  </label>
                  <Input
                    placeholder="Search by company..."
                    value={filters.company}
                    onChange={(e) =>
                      handleFilterChange("company", e.target.value)
                    }
                    className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Position
                  </label>
                  <Input
                    placeholder="Search by position..."
                    value={filters.position}
                    onChange={(e) =>
                      handleFilterChange("position", e.target.value)
                    }
                    className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Date From
                  </label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      handleFilterChange("dateFrom", e.target.value)
                    }
                    className="bg-black/20 border-white/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Date To
                  </label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      handleFilterChange("dateTo", e.target.value)
                    }
                    className="bg-black/20 border-white/30 text-white"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-white text-sm">
            Showing {paginatedSubmissions.length} of{" "}
            {filteredSubmissions.length} submissions
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Show:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20 bg-black/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submissions Table */}
        <Card className="bg-black/40 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Submissions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-3 text-sm font-medium">Name</th>
                    <th className="text-left p-3 text-sm font-medium">Email</th>
                    <th className="text-left p-3 text-sm font-medium">
                      Company
                    </th>
                    <th className="text-left p-3 text-sm font-medium">
                      Position
                    </th>
                    <th className="text-left p-3 text-sm font-medium">
                      Avg Score
                    </th>
                    <th className="text-left p-3 text-sm font-medium">
                      Accept Terms & Condition
                    </th>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubmissions.length > 0 ? (
                    paginatedSubmissions.map((submission, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        <td className="p-3 text-sm">{submission.name}</td>
                        <td className="p-3 text-sm break-all">
                          {submission.email}
                        </td>
                        <td className="p-3 text-sm">{submission.company}</td>
                        <td className="p-3 text-sm">{submission.position}</td>
                        <td className="p-3 text-sm">
                          <Badge
                            variant="secondary"
                            className="bg-orange-600/20 text-orange-400"
                          >
                            {submission.averageScore.toFixed(1)}/5
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge
                            variant={
                              submission.termAndCondition
                                ? "default"
                                : "destructive"
                            }
                            className={
                              submission.termAndCondition
                                ? "bg-green-600/20 text-green-400"
                                : "bg-red-600/20 text-red-400"
                            }
                          >
                            {submission.termAndCondition ? "Yes" : "No"}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          {new Date(
                            submission.submittedAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-white/60">
                        No submissions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className={
                        currentPage === pageNum
                          ? "bg-orange-600 hover:bg-orange-700"
                          : "text-white border-white hover:bg-white/10"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white/10 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
