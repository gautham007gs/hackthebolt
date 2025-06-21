import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  Award, 
  Download, 
  Share2, 
  CheckCircle, 
  Calendar, 
  Eye,
  ExternalLink,
  Shield,
  Trophy,
  Medal,
  Zap,
  Star,
  Globe,
  QrCode,
  Copy,
  Printer
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: number;
  userId: string;
  type: string;
  title: string;
  description: string;
  category: string;
  criteria: any;
  imageUrl: string;
  certificateCode: string;
  verificationUrl: string;
  issueDate: string;
  expiryDate: string | null;
  metadata: any;
  isRevoked: boolean;
  createdAt: string;
}

const certificateTypes = {
  course_completion: {
    icon: Award,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    label: 'Course Completion'
  },
  lab_mastery: {
    icon: Shield,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    label: 'Lab Mastery'
  },
  ctf_champion: {
    icon: Trophy,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    label: 'CTF Champion'
  },
  skill_badge: {
    icon: Medal,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    label: 'Skill Badge'
  }
};

export default function ProfessionalCertificateSystem() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch user certificates
  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ['/api/certificates'],
    queryFn: () => apiRequest('/api/certificates')
  });

  // Verify certificate mutation
  const verifyCertificateMutation = useMutation({
    mutationFn: (code: string) => apiRequest(`/api/certificates/verify/${code}`),
    onSuccess: (certificate) => {
      if (certificate) {
        toast({
          title: "Certificate Verified",
          description: `Valid certificate: ${certificate.title}`,
        });
      } else {
        toast({
          title: "Invalid Certificate",
          description: "Certificate not found or has been revoked",
          variant: "destructive",
        });
      }
    }
  });

  const downloadCertificate = (certificate: Certificate) => {
    // Create a professional certificate template
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner border
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Title
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 150);

    // Subtitle
    ctx.fillStyle = '#64748b';
    ctx.font = '24px Arial';
    ctx.fillText('This certifies that', canvas.width / 2, 220);

    // Recipient name placeholder
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('[RECIPIENT NAME]', canvas.width / 2, 300);

    // Achievement
    ctx.fillStyle = '#64748b';
    ctx.font = '24px Arial';
    ctx.fillText('has successfully completed', canvas.width / 2, 360);

    // Certificate title
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(certificate.title, canvas.width / 2, 420);

    // Description
    ctx.fillStyle = '#475569';
    ctx.font = '20px Arial';
    const words = certificate.description.split(' ');
    let line = '';
    let y = 480;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 800 && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Date and verification
    ctx.fillStyle = '#64748b';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Issued: ${new Date(certificate.issueDate).toLocaleDateString()}`, 100, canvas.height - 150);
    ctx.fillText(`Certificate ID: ${certificate.certificateCode}`, 100, canvas.height - 120);
    ctx.fillText(`Verify at: ${window.location.origin}/verify`, 100, canvas.height - 90);

    // Signature area
    ctx.textAlign = 'right';
    ctx.fillText('Authorized Signature', canvas.width - 100, canvas.height - 120);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 300, canvas.height - 130);
    ctx.lineTo(canvas.width - 100, canvas.height - 130);
    ctx.stroke();

    // Download
    const link = document.createElement('a');
    link.download = `certificate-${certificate.certificateCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareCertificate = (certificate: Certificate) => {
    const shareData = {
      title: `${certificate.title} - Certificate`,
      text: `I've earned a certificate in ${certificate.title}!`,
      url: certificate.verificationUrl
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(certificate.verificationUrl);
      toast({
        title: "Link Copied",
        description: "Certificate verification link copied to clipboard",
      });
    }
  };

  const groupedCertificates = certificates.reduce((acc: any, cert: Certificate) => {
    const type = cert.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(cert);
    return acc;
  }, {});

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Certificates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your achievements and professional certifications
          </p>
        </div>
        <Button onClick={() => setShowVerification(true)} variant="outline">
          <QrCode className="w-4 h-4 mr-2" />
          Verify Certificate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Certificates</p>
                <p className="text-3xl font-bold text-blue-600">{certificates.length}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Year</p>
                <p className="text-3xl font-bold text-green-600">
                  {certificates.filter((c: Certificate) => 
                    new Date(c.issueDate).getFullYear() === new Date().getFullYear()
                  ).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Skill Badges</p>
                <p className="text-3xl font-bold text-purple-600">
                  {certificates.filter((c: Certificate) => c.type === 'skill_badge').length}
                </p>
              </div>
              <Medal className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">CTF Wins</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {certificates.filter((c: Certificate) => c.type === 'ctf_champion').length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Grid */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Certificates</TabsTrigger>
          <TabsTrigger value="course_completion">Courses</TabsTrigger>
          <TabsTrigger value="lab_mastery">Labs</TabsTrigger>
          <TabsTrigger value="ctf_champion">CTF</TabsTrigger>
          <TabsTrigger value="skill_badge">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {Object.entries(groupedCertificates).map(([type, typeCertificates]) => {
            const typeConfig = certificateTypes[type as keyof typeof certificateTypes];
            if (!typeConfig) return null;

            return (
              <div key={type}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {React.createElement(typeConfig.icon, { className: "w-5 h-5" })}
                  {typeConfig.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(typeCertificates as Certificate[]).map((certificate) => (
                    <Card key={certificate.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <Badge className={typeConfig.color}>
                            {React.createElement(typeConfig.icon, { className: "w-3 h-3 mr-1" })}
                            {typeConfig.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(certificate.issueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {certificate.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {certificate.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Certificate preview */}
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center">
                          <div className="text-center">
                            <Award className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                            <div className="text-sm font-semibold text-blue-600">Certificate Preview</div>
                          </div>
                        </div>

                        {/* Metadata */}
                        {certificate.metadata && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {certificate.metadata.score && (
                              <div className="flex justify-between">
                                <span>Score:</span>
                                <span className="font-semibold">{certificate.metadata.score}%</span>
                              </div>
                            )}
                            {certificate.metadata.rank && (
                              <div className="flex justify-between">
                                <span>Rank:</span>
                                <span className="font-semibold">#{certificate.metadata.rank}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedCertificate(certificate)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadCertificate(certificate)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => shareCertificate(certificate)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {Object.entries(certificateTypes).map(([type, config]) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(groupedCertificates[type] || []).map((certificate: Certificate) => (
                <Card key={certificate.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <Badge className={config.color}>
                        {React.createElement(config.icon, { className: "w-3 h-3 mr-1" })}
                        {config.label}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {certificate.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {certificate.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Certificate preview */}
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center">
                      <div className="text-center">
                        <Award className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-600">Certificate Preview</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedCertificate(certificate)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadCertificate(certificate)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => shareCertificate(certificate)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <AlertDialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                {selectedCertificate.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedCertificate.description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-6">
              {/* Certificate Visual */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">{selectedCertificate.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedCertificate.description}</p>
                  <div className="text-sm text-gray-500">
                    Certificate ID: {selectedCertificate.certificateCode}
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Issue Date</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Certificate ID</h4>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {selectedCertificate.certificateCode}
                    </code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCertificate.certificateCode);
                        toast({ title: "Copied to clipboard" });
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Category</h4>
                  <Badge variant="outline">{selectedCertificate.category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verification</h4>
                  <a 
                    href={selectedCertificate.verificationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    Verify Online
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Criteria Met */}
              {selectedCertificate.criteria && (
                <div>
                  <h4 className="font-semibold mb-3">Requirements Met</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedCertificate.criteria).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{key}: {String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <Button onClick={() => downloadCertificate(selectedCertificate)}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={() => shareCertificate(selectedCertificate)} variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Verification Modal */}
      <AlertDialog open={showVerification} onOpenChange={setShowVerification}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Verify Certificate
            </AlertDialogTitle>
            <AlertDialogDescription>
              Enter a certificate code to verify its authenticity
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter certificate code (e.g., CERT-2024-ABC123)"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (verificationCode.trim()) {
                  verifyCertificateMutation.mutate(verificationCode);
                  setShowVerification(false);
                  setVerificationCode('');
                }
              }}
              disabled={!verificationCode.trim() || verifyCertificateMutation.isPending}
            >
              {verifyCertificateMutation.isPending ? 'Verifying...' : 'Verify'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}