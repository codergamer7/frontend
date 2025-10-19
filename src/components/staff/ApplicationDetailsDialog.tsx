import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  code: string;
  patientName: string;
  trn: string;
  submittedDate: string;
  doctorName: string;
  conditionsCount: number;
}

interface ApplicationDetailsDialogProps {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ApplicationDetailsDialog = ({
  application,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: ApplicationDetailsDialogProps) => {
  const handleApprove = () => {
    onApprove(application.id);
    toast.success(`Application ${application.code} has been approved`);
  };

  const handleReject = () => {
    onReject(application.id);
    toast.error(`Application ${application.code} has been rejected`);
  };

  // Mock detailed data - would come from backend
  const detailedData = {
    personal: {
      firstName: "John",
      middleName: "Michael",
      surname: "Doe",
      trn: "123-456-789",
      occupation: "Teacher",
      gender: "Male",
      homePhone: "876-555-0100",
      cellularPhone: "876-555-0101",
      mailingAddress: "123 Main Street, Kingston, Jamaica",
    },
    guardian: {
      relationship: "Spouse",
      institution: "N/A",
      firstName: "Jane",
      surname: "Doe",
      mailingAddress: "123 Main Street, Kingston, Jamaica",
      title: "Mrs.",
      contactNumber: "876-555-0102",
    },
    medical: {
      conditions: [
        { name: "Diabetes Type 2", severity: "Moderate" },
        { name: "Hypertension", severity: "Mild" },
      ],
      doctorName: "Dr. Sarah Johnson",
      mcjRegNo: "MCJ12345",
      officeAddress: "456 Medical Plaza, Kingston",
      parish: "Kingston",
      officePhone: "876-555-0200",
      certificationDate: "2025-01-15",
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Application Details</DialogTitle>
          <DialogDescription>
            Review complete application information before approval
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {detailedData.personal.firstName} {detailedData.personal.middleName} {detailedData.personal.surname}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">TRN</p>
                <p className="font-medium">{detailedData.personal.trn}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Occupation</p>
                <p className="font-medium">{detailedData.personal.occupation}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p className="font-medium">{detailedData.personal.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Home Phone</p>
                <p className="font-medium">{detailedData.personal.homePhone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Cellular Phone</p>
                <p className="font-medium">{detailedData.personal.cellularPhone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Mailing Address</p>
                <p className="font-medium">{detailedData.personal.mailingAddress}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Guardian Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Guardian Information</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Guardian Name</p>
                <p className="font-medium">
                  {detailedData.guardian.title} {detailedData.guardian.firstName} {detailedData.guardian.surname}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Relationship</p>
                <p className="font-medium">{detailedData.guardian.relationship}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Contact Number</p>
                <p className="font-medium">{detailedData.guardian.contactNumber}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Mailing Address</p>
                <p className="font-medium">{detailedData.guardian.mailingAddress}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Medical Certification */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-secondary">Medical Certification</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Certified Conditions:</p>
                <div className="space-y-2">
                  {detailedData.medical.conditions.map((condition, index) => (
                    <div key={index} className="bg-accent p-3 rounded-lg">
                      <p className="font-medium">{condition.name}</p>
                      <p className="text-sm text-muted-foreground">Severity: {condition.severity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Certifying Doctor</p>
                  <p className="font-medium">{detailedData.medical.doctorName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">MCJ Reg No.</p>
                  <p className="font-medium">{detailedData.medical.mcjRegNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Parish</p>
                  <p className="font-medium">{detailedData.medical.parish}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Office Phone</p>
                  <p className="font-medium">{detailedData.medical.officePhone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground">Office Address</p>
                  <p className="font-medium">{detailedData.medical.officeAddress}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Certification Date</p>
                  <p className="font-medium">{detailedData.medical.certificationDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Conditions</p>
                  <p className="font-medium">{detailedData.medical.conditions.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="destructive" onClick={handleReject}>
            <XCircle className="w-4 h-4 mr-2" />
            Reject Application
          </Button>
          <Button onClick={handleApprove}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
