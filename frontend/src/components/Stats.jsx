import React, { useEffect, useState } from 'react';
import { Users, Activity, HeartHandshake, Layers } from 'lucide-react';
import { apiService } from '../services/api';
import './Stats.css';

export default function Stats() {
  const [stats, setStats] = useState({
    activeUsers: "50K+",
    uptime: "99.99%",
    satisfactionRate: "98.5%",
    integrations: "120+"
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await apiService.getStats();
      if (res && res.data) {
        setStats(res.data);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Active Developers',
      value: stats.activeUsers,
      desc: 'Building modern apps worldwide',
      icon: <Users size={26} className="stat-icon-users" />
    },
    {
      label: 'Guaranteed Uptime',
      value: stats.uptime,
      desc: 'High availability SLA',
      icon: <Activity size={26} className="stat-icon-uptime" />
    },
    {
      label: 'Customer Satisfaction',
      value: stats.satisfactionRate,
      desc: 'Verified by G2 and Trustpilot',
      icon: <HeartHandshake size={26} className="stat-icon-satisfaction" />
    },
    {
      label: 'Pre-built Modules',
      value: stats.integrations,
      desc: 'Plug and play APIs ready',
      icon: <Layers size={26} className="stat-icon-modules" />
    }
  ];

  return (
    <section className="section stats-section" id="stats">
      <div className="container">
        <div className="stats-grid">
          {statCards.map((item, index) => (
            <div key={index} className="stat-card glass-card">
              <div className="stat-top">
                <div className="stat-icon-wrapper">
                  {item.icon}
                </div>
                <div className="stat-pulse"></div>
              </div>
              <div className="stat-value text-gradient">{item.value}</div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
