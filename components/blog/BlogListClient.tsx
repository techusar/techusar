'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';
import { Search, Calendar, Clock, ArrowRight, Tag, Sparkles, Bot, MessageSquare } from 'lucide-react';

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogListClient({ initialPosts, categories }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts]);

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, or topic (e.g. AI bots, Next.js, Accounting)..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-hidden focus:border-blue-500 text-neutral-900 dark:text-white placeholder:text-neutral-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured AI Agent & Bot Highlight Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 dark:border-blue-900/50 bg-linear-to-r from-blue-50 via-indigo-50 to-white dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-neutral-900/40 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>CUSTOM AI AGENTS & BOT SERVICES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
              Hum Chote Mote AI Agents & Automation Bots Bhi Banate Hain!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Looking for a custom Telegram bot, WhatsApp automation, 24/7 AI customer service chatbot, or data scraping agent? Hum tailored bots develop karte hain jo aapka waqt aur mehnat bachate hain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923318917330?text=Assalam-o-Alaikum%20Usman!%20Mujhe%20apne%20business%20ke%20lye%20Custom%20AI%20Agent%20/%20Bot%20banwana%20hai."
              target="_blank"
              rel="noopener noreferrer"
              data-track="blog_list_banner_whatsapp"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp (0331-8917330)</span>
            </a>
            <Link
              href="/contact?service=ai-agents"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-xs hover:opacity-90 transition-all"
            >
              <span>Order Custom Bot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post Card (if on All and no search) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div className="group relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {featuredPost.coverImage && (
              <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[260px] overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-xs">
                    Featured Article
                  </span>
                </div>
              </div>
            )}
            <div className={`p-6 sm:p-8 ${featuredPost.coverImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-800/60">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featuredPost.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredPost.readTime}</span>
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    U
                  </div>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {featuredPost.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Posts Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          </span>
          {selectedCategory !== 'All' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset category
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
            <Sparkles className="w-8 h-8 mx-auto text-neutral-400" />
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">
              No matching articles found
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search keywords or switch category filter to &quot;All&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 hover:border-blue-500/50 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 text-[11px] font-mono">{post.date}</span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-mono font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
