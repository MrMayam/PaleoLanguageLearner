import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Unlock, Star, ShoppingCart } from "lucide-react";
import type { CharacterPack } from "@shared/schema";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const CheckoutForm = ({ packName, onSuccess }: { packName: string, onSuccess: () => void }) => {
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
        return_url: window.location.origin + '/character-packs?success=true',
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
        title: "Purchase Successful",
        description: `${packName} character pack unlocked!`,
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
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      >
        {isProcessing ? "Processing..." : `Purchase ${packName}`}
      </Button>
    </form>
  );
};

export default function CharacterPacks() {
  const [selectedPack, setSelectedPack] = useState<CharacterPack | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["/api/user/1"],
  });

  const { data: characterPacks = [] } = useQuery({
    queryKey: ["/api/character-packs"],
  });

  const { data: premiumAccess } = useQuery({
    queryKey: ["/api/user/1/premium-access"],
  });

  const purchasePackMutation = useMutation({
    mutationFn: async (packId: number) => {
      const response = await apiRequest("POST", "/api/purchase-character-pack", {
        userId: 1,
        packId
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
        description: error.message || "Failed to initiate purchase",
        variant: "destructive",
      });
    },
  });

  const handlePurchase = (pack: CharacterPack) => {
    setSelectedPack(pack);
    purchasePackMutation.mutate(pack.id);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setClientSecret("");
    setSelectedPack(null);
    queryClient.invalidateQueries({ queryKey: ["/api/user/1"] });
    queryClient.invalidateQueries({ queryKey: ["/api/character-packs"] });
    
    toast({
      title: "Character Pack Unlocked!",
      description: "You can now access these characters in all learning modules.",
    });
  };

  const hasAccessToPack = (pack: CharacterPack) => {
    if (premiumAccess?.hasPremium) return true;
    return user?.premiumCharacterPacks?.includes(pack.id.toString()) || false;
  };

  // Default character packs if none exist in database
  const defaultPacks: CharacterPack[] = [
    {
      id: 1,
      name: "Ancient Aleph Pack",
      description: "First 5 characters: Ah-Lap, Ba-Yath, Ga-Mal, Da-Lath, Ha",
      price: 299, // $2.99
      characterIds: [1, 2, 3, 4, 5],
      isPremium: true,
      order: 1,
      imageUrl: null
    },
    {
      id: 2,
      name: "Sacred Symbols Pack",
      description: "Next 5 characters: Wa-Wa, Za-Yan, Chaa-Lan, Ta, Yad",
      price: 299, // $2.99
      characterIds: [6, 7, 8, 9, 10],
      isPremium: true,
      order: 2,
      imageUrl: null
    },
    {
      id: 3,
      name: "Divine Letters Pack",
      description: "Characters 11-15: Kaf, La-Mad, Ma-Yam, Na-Hash, Sa-Mek",
      price: 299, // $2.99
      characterIds: [11, 12, 13, 14, 15],
      isPremium: true,
      order: 3,
      imageUrl: null
    },
    {
      id: 4,
      name: "Ancient Wisdom Pack",
      description: "Characters 16-20: A-Yan, Pa, Tsa-Da, Qaf, Resh",
      price: 299, // $2.99
      characterIds: [16, 17, 18, 19, 20],
      isPremium: true,
      order: 4,
      imageUrl: null
    },
    {
      id: 5,
      name: "Complete Collection",
      description: "Final characters 21-22: Shan, Ta-Wa plus bonus ancient words",
      price: 399, // $3.99
      characterIds: [21, 22],
      isPremium: true,
      order: 5,
      imageUrl: null
    }
  ];

  const packs = characterPacks.length > 0 ? characterPacks : defaultPacks;

  if (showCheckout && clientSecret && selectedPack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Complete Your Purchase</CardTitle>
              <CardDescription className="text-center">
                {selectedPack.name} - ${(selectedPack.price / 100).toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm 
                  packName={selectedPack.name} 
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Character Pack Store</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock authentic Paleo Hebrew characters and expand your learning journey
          </p>
          
          {premiumAccess?.hasPremium && (
            <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg inline-block">
              <p className="text-green-800 font-medium">
                ✓ Premium Member: All character packs are included in your subscription!
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {packs.map((pack) => {
            const hasAccess = hasAccessToPack(pack);
            
            return (
              <Card 
                key={pack.id} 
                className={`relative ${hasAccess ? 'border-green-500 bg-green-50' : ''}`}
              >
                {hasAccess && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Unlocked
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{pack.name}</CardTitle>
                    {hasAccess ? (
                      <Unlock className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <CardDescription>{pack.description}</CardDescription>
                  <div className="text-2xl font-bold text-green-600">
                    ${(pack.price / 100).toFixed(2)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{pack.characterIds.length} authentic Paleo Hebrew characters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Interactive pronunciation guides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Cultural context & meanings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Tracing practice modules</span>
                    </div>
                    {pack.id === 5 && (
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Bonus: 20+ ancient Hebrew words</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handlePurchase(pack)}
                    disabled={hasAccess || purchasePackMutation.isPending}
                    className={`w-full ${
                      hasAccess 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {hasAccess ? "✓ Owned" : 
                     purchasePackMutation.isPending && selectedPack?.id === pack.id ? "Loading..." : 
                     "Purchase Pack"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Individual Packs?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Learn at Your Pace</h4>
              <p className="text-sm text-gray-600">Master each set of characters before moving to the next pack</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Authentic Content</h4>
              <p className="text-sm text-gray-600">Each pack features historically accurate character names and pronunciations</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Affordable Learning</h4>
              <p className="text-sm text-gray-600">Pay only for what you need, when you need it</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              All purchases are one-time fees with lifetime access. Secure payment processing by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}