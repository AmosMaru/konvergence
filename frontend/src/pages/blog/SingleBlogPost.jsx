import React from "react";
import { Link } from "react-router-dom";

const SingleBlogPost = () => {
  const post = {
    title: "Understanding PCOS: Symptoms, Diagnosis, and Management",
    date: "June 15, 2023",
    readTime: "5 min read",
    author: "Dr. Jane Doe",
    content: `
      Polycystic Ovary Syndrome (PCOS) affects up to 15% of women globally, making it one of the most common endocrine disorders among women of reproductive age. Despite its prevalence, many women remain undiagnosed or mismanaged because symptoms can be diverse and complex.

      What is PCOS?
      PCOS is a hormonal disorder characterized by a combination of symptoms related to elevated androgens (male hormones) and ovarian dysfunction. While the exact cause remains unclear, research suggests a complex interplay between genetic predisposition and environmental factors.

      Common Symptoms:
      PCOS presents differently in each woman, but common symptoms include:
      • Irregular menstrual cycles
      • Excess facial and body hair (hirsutism)
      • Acne and oily skin
      • Weight gain and difficulty losing weight
      • Hair loss or thinning
      • Mood changes and anxiety

      Diagnosis Process:
      There is no single definitive test for PCOS. Diagnosis typically involves:
      • Medical history review
      • Physical examination
      • Blood tests
      • Ultrasound imaging

      Management Strategies:
      While there is no cure for PCOS, symptoms can be effectively managed through:
      • Lifestyle Modifications
      • Medical Treatments
      • Regular Monitoring

      Conclusion:
      Understanding your condition and maintaining regular communication with your healthcare provider is essential for managing PCOS effectively.
    `,
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Understanding PCOS: Symptoms, Diagnosis, and Management",
      date: "June 12, 2023",
      tags: ["PCOS", "Menstruation"],
      image: "/blog/article-2.jpg",
      excerpt:
        "Learn about the various symptoms, diagnosis process, and management strategies for PCOS.",
    },
    {
      id: 3,
      title: "Understanding PCOS: Symptoms, Diagnosis, and Management",
      date: "June 10, 2023",
      tags: ["PCOS", "Menstruation"],
      image: "/blog/article-3.jpg",
      excerpt:
        "Learn about the various symptoms, diagnosis process, and management strategies for PCOS.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Blog */}
        <div className="flex justify-center items-center mb-6">
          <Link
            to="/blog"
            className="w-[100%] flex items-center border border-gray-200 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back To Blog
          </Link>
        </div>

        {/* Tag */}
        <span className="inline-block bg-pink-50 text-pink-500 text-xs font-semibold px-4 py-1 rounded-full mb-4">
          PCOS
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Understanding PCOS: Symptoms, Diagnosis, and Management
        </h1>

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Posted by Dr. John Doe</span>
          <span className="mx-2">•</span>
          <span>
            <svg
              className="inline w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            April 2, 2025
          </span>
          <span className="mx-2">•</span>
          <span>
            <svg
              className="inline w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            8 min read
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="/blog/article-1.jpg"
              alt="PCOS Article"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-pink max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share Article */}
        <div className="mt-12 pt-8 border-t border-pink-200">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button className="p-2 text-gray-600 hover:text-pink-600">
              <span className="sr-only">Share on Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-600">
              <span className="sr-only">Share on Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-600">
              <span className="sr-only">Share on LinkedIn</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>{article.date}</span>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-pink-50 text-pink-500 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPost;
