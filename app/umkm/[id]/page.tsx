"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Heart } from "lucide-react";
import ProductCard from "@/components/product-card";
import ImageGallery from "@/components/image-gallery";
import GoogleMap from "@/components/google-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites-context";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface UMKM {
  id: string;
  name: string;
  description: string;
  image?: string; // ✅ Ubah ini agar tidak wajib
  location: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  category: string;
  products: Product[];
}

// Mock data - in a real application, this would come from an API
const umkmData = {
  id: "1",
  name: "Batik Sekar",
  description:
    "Traditional handmade batik from local artisans, featuring intricate patterns and vibrant colors that reflect the rich cultural heritage of Indonesia. Each piece is carefully crafted using time-honored techniques passed down through generations.",
  images: [
    "/placeholder.svg?height=400&width=800&text=UMKM+Image+1",
    "/placeholder.svg?height=400&width=800&text=UMKM+Image+2",
    "/placeholder.svg?height=400&width=800&text=UMKM+Image+3",
  ],
  image: "/placeholder.svg?height=400&width=800&text=UMKM+Image+1", // ✅ Tambahkan ini
  location: "Jl. Malioboro No. 123, Yogyakarta",
  phoneNumber: "+62 812-3456-7890",
  latitude: -7.797068,
  longitude: 110.370529,
  openingTime: "09:00",
  closingTime: "18:00",
  category: "Textiles",
  products: [
    {
      id: "1",
      name: "Batik Shirt",
      description: "Handmade batik shirt with traditional Javanese motifs",
      image: "/placeholder.svg?height=200&width=400&text=Batik+Shirt",
      price: 49.99,
    },
    {
      id: "2",
      name: "Batik Scarf",
      description: "Elegant batik scarf made from fine silk",
      image: "/placeholder.svg?height=200&width=400&text=Batik+Scarf",
      price: 29.99,
    },
    {
      id: "3",
      name: "Batik Tablecloth",
      description:
        "Beautiful batik tablecloth for a touch of Indonesian elegance",
      image: "/placeholder.svg?height=200&width=400&text=Batik+Tablecloth",
      price: 39.99,
    },
  ],
};

export default function UMKMDetail({ params }: { params: { id: string } }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    async function resolveParams() {
      if ("then" in params) {
        const result = await params;
        setResolvedParams(result);
      } else {
        setResolvedParams(params);
      }
    }
    resolveParams();
  }, [params]);

  if (!resolvedParams) return <div>Loading...</div>;

  const { id } = resolvedParams;

  const [umkm, setUMKM] = useState(umkmData);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFavorited = isFavorite(umkm.id);

  useEffect(() => {
    // In a real application, fetch the UMKM data based on the ID
    // For now, we'll just use the mock data
    setUMKM(umkmData);
  }, []);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(umkm.id);
    } else {
      addFavorite(umkm);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <ImageGallery images={umkm.images} />
          </div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{umkm.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteToggle}
                aria-label={
                  isFavorited ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Heart
                  className={`h-6 w-6 ${
                    isFavorited
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
            <div className="flex items-center mb-4">
              <Badge variant="secondary" className="mr-2">
                {umkm.category}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-6">{umkm.description}</p>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    <span>{umkm.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    <span>{umkm.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    <span>
                      Open: {umkm.openingTime} - {umkm.closingTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="products" className="mb-8">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {umkm.products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="location">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <GoogleMap latitude={umkm.latitude} longitude={umkm.longitude} />
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About {umkm.name}</h2>
          <p className="text-muted-foreground mb-4">
            {umkm.name} is a proud member of the UMKM community, showcasing the
            best of Indonesian craftsmanship. Our dedication to preserving
            traditional techniques while embracing modern designs has made us a
            favorite among locals and tourists alike.
          </p>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>
              Visit us to explore our full collection of handcrafted products!
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
