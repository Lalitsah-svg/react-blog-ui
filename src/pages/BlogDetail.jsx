import { Link, useParams } from "react-router";
import { blogs } from "../data/blogs";

function BlogDetail() {
  const { id } = useParams();

  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <main className="not-found">
        <span className="eyebrow">404</span>
        <h1>Story not found</h1>
        <p>
          The article you are looking for does not exist or may have
          been removed.
        </p>

        <Link to="/" className="back-link">
          ← Back to home
        </Link>
      </main>
    );
  }

  const relatedPosts = blogs
    .filter(
      (item) =>
        item.id !== blog.id && item.category === blog.category
    )
    .slice(0, 2);

  return (
    <main className="detail-page">
      <div className="detail-container">
        <Link to="/" className="back-link">
          ← Back to stories
        </Link>

        <article className="article">
          <header className="article-header">
            <div className="blog-meta">
              <span className="category-badge">
                {blog.category}
              </span>

              <span>{blog.readTime}</span>
            </div>

            <h1>{blog.title}</h1>

            <p className="article-excerpt">
              {blog.excerpt}
            </p>

            <div className="article-author">
              <span className="author-avatar">
                {blog.author.charAt(0)}
              </span>

              <div>
                <strong>{blog.author}</strong>
                <span>{blog.date}</span>
              </div>
            </div>
          </header>

          <img
            src={blog.image}
            alt={blog.title}
            className="article-cover"
          />

          <div className="article-body">
            {blog.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="article-tags">
            {blog.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="related-section">
            <div className="section-heading">
              <div>
                <span className="section-label">
                  KEEP READING
                </span>
                <h2>Related stories</h2>
              </div>
            </div>

            <div className="related-grid">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="related-card"
                >
                  <img src={post.image} alt={post.title} />

                  <div>
                    <span className="category-badge">
                      {post.category}
                    </span>

                    <h3>{post.title}</h3>

                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default BlogDetail;