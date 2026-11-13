import { useEffect, useState } from "react";
import { Link } from "react-router";

import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = () => {
      try {
        setLoading(true);

        setTimeout(() => {
          if (!blogs || blogs.length === 0) {
            throw new Error("No blog posts available.");
          }

          setPosts(blogs);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  const filteredPosts = posts.filter((blog) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All" || category === blog.category;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find((blog) => blog.featured);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">THE BRIEFLY JOURNAL</span>

          <h1>
            Ideas worth
            <span> reading.</span>
          </h1>

          <p>
            Thoughtful stories on technology, design, products, and the
            people building the digital world.
          </p>
        </div>
      </section>

      {loading && (
        <div className="state-message">
          <div className="loader"></div>
          <p>Loading stories...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-message error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {featuredPost && (
            <section className="featured-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">FEATURED STORY</span>
                  <h2>Editor's pick</h2>
                </div>
              </div>

              <article className="featured-card">
                <div className="featured-image-wrap">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="featured-image"
                  />
                </div>

                <div className="featured-content">
                  <div className="blog-meta">
                    <span className="category-badge">
                      {featuredPost.category}
                    </span>

                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2>{featuredPost.title}</h2>

                  <p>{featuredPost.excerpt}</p>

                  <div className="featured-footer">
                    <div className="blog-author">
                      <span className="author-avatar">
                        {featuredPost.author.charAt(0)}
                      </span>

                      <div>
                        <strong>{featuredPost.author}</strong>
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="read-link"
                    >
                      Read story →
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          )}

          <section className="blog-section">
            <div className="section-heading">
              <div>
                <span className="section-label">LATEST STORIES</span>
                <h2>Explore the journal</h2>
              </div>

              <span className="post-count">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "story" : "stories"}
              </span>
            </div>

            <div className="controls">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search stories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      category === item
                        ? "category-filter active"
                        : "category-filter"
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="blog-grid">
                {filteredPosts.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No stories found</h3>
                <p>Try a different search term or category.</p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Home;