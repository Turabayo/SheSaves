import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useInvestments } from "@/hooks/useInvestments";
import { useToast } from "@/hooks/use-toast";

const AddInvestment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addInvestment } = useInvestments();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    target_amount: "",
    category: "",
    date: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Emergency Fund",
    "Education Fund", 
    "Small Business",
    "Retirement Fund",
    "Home Purchase",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.amount || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const result = await addInvestment({
        name: formData.name,
        amount: parseFloat(formData.amount),
        target_amount: formData.target_amount ? parseFloat(formData.target_amount) : undefined,
        category: formData.category
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Investment added successfully!",
        description: `${formData.name} has been added to your portfolio.`
      });

      // Reset form
      setFormData({
        name: "",
        amount: "",
        target_amount: "",
        category: "",
        date: "",
        note: ""
      });

      // Navigate back to investments
      navigate('/investments');
    } catch (error: any) {
      console.error('Add investment error:', error);
      toast({
        title: "Error adding investment",
        description: error.message || "Unable to add investment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">SheSaves</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Add Investment</h1>
            <Button
              onClick={() => navigate('/top-up')}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
            >
              <CreditCard size={16} />
              Top Up
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Investment Name */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Investment Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="py-3 text-lg border border-gray-300 rounded-lg"
                placeholder="e.g., Emergency Fund"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Current Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="pl-8 py-3 text-lg border border-gray-300 rounded-lg"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Target Amount (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={formData.target_amount}
                  onChange={(e) => setFormData({...formData, target_amount: e.target.value})}
                  className="pl-8 py-3 text-lg border border-gray-300 rounded-lg"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="py-3 text-lg border border-gray-300 rounded-lg">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="py-3 text-lg border border-gray-300 rounded-lg pr-10"
                />
                <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">Note (optional)</label>
              <Textarea
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="Add a note about this investment..."
                className="py-3 text-lg border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                "Add Investment"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddInvestment;
