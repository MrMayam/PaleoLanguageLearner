import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Crown, Star, Download, BarChart3, Users, BookOpen } from "lucide-react";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  type: 'monthly' | 'yearly' | 'school';
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: 4.99,
    period: 'per month',
    type: 'monthly',
    features: [
      'All 22 Paleo Hebrew characters',
      'Advanced pronunciation games',
      'Progress tracking & analytics',
      'Offline content access',
      'Parent progress reports',
      'Achievement system',
      'No ads'
    ]
  },
  {
    id: 'yearly',
    name: 'Premium Yearly',
    price: 39.99,
    originalPrice: 59.88,
    period: 'per year',
    type: 'yearly',
    popular: true,
    features: [
      'All Premium Monthly features',
      'Save 33% vs monthly',
      'Priority customer support',
      'Early access to new content',
      'Custom character creation',
      'Ancient word library (500+ words)',
      'Cultural context lessons'
    ]
  },
  {
    id: 'school',
    name: 'School License',
    price: 299.00,
    period: 'per year',
    type: 'school',
    features: [
      'All Premium features',
      'Up to 30 student accounts',
      'Teacher dashboard',
      'Classroom management tools',
      'Progress reports for all students',
      'Curriculum integration guides',
      'Dedicated support specialist'
    ]
  }
];

const CheckoutForm = ({ subscriptionType, onSuccess }: { subscriptionType: string, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/premium?success=true',
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Welcome to Premium! Enjoy all the features.",
      });
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        {isProcessing ? "Processing..." : `Subscribe to ${subscriptionType}`}
      </Button>
    </form>
  );
};

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["/api/user/1"],
  });

  const { data: premiumAccess } = useQuery({
    queryKey: ["/api/user/1/premium-access"],
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionType: string) => {
      const response = await apiRequest("POST", "/api/create-subscription", {
        userId: 1,
        subscriptionType
      });
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setShowCheckout(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (planType: string) => {
    setSelectedPlan(planType);
    createSubscriptionMutation.mutate(planType);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setClientSecret("");
    setSelectedPlan(null);
    queryClient.invalidateQueries({ queryKey: ["/api/user/1"] });
    queryClient.invalidateQueries({ queryKey: ["/api/user/1/premium-access"] });
    
    toast({
      title: "Welcome to Premium!",
      description: "You now have access to all premium features.",
    });
  };

  if (premiumAccess?.hasPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Member</h1>
            <p className="text-lg text-gray-600">You have access to all premium features!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">All Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Access to all 22 Paleo Hebrew characters</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Download className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Offline Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Download content for offline learning</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Progress Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Detailed analytics and parent reports</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-lg">No Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Ad-free learning experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout && clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Complete Your Subscription</CardTitle>
              <CardDescription className="text-center">
                Subscribe to {selectedPlan} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  subscriptionType={selectedPlan || ''} 
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unlock Premium Learning</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to all Paleo Hebrew characters, advanced features, and personalized learning experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-purple-500 border-2 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-purple-600">
                    ${plan.price}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${plan.originalPrice}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">{plan.period}</div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSubscribe(plan.type)}
                  disabled={createSubscriptionMutation.isPending}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {createSubscriptionMutation.isPending && selectedPlan === plan.type ? "Loading..." : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>✓ Secure payment processing</span>
            <span>✓ Instant access</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}