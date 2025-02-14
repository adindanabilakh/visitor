"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, Users } from "lucide-react"
import UMKMCard from "@/components/umkm-card"
import SearchFilter from "@/components/search-filter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featuredUMKMs = [
  {
    id: "1",
    name: "Batik Sekar",
    description: "Traditional handmade batik from local artisans",
    image: "/placeholder.svg?height=400&width=300&text=Batik+Sekar",
    location: "Yogyakarta",
    category: "Textiles",
    openingTime: "09:00",
    closingTime: "18:00",
  },
  {
    id: "2",
    name: "Warung Sate Pak Kumis",
    description: "Delicious local satay with secret family recipe",
    image: "/placeholder.svg?height=400&width=300&text=Warung+Sate",
    location: "Jakarta",
    category: "Food",
    openingTime: "17:00",
    closingTime: "23:00",
  },
  {
    id: "3",
    name: "Kerajinan Bambu Indah",
    description: "Eco-friendly bamboo crafts and furniture",
    image: "/placeholder.svg?height=400&width=300&text=Bamboo+Crafts",
    location: "Bali",
    category: "Handicrafts",
    openingTime: "10:00",
    closingTime: "20:00",
  },
  {
    id: "4",
    name: "Tenun Ikat Sumba",
    description: "Exquisite hand-woven textiles from Sumba",
    image: "/placeholder.svg?height=400&width=300&text=Tenun+Ikat",
    location: "Sumba",
    category: "Textiles",
    openingTime: "08:00",
    closingTime: "17:00",
  },
  {
    id: "5",
    name: "Kopi Luwak Authentic",
    description: "Premium civet coffee from Indonesian plantations",
    image: "/placeholder.svg?height=400&width=300&text=Kopi+Luwak",
    location: "Aceh",
    category: "Food",
    openingTime: "07:00",
    closingTime: "22:00",
  },
]

const categories = ["Textiles", "Food", "Handicrafts", "Electronics", "Fashion", "Beauty"]

const stats = [
  { icon: <Users className="w-6 h-6" />, value: "1000+", label: "Local Businesses" },
  { icon: <Search className="w-6 h-6" />, value: "50k+", label: "Monthly Searches" },
]

export default function Home() {
  const [filteredUMKMs, setFilteredUMKMs] = useState(featuredUMKMs)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = (query: string) => {
    const filtered = featuredUMKMs.filter(
      (umkm) =>
        umkm.name.toLowerCase().includes(query.toLowerCase()) ||
        umkm.description.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredUMKMs(filtered)
  }

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredUMKMs(featuredUMKMs)
    } else {
      const filtered = featuredUMKMs.filter((umkm) => umkm.category === category)
      setFilteredUMKMs(filtered)
    }
  }

  useEffect(() => {
    const animateCarousel = async () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        await controls.start({
          x: [-containerWidth, 0],
          transition: {
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          },
        })
      }
    }

    animateCarousel()
  }, [controls])

  return (
    <div>
      <section className="relative bg-background overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Discover Indonesia's Hidden Gems</h1>
            <p className="text-xl mb-8">
              Explore a world of unique products and services from local artisans and entrepreneurs
            </p>
            <Link href="/umkms">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex gap-4"
              animate={controls}
              style={{ width: `${featuredUMKMs.length * 320 * 2}px` }}
            >
              {[...featuredUMKMs, ...featuredUMKMs].map((umkm, index) => (
                <Card key={`${umkm.id}-${index}`} className="w-[300px] flex-shrink-0">
                  <CardContent className="p-4">
                    <Image
                      src={umkm.image || "/placeholder.svg"}
                      alt={umkm.name}
                      width={280}
                      height={200}
                      className="rounded-lg mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold mb-2">{umkm.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{umkm.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{umkm.location}</span>
                      <span className="text-sm">{umkm.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-primary rounded-full p-4 mb-4 text-primary-foreground">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured UMKMs</h2>
          <SearchFilter onSearch={handleSearch} onCategoryChange={handleCategoryChange} categories={categories} />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredUMKMs.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <UMKMCard {...umkm} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Choose UMKM Showcase?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Support local entrepreneurs and communities</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Discover unique, handcrafted products</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Connect directly with UMKM owners</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Contribute to Indonesia's economic growth</span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=UMKM+Showcase"
                alt="UMKM Showcase"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

