import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const author = formData.get("author") as string;
    const readTime = parseInt(formData.get("readTime") as string);
    const tags = JSON.parse(formData.get("tags") as string);
    const mainImageId = formData.get("mainImageId") as string;

    // Get all images from formData
    const images = formData.getAll("images") as File[];

    // Upload images to Sanity
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const imageAsset = await client.assets.upload("image", image, {
          filename: image.name,
        });
        return imageAsset;
      })
    );

    // Find main image
    const mainImage =
      uploadedImages.find((img) => img._id.includes(mainImageId)) ||
      uploadedImages[0];

    // Create content array with images
    const contentArray = uploadedImages.map((img) => ({
      _type: "image",
      asset: {
        _type: "reference",
        _ref: img._id,
      },
      alt: title,
    }));

    // Create article document
    const article = await client.create({
      _type: "articles",
      title,
      slug: {
        _type: "slug",
        current: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      },
      description,
      author,
      date: new Date().toISOString(),
      readTime,
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: mainImage._id,
        },
        alt: title,
      },
      content: contentArray,
      tags,
      published: false, // Default to unpublished, user can publish in Sanity Studio
    });

    return NextResponse.json(
      {
        success: true,
        articleId: article._id,
        message: "Article created successfully! Check Sanity Studio to publish.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading article:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
