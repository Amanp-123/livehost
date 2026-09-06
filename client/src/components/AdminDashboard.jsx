import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquareQuote, 
  Users, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw,
  Clock,
  Sparkles,
  TrendingUp,
  LayoutDashboard,
  Megaphone,
  CreditCard,
  HelpCircle,
  Settings,
  Activity,
  Download,
  ShieldAlert,
  Search
} from 'lucide-react';
import { apiService } from '../services/api';
import './AdminDashboard.css';

export default function AdminDashboard({ user, onLogout, onGoToLanding }) {
  // Tabs: 'stats' | 'testimonials' | 'leads' | 'messages' | 'banner' | 'pricing' | 'faqs' | 'settings' | 'logs'
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  // 1. Stats State
  const [stats, setStats] = useState({
    activeUsers: '50K+',
    uptime: '99.99%',
    satisfactionRate: '98.5%',
    integrations: '120+'
  });

  // 2. Announcement Banner State
  const [banner, setBanner] = useState({
    enabled: true,
    badgeText: '🚀 NEW V2 RELEASE',
    message: 'LiveHost 2.0 is now live with 5x faster edge deployment!',
    linkText: 'Learn More',
    linkUrl: '#features'
  });

  // 3. Pricing Plans State
  const [plans, setPlans] = useState([]);

  // 4. FAQs State
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // 5. Site Configuration & Maintenance Mode
  const [settings, setSettings] = useState({
    siteName: 'NovaStack',
    supportEmail: 'support@novastack.io',
    maintenanceMode: false,
    allowRegistrations: true
  });

  // 6. Activity & Security Logs
  const [logs, setLogs] = useState([]);

  // 7. Testimonials, Leads & Messages
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    avatar: '',
    comment: '',
    rating: 5
  });
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [leads, setLeads] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load all initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const [
        statsRes, 
        testRes, 
        leadsRes, 
        msgRes, 
        bannerRes, 
        pricingRes, 
        faqsRes, 
        settingsRes, 
        logsRes
      ] = await Promise.all([
        apiService.getStats(),
        apiService.getTestimonials(),
        apiService.getLeads(),
        apiService.getContactMessages(),
        apiService.getBanner(),
        apiService.getPricing(),
        apiService.getFaqs(),
        apiService.getSettings(),
        apiService.getLogs()
      ]);

      if (statsRes.success && statsRes.data) setStats(statsRes.data);
      if (testRes.success && testRes.data) setTestimonials(testRes.data);
      if (leadsRes.success && leadsRes.data) setLeads(leadsRes.data);
      if (msgRes.success && msgRes.data) setMessages(msgRes.data);
      if (bannerRes.success && bannerRes.data) setBanner(bannerRes.data);
      if (pricingRes.success && pricingRes.data) setPlans(pricingRes.data);
      if (faqsRes.success && faqsRes.data) setFaqs(faqsRes.data);
      if (settingsRes.success && settingsRes.data) setSettings(settingsRes.data);
      if (logsRes.success && logsRes.data) setLogs(logsRes.data);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerAlert = (msg) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3500);
  };

  // --- STATS HANDLER ---
  const handleUpdateStats = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.updateStats(stats);
      if (res.success) triggerAlert('Landing page stats updated live! 🚀');
    } catch {
      alert('Failed to update stats');
    }
  };

  // --- BANNER HANDLER ---
  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.updateBanner(banner);
      if (res.success) triggerAlert('Top Announcement Banner updated! 📢');
    } catch {
      alert('Failed to update banner');
    }
  };

  // --- PRICING PLAN HANDLER ---
  const handleUpdatePlan = async (id, updatedFields) => {
    try {
      const res = await apiService.updatePricingPlan(id, updatedFields);
      if (res.success) {
        setPlans(plans.map(p => p.id === id ? res.data : p));
        triggerAlert('Pricing plan updated successfully! 💳');
      }
    } catch {
      alert('Failed to update plan');
    }
  };

  // --- FAQS HANDLERS ---
  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    try {
      const res = await apiService.addFaq(newFaq);
      if (res.success) {
        setFaqs([...faqs, res.data]);
        setNewFaq({ question: '', answer: '' });
        setIsAddingFaq(false);
        triggerAlert('New FAQ published! ❓');
      }
    } catch {
      alert('Failed to add FAQ');
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      const res = await apiService.deleteFaq(id);
      if (res.success) {
        setFaqs(faqs.filter(f => f.id !== id));
        triggerAlert('FAQ deleted');
      }
    } catch {
      alert('Failed to delete FAQ');
    }
  };

  // --- SETTINGS HANDLER ---
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.updateSettings(settings);
      if (res.success) triggerAlert('Site settings & maintenance mode updated! ⚙️');
    } catch {
      alert('Failed to update settings');
    }
  };

  // --- EXPORT LEADS CSV HANDLER ---
  const handleExportLeadsCSV = () => {
    if (leads.length === 0) return alert('No leads to export');
    const headers = "ID,Email,Date Subscribed\n";
    const rows = leads.map(l => `${l.id},"${l.email}","${l.createdAt || ''}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    triggerAlert('Leads exported to CSV! 📥');
  };

  // --- TESTIMONIALS HANDLERS ---
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.comment) {
      alert('Please fill out Name, Role, and Comment');
      return;
    }
    try {
      const res = await apiService.addTestimonial(newTestimonial);
      if (res.success) {
        setTestimonials([res.data, ...testimonials]);
        setNewTestimonial({ name: '', role: '', avatar: '', comment: '', rating: 5 });
        setIsAddingTestimonial(false);
        triggerAlert('New Testimonial added to landing page! ⭐');
      }
    } catch {
      alert('Failed to add testimonial');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      const res = await apiService.deleteTestimonial(id);
      if (res.success) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        triggerAlert('Testimonial removed');
      }
    } catch {
      alert('Failed to delete');
    }
  };

  // --- LEADS & CONTACT HANDLERS ---
  const handleDeleteLead = async (id) => {
    if (!window.confirm('Remove this lead?')) return;
    try {
      const res = await apiService.deleteLead(id);
      if (res.success) {
        setLeads(leads.filter(l => l.id !== id));
        triggerAlert('Lead removed');
      }
    } catch {
      alert('Failed to delete lead');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const res = await apiService.deleteContactMessage(id);
      if (res.success) {
        setMessages(messages.filter(m => m.id !== id));
        triggerAlert('Message deleted');
      }
    } catch {
      alert('Failed to delete message');
    }
  };

  const filteredLeads = leads.filter(l => l.email.toLowerCase().includes(leadSearch.toLowerCase()));

  return (
    <div className="admin-dashboard-container">
      {/* Top Navigation */}
      <header className="admin-topbar">
        <div className="topbar-brand">
          <div className="brand-logo-icon">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <span className="brand-name">{settings.siteName} Admin Panel</span>
            <span className="brand-badge">Fullstack PRO Suite</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="view-landing-btn" onClick={onGoToLanding}>
            <span>View Landing Page</span>
            <ExternalLink size={16} />
          </button>
          <div className="user-profile-tag">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">Super Admin</span>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="admin-body">
        {/* Sidebar Menu */}
        <aside className="admin-sidebar">
          <div className="sidebar-menu">
            <div className="sidebar-group-title">CONTENT & MARKETING</div>
            
            <button 
              className={`sidebar-link ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <TrendingUp size={18} />
              <span>Live Statistics</span>
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'banner' ? 'active' : ''}`}
              onClick={() => setActiveTab('banner')}
            >
              <Megaphone size={18} />
              <span>Announcement Banner</span>
              {banner.enabled && <span className="status-dot-active"></span>}
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              <CreditCard size={18} />
              <span>Pricing Plans</span>
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <MessageSquareQuote size={18} />
              <span>Testimonials</span>
              <span className="pill-count">{testimonials.length}</span>
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'faqs' ? 'active' : ''}`}
              onClick={() => setActiveTab('faqs')}
            >
              <HelpCircle size={18} />
              <span>FAQ Manager</span>
              <span className="pill-count">{faqs.length}</span>
            </button>

            <div className="sidebar-group-title" style={{ marginTop: '14px' }}>CRM & INBOX</div>

            <button 
              className={`sidebar-link ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <Users size={18} />
              <span>Subscriber Leads</span>
              <span className="pill-count">{leads.length}</span>
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <Mail size={18} />
              <span>Contact Messages</span>
              <span className="pill-count">{messages.length}</span>
            </button>

            <div className="sidebar-group-title" style={{ marginTop: '14px' }}>SYSTEM & SECURITY</div>

            <button 
              className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>Site & Maintenance</span>
            </button>

            <button 
              className={`sidebar-link ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              <Activity size={18} />
              <span>Audit Activity Logs</span>
            </button>
          </div>

          <div className="sidebar-footer-card">
            <Sparkles size={18} className="card-icon" />
            <h4>Real-time Sync</h4>
            <p>All database modifications reflect instantly on the live site.</p>
            <button className="sync-btn" onClick={loadData}>
              <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
              <span>Sync All Data</span>
            </button>
          </div>
        </aside>

        {/* Dynamic Content Views */}
        <main className="admin-content">
          {saveSuccess && (
            <div className="floating-toast">
              <CheckCircle2 size={18} />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* 1. STATS VIEW */}
          {activeTab === 'stats' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Live Statistics Management</h2>
                  <p>Update dynamic proof metrics shown across the landing page.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateStats} className="stats-grid-form">
                <div className="stat-card-input">
                  <label>Active Global Users</label>
                  <input 
                    type="text" 
                    value={stats.activeUsers} 
                    onChange={(e) => setStats({ ...stats, activeUsers: e.target.value })}
                  />
                  <span className="hint">Featured in Hero & Stats banner</span>
                </div>

                <div className="stat-card-input">
                  <label>Uptime SLA</label>
                  <input 
                    type="text" 
                    value={stats.uptime} 
                    onChange={(e) => setStats({ ...stats, uptime: e.target.value })}
                  />
                  <span className="hint">Reliability score</span>
                </div>

                <div className="stat-card-input">
                  <label>Satisfaction Score</label>
                  <input 
                    type="text" 
                    value={stats.satisfactionRate} 
                    onChange={(e) => setStats({ ...stats, satisfactionRate: e.target.value })}
                  />
                  <span className="hint">Trust metric</span>
                </div>

                <div className="stat-card-input">
                  <label>Integrations Built</label>
                  <input 
                    type="text" 
                    value={stats.integrations} 
                    onChange={(e) => setStats({ ...stats, integrations: e.target.value })}
                  />
                  <span className="hint">API & Service connections</span>
                </div>

                <div className="form-action-full">
                  <button type="submit" className="primary-action-btn">
                    <Save size={18} />
                    <span>Save & Update Metrics</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. ANNOUNCEMENT BANNER VIEW (NEW) */}
          {activeTab === 'banner' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Top Announcement Banner</h2>
                  <p>Control the promotional flash ribbon shown at the very top of your landing page.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateBanner} className="admin-custom-form">
                <div className="form-toggle-row">
                  <div>
                    <h4>Enable Top Banner</h4>
                    <p>Show or hide the banner globally across the site.</p>
                  </div>
                  <label className="switch-container">
                    <input 
                      type="checkbox" 
                      checked={banner.enabled} 
                      onChange={(e) => setBanner({ ...banner, enabled: e.target.checked })} 
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Badge Highlight Text</label>
                    <input 
                      type="text" 
                      value={banner.badgeText}
                      onChange={(e) => setBanner({ ...banner, badgeText: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Action Button Text</label>
                    <input 
                      type="text" 
                      value={banner.linkText}
                      onChange={(e) => setBanner({ ...banner, linkText: e.target.value })}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Announcement Message</label>
                  <input 
                    type="text" 
                    value={banner.message}
                    onChange={(e) => setBanner({ ...banner, message: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Button Target URL / Section ID</label>
                  <input 
                    type="text" 
                    value={banner.linkUrl}
                    onChange={(e) => setBanner({ ...banner, linkUrl: e.target.value })}
                  />
                </div>

                {/* Live Preview Box */}
                <div className="banner-preview-box">
                  <div className="preview-label">Live Preview:</div>
                  <div className="mock-banner">
                    <span className="mock-badge">{banner.badgeText}</span>
                    <span>{banner.message}</span>
                    <span className="mock-link">{banner.linkText} →</span>
                  </div>
                </div>

                <button type="submit" className="primary-action-btn">
                  <Save size={18} />
                  <span>Update Announcement Banner</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. PRICING PLANS MANAGER */}
          {activeTab === 'pricing' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Hospital & Clinic Pricing Plans Editor</h2>
                  <p>Customize subscription tiers, monthly / yearly pricing, department capacity, and features.</p>
                </div>
              </div>

              <div className="pricing-admin-cards">
                {plans.map((plan) => (
                  <div key={plan.id} className="pricing-admin-card">
                    <div className="card-top-header">
                      <div className="plan-id-tag">Plan #{plan.id}</div>
                      {plan.popular ? (
                        <span className="badge-featured">⭐ Most Popular</span>
                      ) : (
                        <span className="badge-standard">Standard Plan</span>
                      )}
                    </div>

                    <div className="input-group">
                      <label>Hospital Plan Title</label>
                      <input 
                        type="text" 
                        value={plan.name}
                        placeholder="e.g. Hospital Multi-Specialty"
                        onChange={(e) => {
                          const updated = plans.map(p => p.id === plan.id ? { ...p, name: e.target.value } : p);
                          setPlans(updated);
                        }}
                      />
                    </div>

                    <div className="input-group">
                      <label>Badge Highlight</label>
                      <input 
                        type="text" 
                        value={plan.badge || ''}
                        placeholder="e.g. For Hospital Networks"
                        onChange={(e) => {
                          const updated = plans.map(p => p.id === plan.id ? { ...p, badge: e.target.value } : p);
                          setPlans(updated);
                        }}
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="input-group">
                        <label>Monthly Price ($/mo)</label>
                        <input 
                          type="number" 
                          value={plan.priceMonthly}
                          onChange={(e) => {
                            const updated = plans.map(p => p.id === plan.id ? { ...p, priceMonthly: e.target.value } : p);
                            setPlans(updated);
                          }}
                        />
                      </div>
                      <div className="input-group">
                        <label>Yearly Price ($/mo)</label>
                        <input 
                          type="number" 
                          value={plan.priceYearly}
                          onChange={(e) => {
                            const updated = plans.map(p => p.id === plan.id ? { ...p, priceYearly: e.target.value } : p);
                            setPlans(updated);
                          }}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Plan Scope & Target Institutions</label>
                      <textarea 
                        rows={3}
                        value={plan.desc}
                        placeholder="Describe features, OPD/IPD beds, lab integrations..."
                        onChange={(e) => {
                          const updated = plans.map(p => p.id === plan.id ? { ...p, desc: e.target.value } : p);
                          setPlans(updated);
                        }}
                      />
                    </div>

                    <button 
                      type="button"
                      className="save-plan-btn"
                      onClick={() => handleUpdatePlan(plan.id, plan)}
                    >
                      <Save size={16} /> Save Plan Changes
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. FAQ MANAGER (NEW) */}
          {activeTab === 'faqs' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Frequently Asked Questions (FAQ)</h2>
                  <p>Add and maintain common customer questions.</p>
                </div>
                <button className="add-new-btn" onClick={() => setIsAddingFaq(!isAddingFaq)}>
                  <Plus size={18} />
                  <span>{isAddingFaq ? 'Close' : 'Add FAQ'}</span>
                </button>
              </div>

              {isAddingFaq && (
                <form onSubmit={handleAddFaq} className="add-testimonial-card">
                  <h3>Create New FAQ</h3>
                  <div className="input-group">
                    <label>Question</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Can I upgrade my plan later?" 
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Answer</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Explain in simple terms..." 
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="primary-action-btn">
                    <Save size={16} /> Publish FAQ
                  </button>
                </form>
              )}

              <div className="faqs-admin-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-admin-item">
                    <div className="faq-content">
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                    </div>
                    <button className="delete-item-btn" onClick={() => handleDeleteFaq(faq.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. SITE CONFIGURATION & MAINTENANCE MODE (NEW) */}
          {activeTab === 'settings' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>System Configuration</h2>
                  <p>Global site settings, emergency maintenance toggle, and support routing.</p>
                </div>
              </div>

              <form onSubmit={handleUpdateSettings} className="admin-custom-form">
                <div className="form-toggle-row danger-toggle">
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldAlert size={18} color="#f87171" /> 
                      Emergency Maintenance Mode
                    </h4>
                    <p>When enabled, public visitors see an Under Maintenance overlay.</p>
                  </div>
                  <label className="switch-container">
                    <input 
                      type="checkbox" 
                      checked={settings.maintenanceMode} 
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} 
                    />
                    <span className="slider danger"></span>
                  </label>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Platform Brand Name</label>
                    <input 
                      type="text" 
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Public Support Email</label>
                    <input 
                      type="email" 
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-toggle-row">
                  <div>
                    <h4>Accept Early Access Subscriptions</h4>
                    <p>Allow visitors to subscribe on the hero section.</p>
                  </div>
                  <label className="switch-container">
                    <input 
                      type="checkbox" 
                      checked={settings.allowRegistrations} 
                      onChange={(e) => setSettings({ ...settings, allowRegistrations: e.target.checked })} 
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <button type="submit" className="primary-action-btn">
                  <Save size={18} />
                  <span>Save Configuration</span>
                </button>
              </form>
            </div>
          )}

          {/* 6. AUDIT & ACTIVITY LOGS (NEW) */}
          {activeTab === 'logs' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Security & Activity Audit Logs</h2>
                  <p>Chronological record of logins, edits, and lead acquisitions.</p>
                </div>
              </div>

              <div className="logs-timeline">
                {logs.map((log) => (
                  <div key={log.id} className="log-timeline-item">
                    <div className={`log-indicator ${log.type}`}></div>
                    <div className="log-info">
                      <h4>{log.action}</h4>
                      <span className="log-time"><Clock size={12} /> {log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. TESTIMONIALS VIEW */}
          {activeTab === 'testimonials' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Customer Testimonials</h2>
                  <p>Add, edit, or delete dynamic reviews shown in the Testimonials carousel.</p>
                </div>
                <button 
                  className="add-new-btn"
                  onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                >
                  <Plus size={18} />
                  <span>{isAddingTestimonial ? 'Close Form' : 'Add Testimonial'}</span>
                </button>
              </div>

              {isAddingTestimonial && (
                <form onSubmit={handleAddTestimonial} className="add-testimonial-card">
                  <h3>Add New Customer Review</h3>
                  <div className="form-row-2">
                    <div className="input-group">
                      <label>Customer Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Neha Sharma" 
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Job Title & Company *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. VP of Engineering at TechCorp" 
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <label>Avatar URL (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="https://images.unsplash.com/..." 
                        value={newTestimonial.avatar}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Rating (1 to 5 Stars)</label>
                      <select 
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Review / Feedback Comment *</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Share what they loved about the service..."
                      value={newTestimonial.comment}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="primary-action-btn">
                    <Save size={18} />
                    <span>Publish Testimonial</span>
                  </button>
                </form>
              )}

              <div className="testimonials-admin-grid">
                {testimonials.map((t) => (
                  <div key={t.id} className="admin-testimonial-item">
                    <div className="item-top">
                      <img 
                        src={t.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} 
                        alt={t.name} 
                        className="item-avatar" 
                      />
                      <div className="item-meta">
                        <h4>{t.name}</h4>
                        <p>{t.role}</p>
                        <span className="stars-pill">{'★'.repeat(t.rating || 5)}</span>
                      </div>
                      <button 
                        className="delete-item-btn"
                        onClick={() => handleDeleteTestimonial(t.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="item-comment">"{t.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. LEADS CRM + CSV EXPORT (NEW SEARCH & EXPORT) */}
          {activeTab === 'leads' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Subscriber Leads CRM ({leads.length})</h2>
                  <p>Emails captured from early access forms.</p>
                </div>
                <button className="export-csv-btn" onClick={handleExportLeadsCSV}>
                  <Download size={16} />
                  <span>Export to CSV</span>
                </button>
              </div>

              <div className="table-search-bar">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search subscriber by email..." 
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                />
              </div>

              {filteredLeads.length === 0 ? (
                <div className="empty-state-box">
                  <Users size={40} className="empty-icon" />
                  <h3>No Leads Matching</h3>
                  <p>Try searching with another keyword.</p>
                </div>
              ) : (
                <div className="data-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Subscriber Email</th>
                        <th>Subscribed Date</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead, idx) => (
                        <tr key={lead.id}>
                          <td>{idx + 1}</td>
                          <td className="font-semibold text-primary">{lead.email}</td>
                          <td>
                            <div className="date-badge">
                              <Clock size={13} />
                              <span>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'Just now'}</span>
                            </div>
                          </td>
                          <td className="text-right">
                            <button 
                              className="delete-item-btn"
                              onClick={() => handleDeleteLead(lead.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 9. CONTACT INQUIRIES VIEW */}
          {activeTab === 'messages' && (
            <div className="content-section">
              <div className="section-head">
                <div>
                  <h2>Contact Inquiries ({messages.length})</h2>
                  <p>Customer inquiries submitted through the contact form.</p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="empty-state-box">
                  <Mail size={40} className="empty-icon" />
                  <h3>No Messages Yet</h3>
                  <p>When customers send a message, it will arrive here in real-time.</p>
                </div>
              ) : (
                <div className="messages-grid">
                  {messages.map((msg) => (
                    <div key={msg.id} className="message-card">
                      <div className="message-header">
                        <div>
                          <h4>{msg.name}</h4>
                          <a href={`mailto:${msg.email}`} className="msg-email">{msg.email}</a>
                        </div>
                        <button 
                          className="delete-item-btn"
                          onClick={() => handleDeleteMessage(msg.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="msg-subject">
                        <strong>Subject:</strong> {msg.subject || 'General Inquiry'}
                      </div>

                      <p className="msg-body">{msg.message}</p>

                      <div className="msg-footer">
                        <Clock size={14} />
                        <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Recent'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
