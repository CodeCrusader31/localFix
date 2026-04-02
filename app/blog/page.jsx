import Link from "next/link";
import Footer from "@/components/footer";

export const metadata = {
  title: "Blog | LocalFix",
  description:
    "Practical home service tips, guides, and booking advice—made for local professionals and customers.",
};

const POSTS = [
  {
    title: "How to Book a Service in Minutes",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    tag: "Booking",
    snippet:
      "From choosing a category to confirming the appointment—here’s the simplest step-by-step flow.",
  },
  {
    title: "Plumbing Troubles: When to Call a Pro",
    date: "Feb 24, 2026",
    readTime: "6 min read",
    tag: "Plumbing",
    snippet:
      "Learn the warning signs of leaks, clogs, and pressure issues—so you can act early and avoid damage.",
  },
  {
    title: "Electric Safety Checklist for Every Home",
    date: "Jan 30, 2026",
    readTime: "7 min read",
    tag: "Safety",
    snippet:
      "Quick checks you can do at home, plus when it’s time to schedule an electrician.",
  },
  {
    title: "Carpentry & Furniture Care Tips",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    tag: "Carpentry",
    snippet:
      "Small routines that help keep your furniture sturdy, clean, and looking like new.",
  },
  {
    title: "Outdoor Services: Maintenance That Pays Off",
    date: "Dec 12, 2025",
    readTime: "5 min read",
    tag: "Outdoors",
    snippet:
      "Seasonal tips for lawns, decks, fencing, and pressure washing—so your property stays in top shape.",
  },
  {
    title: "AC Repair: What to Check Before Calling",
    date: "Nov 22, 2025",
    readTime: "6 min read",
    tag: "AC Repair",
    snippet:
      "A quick diagnostic guide: cooling issues, airflow checks, and common causes to share with a technician.",
  },
];

const TOPICS = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Cleaning",
  "AC Repair",
  "Appliance Repair",
  "Gardening",
  "Moving Services",
  "Home Renovation",
];

function PostCard({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            {post.tag}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">{post.readTime}</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          {post.title}
        </h3>
        <p className="mt-2 text-gray-600 leading-relaxed">{post.snippet}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">{post.date}</span>
          <Link
            href="/blog"
            className="text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200 opacity-40 blur-sm" />
            <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-indigo-200 opacity-40 blur-sm" />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-medium">
                <span aria-hidden="true">📝</span>
                Guides, tips & service know-how
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                LocalFix Blog
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl leading-relaxed">
                Practical home service advice for customers—covering plumbing,
                electrical, carpentry, cleaning, outdoor maintenance, and more.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-95 transition-opacity"
                >
                  Book a Service
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 font-medium hover:bg-indigo-50 transition-colors"
                >
                  Why LocalFix
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Learn common fixes, safety tips, and booking best practices from
              local service experts.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Popular Topics</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Jump to what you need most—then book a verified professional when
              you’re ready.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {TOPICS.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-indigo-700 font-medium text-sm shadow-sm"
              >
                <span aria-hidden="true" className="mr-2">
                  ✦
                </span>
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Explore Services
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 font-medium hover:bg-indigo-50 transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
