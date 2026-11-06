import React, { useState, useEffect } from 'react';
import { Megaphone, ArrowRight, X } from 'lucide-react';
import { apiService } from '../services/api';
import './Banner.css';

export default function Banner() {
  const [banner, setBanner] = useState(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await apiService.getBanner();
        if (res && res.success && res.data && res.data.enabled) {
          setBanner(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch top banner", err);
      }
    };
    fetchBanner();
  }, []);

  if (closed || !banner || !banner.enabled) return null;

  return (
    <div className="top-announcement-banner">
      <div className="container banner-inner">
        <div className="banner-content-wrap">
          {banner.badgeText && (
            <span className="banner-badge-pill">{banner.badgeText}</span>
          )}
          <span className="banner-msg-text">{banner.message}</span>
          {banner.linkText && (
            <a href={banner.linkUrl || '#features'} className="banner-cta-link">
              <span>{banner.linkText}</span>
              <ArrowRight size={14} />
            </a>
          )}
        </div>
        <button 
          className="banner-close-btn" 
          onClick={() => setClosed(true)}
          aria-label="Dismiss banner"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
