import { defineField, defineType } from "sanity";

export default defineType({
  name: "articles",
  title: "Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Required for blog/gallery/hybrid articles. Optional for PDF articles.",
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Upload a PDF file. Required when display type is PDF.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Required for blog/gallery/hybrid articles. Optional for PDF articles.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "displayType",
      title: "Display Type",
      type: "string",
      options: {
        list: [
          { title: "Gallery (Images Only)", value: "gallery" },
          { title: "Blog (Full Content)", value: "blog" },
          { title: "Hybrid (Blog + Gallery)", value: "hybrid" },
          { title: "PDF (Upload PDF File)", value: "pdf" },
        ],
      },
      initialValue: "blog",
      validation: (Rule) => Rule.required(),
      description: "How to display this article - gallery shows only images, blog shows full text, hybrid shows both, pdf displays an uploaded PDF file",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
});
