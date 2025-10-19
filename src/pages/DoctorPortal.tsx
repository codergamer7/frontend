import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DoctorCertificationForm from "@/components/doctor/DoctorCertificationForm";

const DoctorPortal = () => {
  const navigate = useNavigate();
  const [applicationCode, setApplicationCode] = useState("");
  const [patientData, setPatientData] = useState<any>(null);

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (!applicationCode.trim()) {
      toast.error("Please enter an application code");
      return;
    }

    // Mock patient data - would come from backend
    setPatientData({
      code: applicationCode,
      firstName: "John",
      middleName: "Michael",
      surname: "Doe",
      trn: "123-456-789",
      occupation: "Teacher",
      gender: "Male",
      homePhone: "876-555-0100",
      cellularPhone: "876-555-0101",
      mailingAddress: "123 Main Street, Kingston, Jamaica",
    });
    
    toast.success("Patient application found!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-accent">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary">Doctor Portal</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Application Lookup</CardTitle>
            <CardDescription>
              Enter the patient's application code to view and certify their application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="code" className="sr-only">Application Code</Label>
                <Input
                  id="code"
                  placeholder="Enter application code (e.g., NHF-ABC12345)"
                  value={applicationCode}
                  onChange={(e) => setApplicationCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {patientData && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{patientData.firstName} {patientData.middleName} {patientData.surname}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">TRN</p>
                    <p className="font-medium">{patientData.trn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-medium">{patientData.occupation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{patientData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Home Phone</p>
                    <p className="font-medium">{patientData.homePhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cellular Phone</p>
                    <p className="font-medium">{patientData.cellularPhone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Mailing Address</p>
                    <p className="font-medium">{patientData.mailingAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DoctorCertificationForm patientData={patientData} />
          </>
        )}
      </main>
    </div>
  );
};

export default DoctorPortal;
