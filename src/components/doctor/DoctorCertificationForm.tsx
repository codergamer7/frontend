import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface Condition {
  name: string;
  severity: string;
}

interface DoctorCertificationFormProps {
  patientData: any;
}

const DoctorCertificationForm = ({ patientData }: DoctorCertificationFormProps) => {
  const [conditions, setConditions] = useState<Condition[]>([{ name: "", severity: "" }]);
  const [formData, setFormData] = useState({
    certificationDate: "",
    doctorSurname: "",
    doctorFirstName: "",
    officeAddress: "",
    parish: "",
    officePhone: "",
    mcjRegNo: "",
    signature: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addCondition = () => {
    setConditions([...conditions, { name: "", severity: "" }]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    const updated = [...conditions];
    updated[index][field] = value;
    setConditions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validConditions = conditions.filter(c => c.name && c.severity);
    if (validConditions.length === 0) {
      toast.error("Please add at least one condition");
      return;
    }

    toast.success("Application certified and submitted to NHF for review");
    // In production, this would send data to backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Certification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">I certify that {patientData.firstName} {patientData.surname} has the following conditions:</h4>
            
            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Condition {index + 1}</Label>
                      <Input
                        placeholder="e.g., Diabetes Type 2"
                        value={condition.name}
                        onChange={(e) => updateCondition(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Severity</Label>
                      <Input
                        placeholder="e.g., Moderate"
                        value={condition.severity}
                        onChange={(e) => updateCondition(index, "severity", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {conditions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCondition(index)}
                      className="mt-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addCondition}
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Condition
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certificationDate">Date *</Label>
              <Input
                id="certificationDate"
                type="date"
                value={formData.certificationDate}
                onChange={(e) => handleChange("certificationDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcjRegNo">MCJ Reg No. *</Label>
              <Input
                id="mcjRegNo"
                value={formData.mcjRegNo}
                onChange={(e) => handleChange("mcjRegNo", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorSurname">Doctor's Surname *</Label>
              <Input
                id="doctorSurname"
                value={formData.doctorSurname}
                onChange={(e) => handleChange("doctorSurname", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorFirstName">Doctor's First Name *</Label>
              <Input
                id="doctorFirstName"
                value={formData.doctorFirstName}
                onChange={(e) => handleChange("doctorFirstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="officeAddress">Office Address *</Label>
              <Input
                id="officeAddress"
                value={formData.officeAddress}
                onChange={(e) => handleChange("officeAddress", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parish">Parish *</Label>
              <Input
                id="parish"
                value={formData.parish}
                onChange={(e) => handleChange("parish", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officePhone">Office Phone *</Label>
              <Input
                id="officePhone"
                type="tel"
                value={formData.officePhone}
                onChange={(e) => handleChange("officePhone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="signature">Doctor Signature (Type Name) *</Label>
              <Input
                id="signature"
                value={formData.signature}
                onChange={(e) => handleChange("signature", e.target.value)}
                placeholder="Type your full name as signature"
                required
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Total Number of Conditions: {conditions.filter(c => c.name && c.severity).length}</p>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="min-w-[200px]">
              Certify & Submit to NHF
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DoctorCertificationForm;
