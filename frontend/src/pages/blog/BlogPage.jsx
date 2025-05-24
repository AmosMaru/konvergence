import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://gynocare.kilush.com/blogs/v1/api/posts/");
        setBlogPosts(response.data.results);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[88vh] bg-gray-900 flex items-end">
        <img
          src="/blog.jpg"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl py-12 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Resources
            </h1>
            <p className="text-lg text-white">
              Access expert articles on gynecological health and read real
              experiences from our community members.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-semibold mb-8">All blog posts</h2>

        {loading ? (
          <div className="text-center text-gray-500 py-16">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>
                        {new Date(post.publish).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>5 min read</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 flex-1">
                      {post.body.length > 100
                        ? post.body.substring(0, 100) + "..."
                        : post.body}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-colors duration-300">
            View all articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
