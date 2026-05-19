// pages/product/[slug].jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // URL decode the slug
        const decodedSlug = decodeURIComponent(slug);
        
        const res = await fetch(`${API_BASE_URL}/api/products/${decodedSlug}`);
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          throw new Error(data.message || `HTTP ${res.status}`);
        }

        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const getImageUrl = (url) => {
    if (!url) return "/images/placeholder-book.png";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return url;
    return `${API_BASE_URL}/storage/${url}`;
  };

  const formatPrice = (price) => {
    if (!price || price === "0.00" || price === "0") return "$0.00";
    return `$${parseFloat(price).toFixed(2)}`;
  };

  if (router.isFallback || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="mb-4 text-2xl font-bold text-red-500">Error</h1>
        <p className="mb-2 text-gray-600">{error}</p>
        <p className="mb-6 text-sm text-gray-500">Slug: {slug}</p>
        <Link href="/shop" className="px-6 py-3 text-white transition-colors bg-black rounded-xl hover:bg-gray-800">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-6 text-gray-600">The product you are looking for does not exist.</p>
        <Link href="/shop" className="px-6 py-3 text-white transition-colors bg-black rounded-xl hover:bg-gray-800">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const coverImage = product.cover_image || (images.length > 0 ? images[0] : null);
  const allImages = coverImage ? [coverImage, ...images.filter(img => img !== coverImage)] : images;

  return (
    <>
      <Head>
        <title>{product.title} | Your Store</title>
        <meta name="description" content={product.short_description || product.title} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="py-4 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-black">Shop</Link>
              <span>/</span>
              <span className="text-black">{product.title}</span>
            </div>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="container px-4 py-8 mx-auto lg:py-12">
          <div className="flex flex-wrap gap-8 lg:gap-12">
            
            {/* LEFT - Image Gallery */}
            <div className="w-full lg:w-5/12">
              <div className="sticky top-4">
                {/* Main Image */}
                <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-2xl aspect-[3/4]">
                  <img
                    src={getImageUrl(allImages[0])}
                    alt={product.title}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      e.target.src = "/images/placeholder-book.png";
                    }}
                  />
                  {product.discount_price && parseFloat(product.discount_price) > 0 && (
                    <div className="absolute px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-lg top-4 left-4">
                      -{Math.round(((parseFloat(product.price) - parseFloat(product.discount_price)) / parseFloat(product.price)) * 100)}%
                    </div>
                  )}
                  {product.format && (
                    <div className="absolute px-3 py-1 text-xs font-bold text-black uppercase bg-white rounded-lg top-4 right-4">
                      {product.format}
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        className="flex-shrink-0 w-20 h-20 overflow-hidden border-2 border-gray-200 rounded-xl hover:border-black"
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`${product.title} - ${index + 1}`}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = "/images/placeholder-book.png";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT - Product Info */}
            <div className="w-full lg:w-6/12">
              {/* Title & Author */}
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold leading-tight lg:text-4xl">
                  {product.title}
                </h1>
                {(product.author_name || product.author?.name) && (
                  <p className="text-lg text-gray-600">
                    by <span className="font-medium text-black">{product.author_name || product.author?.name}</span>
                  </p>
                )}
              </div>

              {/* Rating */}
              {product.average_rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.round(product.average_rating) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.average_rating} ({product.total_reviews || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                {product.discount_price && parseFloat(product.discount_price) > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(product.discount_price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <div className="mb-6 leading-relaxed text-gray-600">
                  {product.short_description}
                </div>
              )}

              {/* Product Meta */}
              <div className="grid grid-cols-2 gap-4 p-4 mb-6 bg-gray-50 rounded-xl">
                {product.isbn && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">ISBN</span>
                    <span className="font-medium">{product.isbn}</span>
                  </div>
                )}
                {product.language && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">Language</span>
                    <span className="font-medium capitalize">{product.language}</span>
                  </div>
                )}
                {product.pages_count && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">Pages</span>
                    <span className="font-medium">{product.pages_count}</span>
                  </div>
                )}
                {product.format && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">Format</span>
                    <span className="font-medium capitalize">{product.format}</span>
                  </div>
                )}
                {product.publication_date && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">Published</span>
                    <span className="font-medium">
                      {new Date(product.publication_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {product.sku && (
                  <div>
                    <span className="block text-xs text-gray-500 uppercase">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock_quantity > 0 ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-600">
                      In Stock ({product.stock_quantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-red-600">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button className="flex-1 px-8 py-3 font-medium text-white transition-colors bg-black border border-black rounded-xl hover:bg-white hover:text-black">
                  ADD TO CART
                </button>
                <button className="flex-1 px-8 py-3 font-medium text-black transition-colors border border-black rounded-xl hover:bg-black hover:text-white">
                  BUY NOW
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:border-black hover:bg-gray-50">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Category */}
              {product.category && (
                <div className="mb-4">
                  <span className="text-gray-600">Category: </span>
                  <span className="font-medium">{product.category.name}</span>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.is_bestseller && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-orange-500 rounded-lg">BESTSELLER</span>
                )}
                {product.is_featured && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-lg">FEATURED</span>
                )}
              </div>
            </div>
          </div>

          {/* Full Description */}
          {product.full_description && (
            <div className="mt-12">
              <div className="border-b border-gray-200">
                <div className="flex gap-8">
                  <button className="pb-4 text-sm font-bold text-black uppercase border-b-2 border-black">
                    Description
                  </button>
                </div>
              </div>
              <div className="py-8 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.full_description }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}