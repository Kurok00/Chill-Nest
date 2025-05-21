import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const BlogCard = ({ post }) => {
  const {
    _id,
    title,
    slug,
    summary,
    featured_image,
    author,
    categories,
    published_at,
    views
  } = post;

  // Format date
  const formattedDate = published_at ? 
    format(new Date(published_at), 'd MMMM, yyyy', { locale: vi }) : '';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <Link to={`/blogs/${slug}`}>
        <div className="relative h-44 overflow-hidden">
          <img 
            src={featured_image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Categories */}
          {categories?.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {categories[0]}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/blogs/${slug}`}>
          <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {summary}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img 
              src={author?.profile_image} 
              alt={author?.user_name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-xs text-gray-600">{author?.user_name}</span>
          </div>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        
        {/* Views and Read More */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{views} lượt xem</span>
          <Link to={`/blogs/${slug}`} className="text-blue-600 hover:text-blue-800">
            Đọc tiếp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
