import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FileText, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "@/components/applicant/ApplicationForm";
import DigitalCard from "@/components/applicant/DigitalCard";

const ApplicantPortal = () => {
  const navigate = useNavigate();
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationCode, setApplicationCode] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleApplicationSubmit = (code: string) => {
    setApplicationSubmitted(true);
    setApplicationCode(code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-accent">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Applicant Portal</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="application" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="application">
              <FileText className="w-4 h-4 mr-2" />
              Application
            </TabsTrigger>
            <TabsTrigger value="card" disabled={!isApproved}>
              <CreditCard className="w-4 h-4 mr-2" />
              View Card
            </TabsTrigger>
          </TabsList>

          <TabsContent value="application" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Fund Application</CardTitle>
                <CardDescription>
                  Complete the form below to submit your application to the NHF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationForm 
                  onSubmit={handleApplicationSubmit}
                  applicationSubmitted={applicationSubmitted}
                  applicationCode={applicationCode}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="card" className="mt-6">
            <DigitalCard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ApplicantPortal;
