import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, FileCheck, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ApplicationDetailsDialog from "@/components/staff/ApplicationDetailsDialog";

interface Application {
  id: string;
  code: string;
  patientName: string;
  trn: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  doctorName: string;
  conditionsCount: number;
}

const StaffPortal = () => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data - would come from backend
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      code: "NHF-ABC12345",
      patientName: "John Michael Doe",
      trn: "123-456-789",
      submittedDate: "2025-01-15",
      status: "pending",
      doctorName: "Dr. Sarah Johnson",
      conditionsCount: 2,
    },
    {
      id: "2",
      code: "NHF-XYZ67890",
      patientName: "Jane Smith",
      trn: "987-654-321",
      submittedDate: "2025-01-14",
      status: "pending",
      doctorName: "Dr. Michael Brown",
      conditionsCount: 3,
    },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApplication(app);
    setDialogOpen(true);
  };

  const handleApprove = (appId: string) => {
    setApplications(prev =>
      prev.map(app => app.id === appId ? { ...app, status: "approved" as const } : app)
    );
    setDialogOpen(false);
  };

  const handleReject = (appId: string) => {
    setApplications(prev =>
      prev.map(app => app.id === appId ? { ...app, status: "rejected" as const } : app)
    );
    setDialogOpen(false);
  };

  const pendingApplications = applications.filter(app => app.status === "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-accent">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-medical-blue">NHF Staff Portal</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Pending Applications
                </CardTitle>
                <CardDescription>
                  Review and process submitted applications
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {pendingApplications.length} Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApplications.length === 0 ? (
                <div className="text-center py-12">
                  <FileCheck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pending Applications</h3>
                  <p className="text-muted-foreground">All applications have been processed</p>
                </div>
              ) : (
                pendingApplications.map((app) => (
                  <Card key={app.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{app.patientName}</h3>
                            <Badge variant="outline">{app.code}</Badge>
                          </div>
                          <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium">TRN:</span> {app.trn}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium">Doctor:</span> {app.doctorName}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium">Submitted:</span> {app.submittedDate}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium">Conditions:</span> {app.conditionsCount}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(app)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {selectedApplication && (
          <ApplicationDetailsDialog
            application={selectedApplication}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </main>
    </div>
  );
};

export default StaffPortal;
